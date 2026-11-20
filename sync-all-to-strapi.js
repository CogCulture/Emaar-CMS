const { Client } = require('./cms/node_modules/pg');
const customData = require('./cms-data.json');
const fs = require('fs');
const path = require('path');

// Dynamically read about, contact, faq, header, footer from frontend/src/data if available
async function syncEverything() {
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    database: 'emaar_strapi',
    user: 'postgres',
    password: 'emaar123',
  });

  await client.connect();

  console.log('--- SYNCING TO STRAPI POSTGRES DATABASE ---');

  // 1. Sync Pages
  const pagesToSync = [
    { title: 'Home Page', slug: 'home', hero_title: 'Emaar India', hero_subtitle: 'A Blend Of Lifestyle, Commercial Spaces & Residential Projects' },
    { title: 'About Emaar', slug: 'about-emaar', hero_title: 'We Shape Lifestyles', hero_subtitle: 'About Emaar India' },
    { title: 'Contact Us', slug: 'contact-us', hero_title: 'Contact Us', hero_subtitle: 'Speak to our team or send us an enquiry.' },
    { title: 'FAQs', slug: 'faq', hero_title: "FAQ's", hero_subtitle: 'Get answers to all your frequently asked questions.' },
    { title: 'Emaar Serenity Hills', slug: 'properties/emaar-serenity-hills', hero_title: 'Emaar Serenity Hills', hero_subtitle: 'Nestled at the foothills of the Aravallis, Gurugram.' },
    { title: 'New test', slug: 'properties/new-test-project', hero_title: 'New test', hero_subtitle: 'Nestled in prime surroundings, Gurugram.' }
  ];

  for (const page of pagesToSync) {
    const check = await client.query('SELECT id FROM pages WHERE slug = $1', [page.slug]);
    if (check.rows.length === 0) {
      await client.query(`
        INSERT INTO pages (short_name, slug, heading, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
        VALUES ($1, $2, $3, $4, NOW(), NOW(), NOW(), 1, 1, 'en')
      `, [page.title, page.slug, page.hero_title, page.hero_subtitle]);
      console.log(`Inserted page: ${page.slug}`);
    } else {
      await client.query(`
        UPDATE pages SET short_name = $1, heading = $2, description = $3, updated_at = NOW(), published_at = NOW()
        WHERE slug = $4
      `, [page.title, page.hero_title, page.hero_subtitle, page.slug]);
      console.log(`Updated page: ${page.slug}`);
    }
  }

  // 2. Sync All Sections from cms-data.json
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
          INSERT INTO site_sections (section_key, title, subtitle, badge, content, cta_text, cta_link, image, data)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `, [sectionKey, title, subtitle, badge, content, ctaText, ctaLink, image, dataJson]);
        console.log(`Inserted site section: ${sectionKey}`);
      } else {
        await client.query(`
          UPDATE site_sections SET title = $2, subtitle = $3, badge = $4, content = $5, cta_text = $6, cta_link = $7, image = $8, data = $9
          WHERE section_key = $1
        `, [sectionKey, title, subtitle, badge, content, ctaText, ctaLink, image, dataJson]);
        console.log(`Updated site section: ${sectionKey}`);
      }
    }
  }

  // 3. Ensure about, contact, and faq sections exist in site_sections so they can be edited in Strapi!
  const additionalSections = ['about', 'contact', 'faq'];
  for (const key of additionalSections) {
    const checkSec = await client.query('SELECT id FROM site_sections WHERE section_key = $1', [key]);
    if (checkSec.rows.length === 0) {
      // Default placeholder so client can edit title, subtitle, content in Strapi
      await client.query(`
        INSERT INTO site_sections (section_key, title, subtitle, badge, content, cta_text, cta_link, image, data)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        key,
        key === 'about' ? 'We Shape Lifestyles' : (key === 'contact' ? 'Contact Us' : "FAQ's"),
        key === 'about' ? 'About Emaar India' : (key === 'contact' ? 'Get In Touch' : 'Questions & Answers'),
        '',
        '',
        '',
        '',
        '',
        JSON.stringify({ enabled: true })
      ]);
      console.log(`Inserted default editable section: ${key}`);
    }
  }

  // 4. Site Settings
  if (customData.settings) {
    const s = customData.settings;
    const checkSet = await client.query('SELECT id FROM site_settings LIMIT 1');
    if (checkSet.rows.length === 0) {
      await client.query(`
        INSERT INTO site_settings (brand_title, site_logo, site_logo_alt, hero_video, hero_video_type, hero_search_placeholder, contact_phone, contact_email, raw_settings)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        s.brand_title || 'Emaar India Limited',
        s.site_logo || '/images/emaar-india-logo-en.svg',
        s.site_logo_alt || 'Emaar India',
        s.hero_video || '',
        s.hero_video_type || '',
        s.hero_search_placeholder || 'Search by city, project, or property type...',
        s.contact_phone || '+91 124 4421155',
        s.contact_email || 'enquiry@emaar.ae',
        JSON.stringify(s)
      ]);
      console.log('Inserted site settings');
    } else {
      await client.query(`
        UPDATE site_settings SET brand_title = $1, site_logo = $2, site_logo_alt = $3, hero_video = $4, hero_video_type = $5, hero_search_placeholder = $6, contact_phone = $7, contact_email = $8, raw_settings = $9
        WHERE id = $10
      `, [
        s.brand_title || 'Emaar India Limited',
        s.site_logo || '/images/emaar-india-logo-en.svg',
        s.site_logo_alt || 'Emaar India',
        s.hero_video || '',
        s.hero_video_type || '',
        s.hero_search_placeholder || 'Search by city, project, or property type...',
        s.contact_phone || '+91 124 4421155',
        s.contact_email || 'enquiry@emaar.ae',
        JSON.stringify(s),
        checkSet.rows[0].id
      ]);
      console.log('Updated site settings');
    }
  }

  // 5. Sync SEO for all pages
  const seoDataBySlug = {
    'home': {
      metaTitle: "Emaar India - Luxury Residential & Commercial Spaces",
      metaDescription: "Emaar India is a leading real estate developer with luxury residential, commercial and lifestyle projects across Gurugram, Delhi NCR and India."
    },
    'about-emaar': {
      metaTitle: "About Emaar India | Shaping Lifestyles",
      metaDescription: "Emaar Properties is among the world's most admired real estate developers, creating contemporary living, business and community spaces across India."
    },
    'contact-us': {
      metaTitle: "Contact Us | Emaar India Customer Care",
      metaDescription: "Get in touch with Emaar India. Reach our customer care team, explore sales offices across India, or send an enquiry online 24/7."
    },
    'faq': {
      metaTitle: "Frequently Asked Questions | Emaar India",
      metaDescription: "Find clear answers to frequently asked questions about Emaar India projects, buying processes, mortgages, leasehold vs freehold and NOC."
    },
    'properties/emaar-serenity-hills': {
      metaTitle: "Emaar Serenity Hills | Luxury Residences Gurugram",
      metaDescription: "Discover Emaar Serenity Hills nestled at the foothills of Aravallis in Gurugram. Premium 3-side open luxury residences with central green views."
    },
    'properties/new-test-project': {
      metaTitle: "New Test Project | Emaar India",
      metaDescription: "Explore upcoming premium residential and commercial developments by Emaar India in prime locations across Gurugram and Delhi NCR."
    }
  };

  const allPagesRes = await client.query("SELECT id, slug FROM pages");
  for (const page of allPagesRes.rows) {
    const sData = seoDataBySlug[page.slug];
    if (!sData) continue;

    const compCheck = await client.query(
      "SELECT component_id FROM pages_components WHERE entity_id = $1 AND field = 'seo'",
      [page.id]
    );

    if (compCheck.rows.length > 0) {
      const compId = compCheck.rows[0].component_id;
      await client.query(
        "UPDATE components_shared_seos SET meta_title = $1, meta_description = $2 WHERE id = $3",
        [sData.metaTitle, sData.metaDescription, compId]
      );
      console.log(`Synced SEO for page: ${page.slug} (comp id: ${compId})`);
    } else {
      const insRes = await client.query(
        "INSERT INTO components_shared_seos (meta_title, meta_description) VALUES ($1, $2) RETURNING id",
        [sData.metaTitle, sData.metaDescription]
      );
      const newCompId = insRes.rows[0].id;
      await client.query(
        `INSERT INTO pages_components (entity_id, component_id, component_type, field, "order")
         VALUES ($1, $2, 'shared.seo', 'seo', 1)`,
        [page.id, newCompId]
      );
      console.log(`Created & linked SEO for page: ${page.slug} (comp id: ${newCompId})`);
    }
  }

  await client.end();
  console.log('All Strapi database content synced successfully!');
}

syncEverything().catch(console.error);
