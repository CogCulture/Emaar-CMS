const { Client } = require('pg');
const customData = require('D:/CMS/cms-data.json');

async function syncPagesAndContent() {
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    database: 'emaar_strapi',
    user: 'postgres',
    password: 'emaar123',
  });

  await client.connect();

  // 1. Sync Pages
  if (customData.pages && Array.isArray(customData.pages)) {
    for (const page of customData.pages) {
      const shortName = page.title || 'Untitled Page';
      const slug = page.slug === '/' ? 'home' : page.slug.replace(/^\//, '');
      const heading = page.hero_title || page.title || '';
      const description = page.hero_subtitle || page.content || '';

      const checkRes = await client.query('SELECT id FROM pages WHERE slug = $1', [slug]);
      if (checkRes.rows.length === 0) {
        await client.query(`
          INSERT INTO pages (
            short_name, slug, heading, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale
          ) VALUES (
            $1, $2, $3, $4, NOW(), NOW(), NOW(), 1, 1, 'en'
          )
        `, [shortName, slug, heading, description]);
        console.log(`Inserted Page: ${shortName} (${slug})`);
      } else {
        console.log(`Page already exists: ${slug}`);
      }
    }
  }

  // 2. Sync Site Sections
  if (customData.sections) {
    for (const [key, section] of Object.entries(customData.sections)) {
      const sectionKey = key;
      const title = section.title || section.heading || '';
      const subtitle = section.subtitle || '';
      const badge = section.badge || '';
      const content = typeof section.content === 'string' ? section.content : '';
      const ctaText = section.cta_text || section.view_all_text || '';
      const ctaLink = section.cta_link || section.view_all_link || '';
      const image = section.image || '';
      const dataJson = JSON.stringify(section);

      const checkSec = await client.query('SELECT id FROM site_sections WHERE section_key = $1', [sectionKey]);
      if (checkSec.rows.length === 0) {
        await client.query(`
          INSERT INTO site_sections (
            section_key, title, subtitle, badge, content, cta_text, cta_link, image, data
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9
          )
        `, [sectionKey, title, subtitle, badge, content, ctaText, ctaLink, image, dataJson]);
        console.log(`Inserted Site Section: ${sectionKey}`);
      } else {
        await client.query(`
          UPDATE site_sections SET
            title = $2, subtitle = $3, badge = $4, content = $5, cta_text = $6, cta_link = $7, image = $8, data = $9
          WHERE section_key = $1
        `, [sectionKey, title, subtitle, badge, content, ctaText, ctaLink, image, dataJson]);
        console.log(`Updated Site Section: ${sectionKey}`);
      }
    }
  }

  // 3. Sync Site Settings
  if (customData.settings) {
    const s = customData.settings;
    const checkSet = await client.query('SELECT id FROM site_settings LIMIT 1');
    if (checkSet.rows.length === 0) {
      await client.query(`
        INSERT INTO site_settings (
          brand_title, site_logo, site_logo_alt, hero_video, hero_video_type, hero_search_placeholder, contact_phone, contact_email, raw_settings
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9
        )
      `, [
        s.brand_title || '',
        s.site_logo || '',
        s.site_logo_alt || '',
        s.hero_video || '',
        s.hero_video_type || '',
        s.hero_search_placeholder || '',
        s.contact_phone || '',
        s.contact_email || '',
        JSON.stringify(s)
      ]);
      console.log('Inserted Site Settings');
    } else {
      await client.query(`
        UPDATE site_settings SET
          brand_title = $1, site_logo = $2, site_logo_alt = $3, hero_video = $4, hero_video_type = $5,
          hero_search_placeholder = $6, contact_phone = $7, contact_email = $8, raw_settings = $9
        WHERE id = $10
      `, [
        s.brand_title || '',
        s.site_logo || '',
        s.site_logo_alt || '',
        s.hero_video || '',
        s.hero_video_type || '',
        s.hero_search_placeholder || '',
        s.contact_phone || '',
        s.contact_email || '',
        JSON.stringify(s),
        checkSet.rows[0].id
      ]);
      console.log('Updated Site Settings');
    }
  }

  await client.end();
  console.log('Sync finished.');
}

syncPagesAndContent().catch(console.error);
