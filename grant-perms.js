const { Client } = require('./cms/node_modules/pg');

async function grantPermissions() {
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    database: 'emaar_strapi',
    user: 'postgres',
    password: 'emaar123',
  });

  await client.connect();

  const roleRes = await client.query("SELECT id FROM up_roles WHERE type = 'public'");
  const publicRoleId = roleRes.rows[0].id;

  const actions = [
    'api::page.page.find',
    'api::page.page.findOne',
    'api::site-section.site-section.find',
    'api::site-section.site-section.findOne',
    'api::site-setting.site-setting.find',
    'api::lead-form-submission.lead-form-submission.create',
    'api::article.article.find',
    'api::article.article.findOne',
    'api::category.category.find',
    'api::category.category.findOne'
  ];

  for (const action of actions) {
    let p = (await client.query("SELECT id FROM up_permissions WHERE action = $1", [action])).rows[0];
    if (!p) {
      const ins = await client.query(
        "INSERT INTO up_permissions (action, created_at, updated_at) VALUES ($1, NOW(), NOW()) RETURNING id",
        [action]
      );
      p = ins.rows[0];
    }

    const link = (await client.query(
      "SELECT id FROM up_permissions_role_links WHERE role_id = $1 AND permission_id = $2",
      [publicRoleId, p.id]
    )).rows[0];

    if (!link) {
      await client.query(
        "INSERT INTO up_permissions_role_links (role_id, permission_id) VALUES ($1, $2)",
        [publicRoleId, p.id]
      );
      console.log(`Granted: ${action}`);
    } else {
      console.log(`Already granted: ${action}`);
    }
  }

  await client.end();
  console.log("All public permissions granted successfully.");
}

grantPermissions().catch(console.error);
