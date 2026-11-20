const { Client } = require('./cms/node_modules/pg');

async function testEdit() {
  const c = new Client({
    host: '127.0.0.1',
    port: 5432,
    database: 'emaar_strapi',
    user: 'postgres',
    password: 'emaar123'
  });
  await c.connect();

  // Test updating Hero section
  await c.query(
    "UPDATE site_sections SET title = $1 WHERE section_key = $2",
    ["Emaar India - Luxury Redefined", "hero"]
  );

  // Test updating About section
  await c.query(
    "UPDATE site_sections SET title = $1 WHERE section_key = $2",
    ["Shaping World-Class Lifestyles", "about"]
  );

  console.log("Updated Hero and About in Strapi successfully.");
  await c.end();
}

testEdit().catch(console.error);
