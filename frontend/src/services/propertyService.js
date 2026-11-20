import { properties } from "@/data/properties";
import { getStrapiContent } from "@/services/strapiService";
import { getStrapiMedia } from "@/utils/media";

export async function getPropertyBySlug(slug, { revalidate = 0 } = {}) {
  const exactProp = properties.find((p) => p.slug === slug);
  const baseTemplate = properties[0];
  let baseProp = exactProp || baseTemplate;

  try {
    const strapiData = await getStrapiContent({ revalidate });
    if (strapiData && Array.isArray(strapiData.pages)) {
      const cleanSlug = slug.replace(/^\//, "").replace(/^properties\//, "");
      const strapiPage = strapiData.pages.find((p) => {
        const pSlug = (p.slug || "").replace(/^\//, "").replace(/^properties\//, "");
        return pSlug === cleanSlug;
      });

      if (strapiPage) {
        const name = strapiPage.heading || strapiPage.shortName || baseProp.name;
        const description = strapiPage.description || baseProp.hero?.subtitle;
        const cSecs = Array.isArray(strapiPage.contentSections) ? strapiPage.contentSections : [];
        const propDetail = cSecs.find((c) => c.__component === "sections.property-detail");
        const propOverview = cSecs.find((c) => c.__component === "sections.property-overview");
        const propHighlights = cSecs.find((c) => c.__component === "sections.property-highlights");
        const propAmenities = cSecs.find((c) => c.__component === "sections.property-amenities");
        const propLocation = cSecs.find((c) => c.__component === "sections.property-location");
        const propConnectivity = cSecs.find((c) => c.__component === "sections.property-connectivity");
        const propGallery = cSecs.find((c) => c.__component === "sections.property-gallery");

        const pData = propDetail?.data || {};

        const heroImageDesktop = getStrapiMedia(propDetail?.hero_image) || pData.hero?.image?.desktop || baseProp.hero?.image?.desktop;
        const heroImageMobile = getStrapiMedia(propDetail?.mobile_hero_image) || pData.hero?.image?.mobile || baseProp.hero?.image?.mobile;
        const brochureUrl = getStrapiMedia(propDetail?.brochure_file);
        const floorplanUrl = getStrapiMedia(propDetail?.floorplan_file);

        const seoImg = getStrapiMedia(strapiPage.seo?.shareImage || strapiPage.seo?.metaImage);
        const seoData = strapiPage.seo ? {
          ...baseProp.seo,
          title: strapiPage.seo.metaTitle || baseProp.seo?.title || name,
          description: strapiPage.seo.metaDescription || baseProp.seo?.description || description,
          image: seoImg || baseProp.seo?.image,
        } : baseProp.seo;

        // Disclaimers
        const disclaimer = propDetail?.disclaimer
          ? propDetail.disclaimer.split("\n").map((d) => d.trim()).filter(Boolean)
          : baseProp.hero?.disclaimer;

        // CTAs
        const updatedCtas = (baseProp.hero?.ctas || []).map((cta) => {
          if (cta.label.toLowerCase().includes("brochure") && brochureUrl) {
            return { ...cta, href: brochureUrl };
          }
          if (cta.label.toLowerCase().includes("floor") && floorplanUrl) {
            return { ...cta, href: floorplanUrl };
          }
          return cta;
        });

        // Overview
        const overviewData = propOverview ? {
          ...baseProp.overview,
          eyebrow: propOverview.eyebrow || baseProp.overview?.eyebrow,
          title: propOverview.title || baseProp.overview?.title,
          lede: propOverview.lede || propDetail?.lede || baseProp.overview?.lede,
          keyFactsLabel: propOverview.key_facts_label || baseProp.overview?.keyFactsLabel,
          keyFacts: Array.isArray(propOverview.key_facts) && propOverview.key_facts.length > 0
            ? propOverview.key_facts.map((kf) => ({ icon: kf.icon, text: kf.text }))
            : baseProp.overview?.keyFacts,
        } : {
          ...baseProp.overview,
          ...(pData.overview || {}),
          title: pData.overview?.title || propDetail?.title || name,
          lede: propDetail?.lede || pData.overview?.lede || description,
        };

        // Highlights
        const highlightsData = propHighlights ? {
          ...baseProp.highlights,
          eyebrow: propHighlights.eyebrow || baseProp.highlights?.eyebrow,
          items: Array.isArray(propHighlights.items) && propHighlights.items.length > 0
            ? propHighlights.items.map((it) => ({
                title: it.title,
                text: it.text,
                image: {
                  src: getStrapiMedia(it.image) || "/images/properties/serenity-hills/highlight-1.webp",
                  alt: it.title,
                },
              }))
            : baseProp.highlights?.items,
        } : (pData.highlights || baseProp.highlights);

        // Amenities
        const amenitiesData = propAmenities ? {
          ...baseProp.amenities,
          eyebrow: propAmenities.eyebrow || baseProp.amenities?.eyebrow,
          title: propAmenities.title || baseProp.amenities?.title,
          text: propAmenities.text || baseProp.amenities?.text,
          items: Array.isArray(propAmenities.items) && propAmenities.items.length > 0
            ? propAmenities.items.map((a) => ({ icon: a.icon, label: a.label }))
            : baseProp.amenities?.items,
        } : (pData.amenities || baseProp.amenities);

        // Location
        const locationCoords = (propLocation?.longitude && propLocation?.latitude)
          ? [parseFloat(propLocation.longitude), parseFloat(propLocation.latitude)]
          : baseProp.location?.origin?.coords;

        const locationData = propLocation ? {
          ...baseProp.location,
          eyebrow: propLocation.eyebrow || baseProp.location?.eyebrow,
          mapTitle: propLocation.map_title || baseProp.location?.mapTitle,
          openUrl: propLocation.open_url || baseProp.location?.openUrl,
          openLabel: propLocation.open_label || baseProp.location?.openLabel,
          origin: {
            ...baseProp.location?.origin,
            coords: locationCoords,
          },
        } : (pData.location || baseProp.location);

        // Connectivity
        const connectivityData = propConnectivity ? {
          ...baseProp.connectivity,
          title: propConnectivity.title || baseProp.connectivity?.title,
          text: propConnectivity.text ? [propConnectivity.text] : baseProp.connectivity?.text,
          stats: Array.isArray(propConnectivity.stats) && propConnectivity.stats.length > 0
            ? propConnectivity.stats.map((s) => ({
                icon: s.icon,
                value: s.value,
                label: s.label,
                subtext: s.subtext,
              }))
            : baseProp.connectivity?.stats,
        } : (pData.connectivity || baseProp.connectivity);

        return {
          ...baseProp,
          slug: cleanSlug,
          name: propDetail?.title || strapiPage.heading || strapiPage.shortName || baseProp.name,
          seo: seoData,
          breadcrumb: pData.breadcrumb || baseProp.breadcrumb,
          hero: {
            ...baseProp.hero,
            ...(pData.hero || {}),
            title: propDetail?.title || pData.hero?.title || name,
            eyebrow: propDetail?.eyebrow || propDetail?.kicker || pData.hero?.eyebrow || baseProp.hero?.eyebrow,
            disclaimer,
            ctas: updatedCtas,
            image: {
              ...baseProp.hero?.image,
              ...(pData.hero?.image || {}),
              desktop: heroImageDesktop,
              mobile: heroImageMobile,
            },
          },
          overview: overviewData,
          highlights: highlightsData,
          gallery: pData.gallery || baseProp.gallery,
          amenities: amenitiesData,
          location: locationData,
          connectivity: connectivityData,
        };
      }
    }
  } catch (err) {
    console.warn("Property fetch from Strapi failed, using default:", err.message);
  }

  return exactProp || baseProp;
}
