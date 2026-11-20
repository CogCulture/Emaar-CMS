const { Client } = require('./cms/node_modules/pg');
const customData = require('./cms-data.json');

async function populatePageSections() {
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    database: 'emaar_strapi',
    user: 'postgres',
    password: 'emaar123',
  });

  await client.connect();

  console.log('Connecting and populating components into pages_components...');

  // Get Page IDs
  const pagesRes = await client.query('SELECT id, slug FROM pages');
  const pageMap = {};
  for (const p of pagesRes.rows) {
    pageMap[p.slug] = p.id;
  }
  console.log('Found pages in DB:', pageMap);

  // Clear existing page components to avoid duplicates
  await client.query('DELETE FROM pages_components');

  // Helper to insert a component and link to page
  async function addComponent(pageSlug, compType, compTable, fields, order) {
    const pageId = pageMap[pageSlug];
    if (!pageId) {
      console.warn(`Page not found: ${pageSlug}`);
      return;
    }

    const cols = Object.keys(fields);
    const vals = Object.values(fields);
    const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ');

    const insQuery = `INSERT INTO ${compTable} (${cols.join(', ')}) VALUES (${placeholders}) RETURNING id`;
    const res = await client.query(insQuery, vals);
    const compId = res.rows[0].id;

    // Link in pages_components
    await client.query(
      `INSERT INTO pages_components (entity_id, component_id, component_type, field, "order")
       VALUES ($1, $2, $3, $4, $5)`,
      [pageId, compId, compType, 'contentSections', order]
    );

    console.log(`Linked ${compType} (id: ${compId}) to page ${pageSlug} at order ${order}`);
  }

  // --- 1. HOME PAGE COMPONENTS ---
  const s = customData.sections || {};

  // Launches Stack
  await addComponent('home', 'sections.launches', 'components_sections_launches', {
    title: s.launches?.title || 'Serenity Hills',
    kicker: s.launches?.kicker || 'LATEST LAUNCHES',
    lede: s.launches?.lede || 'GURUGRAM',
    data: JSON.stringify(s.launches || {})
  }, 1);

  // Developments Rail
  await addComponent('home', 'sections.developments', 'components_sections_developments', {
    title: s.developments?.title || 'Where Life Finds Its Place',
    kicker: s.developments?.kicker || 'Landmark Developments',
    lede: s.developments?.lede || 'From distinctive residences to vibrant destinations...',
    data: JSON.stringify(s.developments || {})
  }, 2);

  // Under Development Rail
  await addComponent('home', 'sections.developments', 'components_sections_developments', {
    title: s.underDevelopment?.title || 'A Vision Taking Shape',
    kicker: s.underDevelopment?.kicker || 'Projects under development',
    lede: s.underDevelopment?.lede || 'Explore Emaar’s developments in the making...',
    data: JSON.stringify(s.underDevelopment || {})
  }, 3);

  // Communities Collage
  await addComponent('home', 'sections.communities', 'components_sections_communities', {
    title: s.communities?.title || 'SIGNATURE LIVING, YOUR WAY',
    subtitle: s.communitiesIntro?.title || 'A World Designed Around Living',
    lede: s.communitiesIntro?.lede || 'Thoughtfully planned and shaped by their surroundings...',
    data: JSON.stringify(s.communities || {})
  }, 4);

  // Showcase Mosaic
  await addComponent('home', 'sections.showcase', 'components_sections_showcase', {
    title: s.propertiesIntro?.title || 'More to Experience. More to Discover.',
    video_url: '/videos/emaar-destination.mp4',
    data: JSON.stringify(s.showcase || {})
  }, 5);

  // Legacy Stats
  await addComponent('home', 'sections.legacy', 'components_sections_legacy', {
    title: s.legacy?.title || 'A Legacy Built on Vision',
    subtitle: s.legacy_intro?.title || 'Master developments across India',
    content: s.legacy_intro?.content || 'For decades, Emaar has shaped some of the world’s most recognisable landmarks...',
    data: JSON.stringify(s.legacy || {})
  }, 6);

  // Press Releases
  await addComponent('home', 'sections.press', 'components_sections_press', {
    title: s.press?.title || 'In the News & Press Releases',
    kicker: 'MEDIA',
    lede: 'Discover the latest announcements, project milestones and developments...',
    data: JSON.stringify(s.press || {})
  }, 7);

  // Converse CTA
  await addComponent('home', 'sections.converse', 'components_sections_converse', {
    title: s.converse?.title || 'Ready to Explore?',
    cta_label: 'GET IN TOUCH',
    cta_link: '/contact',
    video_url: '/videos/emaar-mobile.mp4',
    data: JSON.stringify(s.converse || {})
  }, 8);

  // --- 2. ABOUT EMAAR PAGE COMPONENTS ---
  await addComponent('about-emaar', 'sections.about-masthead', 'components_sections_about_mastheads', {
    title: 'We Shape Lifestyles',
    lede: 'Emaar Properties is one of the world’s most valuable and admired real estate development companies. With established competencies in real estate, shopping malls and retail, hospitality and leisure, Emaar shapes new lifestyles through design excellence, build quality and timely delivery.',
    note: '*As of September 2026, and based on the valuation of assets done by third party valuer.',
    data: JSON.stringify({
      actions: [
        { label: 'Investor relations', href: '/investor-relations', variant: 'solid' },
        { label: 'Contact us', href: '/contact', variant: 'outline' }
      ]
    })
  }, 1);

  // --- 3. CONTACT US PAGE COMPONENTS ---
  await addComponent('contact-us', 'sections.contact-masthead', 'components_sections_contact_mastheads', {
    title: 'Contact Us',
    lede: 'Speak to our team or send us an enquiry. Our contact details and office locations are listed below.',
    toll_free: '800 EMAAR (36227)',
    international_phone: '+971 4 366 1688',
    data: JSON.stringify({
      facts: [
        { label: 'Toll free within the UAE, 24/7', text: '800 EMAAR (36227)', href: 'tel:80036227' },
        { label: 'From outside the UAE', text: '+971 4 366 1688', href: 'tel:+97143661688' },
        { label: 'Offices', text: '15 locations across nine countries', href: '#offices' }
      ]
    })
  }, 1);

  // --- 4. FAQ PAGE COMPONENTS ---
  await addComponent('faq', 'sections.faq-section', 'components_sections_faq_sections', {
    title: "FAQ's",
    lede: "Get answers to all your frequently asked questions about Emaar's communities, projects and anything Emaar related. Visit us online for more info.",
    data: JSON.stringify({
      actions: [
        { label: 'Search the answers', href: '#search', variant: 'solid' },
        { label: 'Ask us directly', href: '/contact-us', variant: 'outline' }
      ]
    })
  }, 1);

  await client.end();
  console.log('--- ALL PAGES NOW HAVE COMPONENTS PRE-POPULATED! ---');
}

populatePageSections().catch(console.error);
