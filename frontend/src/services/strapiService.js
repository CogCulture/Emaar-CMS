const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

export async function getStrapiContent({ revalidate = 0 } = {}) {
  try {
    const [secRes, setRes, pagesRes] = await Promise.all([
      fetch(`${STRAPI_URL}/api/site-sections?pagination[pageSize]=100`, {
        next: { revalidate },
        cache: "no-store",
      }),
      fetch(`${STRAPI_URL}/api/site-setting`, {
        next: { revalidate },
        cache: "no-store",
      }),
      fetch(`${STRAPI_URL}/api/pages?populate[contentSections][populate][items][populate]=*&populate[contentSections][populate][tiles][populate]=*&populate[contentSections][populate][stats][populate]=*&populate[seo]=*&pagination[pageSize]=100`, {
        next: { revalidate },
        cache: "no-store",
      }),
    ]);

    let sections = {};
    if (secRes.ok) {
      const secJson = await secRes.json();
      if (Array.isArray(secJson.data)) {
        for (const item of secJson.data) {
          const attr = item.attributes || {};
          const key = attr.section_key;
          if (key) {
            sections[key] = {
              id: item.id,
              key: attr.section_key,
              title: attr.title || "",
              subtitle: attr.subtitle || "",
              badge: attr.badge || "",
              content: attr.content || "",
              cta_text: attr.cta_text || "",
              cta_link: attr.cta_link || "",
              image: attr.image || "",
              ...(attr.data && typeof attr.data === "object" ? attr.data : {}),
            };
          }
        }
      }
    }

    let settings = {};
    if (setRes.ok) {
      const setJson = await setRes.json();
      const attr = setJson.data?.attributes || {};
      settings = {
        brand_title: attr.brand_title || "",
        site_logo: attr.site_logo || "",
        site_logo_alt: attr.site_logo_alt || "",
        hero_video: attr.hero_video || "",
        hero_video_type: attr.hero_video_type || "",
        hero_search_placeholder: attr.hero_search_placeholder || "",
        contact_phone: attr.contact_phone || "",
        contact_email: attr.contact_email || "",
        ...(attr.raw_settings && typeof attr.raw_settings === "object" ? attr.raw_settings : {}),
      };
    }

    let pages = [];
    if (pagesRes.ok) {
      const pJson = await pagesRes.json();
      if (Array.isArray(pJson.data)) {
        pages = pJson.data.map((p) => ({
          id: p.id,
          ...(p.attributes || {}),
        }));
      }
    }

    return { sections, settings, pages };
  } catch (err) {
    console.warn("Strapi service unavailable, using defaults:", err.message);
    return null;
  }
}
