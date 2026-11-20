const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const mimeTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4'
};

async function syncAllMedia() {
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    database: 'emaar_strapi',
    user: 'postgres',
    password: 'emaar123',
  });

  await client.connect();

  const uploadsDir = path.join(__dirname, 'cms', 'public', 'uploads');
  const files = fs.readdirSync(uploadsDir);

  let inserted = 0;
  for (const filename of files) {
    const ext = path.extname(filename).toLowerCase();
    const mime = mimeTypes[ext];
    if (!mime) continue;

    const filePath = path.join(uploadsDir, filename);
    const stats = fs.statSync(filePath);
    if (!stats.isFile()) continue;

    const nameWithoutExt = path.parse(filename).name;
    const sizeInKb = (stats.size / 1024).toFixed(2);
    const hash = nameWithoutExt.replace(/[^a-zA-Z0-9_-]/g, '_') + '_' + Math.random().toString(36).substring(2, 8);
    const url = `/uploads/${filename}`;

    const checkRes = await client.query('SELECT id FROM files WHERE name = $1', [filename]);
    if (checkRes.rows.length === 0) {
      await client.query(`
        INSERT INTO files (
          name, alternative_text, caption, hash, ext, mime, size, url, provider, folder_path, created_at, updated_at, created_by_id, updated_by_id
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW(), 1, 1
        )
      `, [
        filename,
        nameWithoutExt.replace(/[-_]/g, ' '),
        nameWithoutExt.replace(/[-_]/g, ' '),
        hash,
        ext,
        mime,
        sizeInKb,
        url,
        'local',
        '/'
      ]);
      inserted++;
    }
  }

  await client.end();
  console.log(`Media sync completed. Newly inserted files: ${inserted}`);
}

syncAllMedia().catch(console.error);
