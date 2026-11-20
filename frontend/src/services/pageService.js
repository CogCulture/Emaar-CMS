import { header } from "@/data/header";
import { footer } from "@/data/footer";
import { home } from "@/data/home";
import { about } from "@/data/about";
import { contact } from "@/data/contact";
import { faq } from "@/data/faq";
import { getStrapiContent } from "@/services/strapiService";
import { getStrapiMedia } from "@/utils/media";

const mock = { header, footer, home, about, contact, faq };

function resolveSeo(strapiSeo, fallbackSeo) {
  if (!strapiSeo) return fallbackSeo || {};
  const image = getStrapiMedia(strapiSeo.shareImage || strapiSeo.metaImage) || fallbackSeo?.image || "/images/hero-poster.jpg";
  return {
    ...fallbackSeo,
    title: strapiSeo.metaTitle || fallbackSeo?.title || "",
    description: strapiSeo.metaDescription || fallbackSeo?.description || "",
    image,
    keywords: strapiSeo.keywords || fallbackSeo?.keywords,
  };
}

export async function getPage(slug, { revalidate = 0 } = {}) {
  try {
    const strapiData = await getStrapiContent({ revalidate });
    if (strapiData) {
      const { sections = {}, settings = {}, pages = [] } = strapiData;

      // 1. Header
      if (slug === "header") {
        const homePage = pages.find((p) => p.slug === "home" || p.slug === "/");
        const cSecs = Array.isArray(homePage?.contentSections) ? homePage.contentSections : [];
        const navComp = cSecs.find((c) => c.__component === "sections.navbar");
        const s = sections.header || {};
        const nData = navComp?.data || {};

        const logoSrc = getStrapiMedia(navComp?.logo_media) || navComp?.logo_src || s.logo?.src || s.logo || settings.site_logo || header.logo.src;
        const logoAlt = navComp?.logo_alt || s.logo?.alt || s.logo_alt || settings.site_logo_alt || header.logo.alt;
        const phone = navComp?.phone || s.phone || settings.contact_phone || header.contact.phone;
        const whatsapp = navComp?.whatsapp || s.whatsapp || header.contact.whatsapp;
        const ctaLabel = navComp?.cta_label || s.cta_text || s.contact?.ctaLabel || header.contact.ctaLabel;
        const ctaLink = navComp?.cta_link || s.cta_link || s.contact?.ctaLink || header.contact.ctaLink;

        const nav = Array.isArray(nData.nav) ? nData.nav : (Array.isArray(s.nav) ? s.nav : (settings.raw_settings?.header?.nav || header.nav));
        const dock = Array.isArray(nData.dock) ? nData.dock : (Array.isArray(s.dock) ? s.dock : (settings.raw_settings?.header?.dock || header.dock));
        const dockSearch = nData.dockSearch || s.dockSearch || settings.raw_settings?.header?.dockSearch || header.dockSearch;
        const mobileMenu = nData.mobileMenu || s.mobileMenu || settings.raw_settings?.header?.mobileMenu || header.mobileMenu;

        return {
          ...header,
          logo: { src: logoSrc, alt: logoAlt },
          nav,
          dock,
          dockSearch,
          mobileMenu,
          contact: {
            ...header.contact,
            phone: phone.startsWith("tel:") ? phone : `tel:${phone.replace(/\s+/g, '')}`,
            whatsapp: whatsapp.startsWith("http") ? whatsapp : `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`,
            ctaLabel,
            ctaLink,
          },
        };
      }

      // 2. Footer
      if (slug === "footer") {
        const s = sections.footer || {};
        const logoSrc = s.logo?.src || s.logo || settings.site_logo || footer.logo.src;
        const logoAlt = s.logo_alt || settings.site_logo_alt || footer.logo.alt;
        const columns = Array.isArray(s.columns) ? s.columns : (settings.raw_settings?.footer?.columns || footer.columns);
        const social = Array.isArray(s.social) ? s.social : (settings.raw_settings?.footer?.social || footer.social);
        const bottom = s.bottom ? { ...footer.bottom, ...s.bottom } : (settings.raw_settings?.footer?.bottom || footer.bottom);
        const actions = Array.isArray(s.actions) ? s.actions : (settings.raw_settings?.footer?.actions || footer.actions);

        return {
          ...footer,
          ...(s || {}),
          logo: { src: logoSrc, alt: logoAlt },
          columns,
          social,
          bottom,
          actions,
          tagline: s.tagline !== undefined ? s.tagline : (settings.raw_settings?.footer?.tagline || footer.tagline),
        };
      }

      // 3. Home Page
      if (slug === "home") {
        const homePage = pages.find((p) => p.slug === "home" || p.slug === "/");
        const cSecs = Array.isArray(homePage?.contentSections) ? homePage.contentSections : [];

        // Dynamic components from Strapi Page contentSections
        const navComp = cSecs.find((c) => c.__component === "sections.navbar");
        const heroComp = cSecs.find((c) => c.__component === "sections.hero");
        const searchComp = cSecs.find((c) => c.__component === "sections.search-filter");
        const launchComp = cSecs.find((c) => c.__component === "sections.launches");
        const devComps = cSecs.filter((c) => c.__component === "sections.developments");
        const commComp = cSecs.find((c) => c.__component === "sections.communities");
        const showComp = cSecs.find((c) => c.__component === "sections.showcase");
        const legComp = cSecs.find((c) => c.__component === "sections.legacy");
        const pressComp = cSecs.find((c) => c.__component === "sections.press");
        const convComp = cSecs.find((c) => c.__component === "sections.converse");

        // Hero Media resolution
        const heroVideo = getStrapiMedia(heroComp?.desktop_video) || heroComp?.video_url || settings.hero_video || sections.hero?.video || home.hero.video;
        const heroMobileVideo = getStrapiMedia(heroComp?.mobile_video) || heroComp?.mobile_video_url || heroComp?.data?.mobileVideo || sections.hero?.mobileVideo || home.hero.mobileVideo;
        const heroPoster = getStrapiMedia(heroComp?.desktop_poster) || heroComp?.poster || heroComp?.data?.poster || sections.hero?.poster || home.hero.poster;
        const heroMobilePoster = getStrapiMedia(heroComp?.mobile_poster) || heroComp?.mobile_poster || heroComp?.data?.mobilePoster || sections.hero?.mobilePoster || home.hero.mobilePoster;
        const heroTitle = heroComp?.title || homePage?.heading || sections.hero?.title || home.hero.title;
        const heroSubtitle = heroComp?.description || homePage?.description || sections.hero?.subtitle || home.hero.subtitle;

        const heroData = {
          ...home.hero,
          ...(sections.hero || {}),
          ...(heroComp?.data || {}),
          title: heroTitle,
          subtitle: heroSubtitle,
          video: heroVideo,
          mobileVideo: heroMobileVideo,
          poster: heroPoster,
          mobilePoster: heroMobilePoster,
          alt: heroComp?.data?.alt || sections.hero?.alt || home.hero.alt,
        };

        // Search & Filters
        const searchData = {
          ...home.search,
          ...(sections.search || {}),
          ...(searchComp?.data || {}),
          drawerTitle: searchComp?.title || settings.hero_search_placeholder || sections.search?.drawerTitle || home.search.drawerTitle,
          drawerKicker: searchComp?.kicker || sections.search?.drawerKicker || home.search.drawerKicker,
          submitLabel: searchComp?.submit_label || sections.search?.submitLabel || home.search.submitLabel,
          resultsPath: searchComp?.results_path || sections.search?.resultsPath || home.search.resultsPath,
          filters: searchComp?.data?.filters || sections.search?.filters || home.search.filters,
        };

        // Launches
        const launchItems = Array.isArray(launchComp?.items) && launchComp.items.length > 0
          ? launchComp.items.map((it) => ({
              ...it,
              image: getStrapiMedia(it.image) || it.image,
              video: getStrapiMedia(it.video) || it.video,
            }))
          : (launchComp?.data?.items || sections.launches?.items || home.launches.items);

        const launchesData = {
          ...home.launches,
          ...(sections.launches || {}),
          ...(launchComp?.data || {}),
          title: launchComp?.title || sections.launches?.title || home.launches.title,
          kicker: launchComp?.kicker ?? sections.launches?.kicker ?? home.launches.kicker,
          lede: launchComp?.lede || sections.launches?.lede || home.launches.lede,
          cue: launchComp?.cue || launchComp?.data?.cue || sections.launches?.cue || home.launches.cue,
          exploreLabel: launchComp?.explore_label || launchComp?.data?.exploreLabel || sections.launches?.exploreLabel || home.launches.exploreLabel,
          items: launchItems,
        };

        // Landmark Developments (devComps[0])
        const dev1 = devComps[0];
        const dev1Items = Array.isArray(dev1?.items) && dev1.items.length > 0
          ? dev1.items.map((it) => ({
              ...it,
              image: getStrapiMedia(it.image) || it.image,
            }))
          : (dev1?.data?.items || sections.developments?.items || home.developments.items);

        const developmentsData = {
          ...home.developments,
          ...(sections.developments || {}),
          ...(dev1?.data || {}),
          title: dev1?.title || sections.developments?.title || home.developments.title,
          kicker: dev1?.kicker || sections.developments?.kicker || home.developments.kicker,
          lede: dev1?.lede || sections.developments?.lede || home.developments.lede,
          allLabel: dev1?.all_label || dev1?.data?.allLabel || sections.developments?.allLabel || home.developments.allLabel,
          allHref: dev1?.all_href || dev1?.data?.allHref || sections.developments?.allHref || home.developments.allHref,
          exploreLabel: dev1?.explore_label || dev1?.data?.exploreLabel || sections.developments?.exploreLabel || home.developments.exploreLabel,
          items: dev1Items,
        };

        // Projects under Development (devComps[1])
        const dev2 = devComps[1];
        const dev2Items = Array.isArray(dev2?.items) && dev2.items.length > 0
          ? dev2.items.map((it) => ({
              ...it,
              image: getStrapiMedia(it.image) || it.image,
            }))
          : (dev2?.data?.items || sections.underDevelopment?.items || home.underDevelopment.items);

        const underDevData = {
          ...home.underDevelopment,
          ...(sections.underDevelopment || {}),
          ...(dev2?.data || {}),
          title: dev2?.title || sections.underDevelopment?.title || home.underDevelopment.title,
          kicker: dev2?.kicker || sections.underDevelopment?.kicker || home.underDevelopment.kicker,
          lede: dev2?.lede || sections.underDevelopment?.lede || home.underDevelopment.lede,
          allLabel: dev2?.all_label || dev2?.data?.allLabel || sections.underDevelopment?.allLabel || home.underDevelopment.allLabel,
          allHref: dev2?.all_href || dev2?.data?.allHref || sections.underDevelopment?.allHref || home.underDevelopment.allHref,
          exploreLabel: dev2?.explore_label || dev2?.data?.exploreLabel || sections.underDevelopment?.exploreLabel || home.underDevelopment.exploreLabel,
          items: dev2Items,
        };

        // Communities
        const communitiesIntroData = {
          ...home.communitiesIntro,
          ...(sections.communitiesIntro || {}),
          title: commComp?.subtitle || sections.communitiesIntro?.title || home.communitiesIntro.title,
          lede: commComp?.lede || sections.communitiesIntro?.lede || home.communitiesIntro.lede,
          kicker: commComp?.intro_kicker || commComp?.data?.introKicker || sections.communitiesIntro?.kicker || home.communitiesIntro.kicker,
          cue: commComp?.intro_cue || commComp?.data?.introCue || sections.communitiesIntro?.cue || home.communitiesIntro.cue,
          nextId: commComp?.data?.introNextId || sections.communitiesIntro?.nextId || home.communitiesIntro.nextId,
        };

        const commItems = Array.isArray(commComp?.items) && commComp.items.length > 0
          ? commComp.items.map((it) => {
              const fallback = home.communities.items.find((h) => h.slug === it.slug) || {};
              const img = getStrapiMedia(it.image) || it.image || fallback.image;
              const vid = getStrapiMedia(it.video) || it.video || fallback.video;
              const fallbackImages = fallback.images || [];
              const images = [
                img ? { alt: it.name, src: img } : fallbackImages[0],
                fallbackImages[1] || { alt: it.name, src: img },
                fallbackImages[2] || { alt: it.name, src: img },
              ].filter(Boolean);

              return {
                ...fallback,
                ...it,
                image: img,
                images,
                video: typeof vid === "string" ? { src: vid, label: `${it.name} film` } : (it.video || vid),
              };
            })
          : (commComp?.data?.items || sections.communities?.items || home.communities.items);

        const communitiesData = {
          ...home.communities,
          ...(sections.communities || {}),
          ...(commComp?.data || {}),
          title: commComp?.title || sections.communities?.title || home.communities.title,
          allLabel: commComp?.all_label || commComp?.data?.allLabel || sections.communities?.allLabel || home.communities.allLabel,
          allHref: commComp?.all_href || commComp?.data?.allHref || sections.communities?.allHref || home.communities.allHref,
          discoverLabel: commComp?.discover_label || commComp?.data?.discoverLabel || sections.communities?.discoverLabel || home.communities.discoverLabel,
          items: commItems,
        };

        // Showcase & Properties Intro
        const propertiesIntroData = {
          ...home.propertiesIntro,
          ...(sections.propertiesIntro || {}),
          title: showComp?.title || sections.propertiesIntro?.title || home.propertiesIntro.title,
          kicker: showComp?.data?.introKicker || sections.propertiesIntro?.kicker || home.propertiesIntro.kicker,
          lede: showComp?.data?.introLede || sections.propertiesIntro?.lede || home.propertiesIntro.lede,
          cue: showComp?.data?.introCue || sections.propertiesIntro?.cue || home.propertiesIntro.cue,
          nextId: showComp?.data?.introNextId || sections.propertiesIntro?.nextId || home.propertiesIntro.nextId,
        };

        const showcaseVideoSrc = getStrapiMedia(showComp?.showcase_video) || (showComp?.video_url ? showComp.video_url : null);
        const showcaseTiles = Array.isArray(showComp?.tiles) && showComp.tiles.length > 0
          ? showComp.tiles.map((t) => ({
              ...t,
              image: getStrapiMedia(t.image) || t.image,
            }))
          : (showComp?.data?.tiles || sections.showcase?.tiles || home.showcase.tiles);

        const showcaseData = {
          ...home.showcase,
          ...(sections.showcase || {}),
          ...(showComp?.data || {}),
          title: showComp?.title || sections.showcase?.title || home.showcase.title,
          video: showcaseVideoSrc ? { ...home.showcase.video, src: showcaseVideoSrc } : (showComp?.data?.video || sections.showcase?.video || home.showcase.video),
          tiles: showcaseTiles,
        };

        // Legacy
        const legacyStats = Array.isArray(legComp?.stats) && legComp.stats.length > 0
          ? legComp.stats.map((s) => ({
              ...s,
              value: isNaN(Number(s.value)) ? s.value : Number(s.value),
            }))
          : (legComp?.data?.stats || sections.legacy?.stats || home.legacy.stats);

        const legacyData = {
          ...home.legacy,
          ...(sections.legacy || {}),
          ...(legComp?.data || {}),
          title: legComp?.title || sections.legacy?.title || home.legacy.title,
          lede: legComp?.content || legComp?.subtitle || legComp?.lede || legComp?.data?.lede || sections.legacy?.lede || home.legacy.lede,
          stats: legacyStats,
        };

        // Press
        const pressItems = Array.isArray(pressComp?.items) && pressComp.items.length > 0
          ? pressComp.items.map((it) => ({
              ...it,
              image: getStrapiMedia(it.image) || it.image,
            }))
          : (pressComp?.data?.items || sections.press?.items || home.press.items);

        const pressData = {
          ...home.press,
          ...(sections.press || {}),
          ...(pressComp?.data || {}),
          title: pressComp?.title || sections.press?.title || home.press.title,
          eyebrow: pressComp?.eyebrow || pressComp?.kicker || pressComp?.data?.eyebrow || sections.press?.eyebrow || home.press.eyebrow,
          lede: pressComp?.lede || sections.press?.lede || home.press.lede,
          allLabel: pressComp?.all_label || pressComp?.data?.allLabel || sections.press?.allLabel || home.press.allLabel,
          allHref: pressComp?.all_href || pressComp?.data?.allHref || sections.press?.allHref || home.press.allHref,
          items: pressItems,
        };

        // Converse
        const converseVideoSrc = getStrapiMedia(convComp?.converse_video) || (convComp?.video_url ? convComp.video_url : null);
        const converseData = {
          ...home.converse,
          ...(sections.converse || {}),
          ...(convComp?.data || {}),
          title: convComp?.title || sections.converse?.title || home.converse.title,
          lede: convComp?.data?.lede || convComp?.lede || sections.converse?.lede || home.converse.lede,
          video: converseVideoSrc ? { ...home.converse.video, src: converseVideoSrc } : (convComp?.data?.video || sections.converse?.video || home.converse.video),
          cta: {
            ...home.converse.cta,
            ...(convComp?.data?.cta || {}),
            ...(sections.converse?.cta || {}),
            ...(convComp?.cta_label ? { label: convComp.cta_label } : {}),
            ...(convComp?.cta_link ? { href: convComp.cta_link } : {}),
          },
        };

        return {
          ...home,
          seo: resolveSeo(homePage?.seo, home.seo),
          hero: heroData,
          search: searchData,
          launches: launchesData,
          developments: developmentsData,
          underDevelopment: underDevData,
          communitiesIntro: communitiesIntroData,
          communities: communitiesData,
          propertiesIntro: propertiesIntroData,
          showcase: showcaseData,
          legacy: legacyData,
          press: pressData,
          converse: converseData,
        };
      }

      // 4. About Emaar Page
      if (slug === "about" || slug === "about-emaar") {
        const aboutPage = pages.find((p) => p.slug === "about" || p.slug === "about-emaar");
        const aSecs = Array.isArray(aboutPage?.contentSections) ? aboutPage.contentSections : [];
        const mastheadSec = aSecs.find((c) => c.__component === "sections.about-masthead");
        const founderSec = aSecs.find((c) => c.__component === "sections.about-founder");
        const recordSec = aSecs.find((c) => c.__component === "sections.about-record");
        const businessesSec = aSecs.find((c) => c.__component === "sections.about-businesses");
        const internationalSec = aSecs.find((c) => c.__component === "sections.about-international");
        const leadershipSec = aSecs.find((c) => c.__component === "sections.about-leadership");
        const awardsSec = aSecs.find((c) => c.__component === "sections.about-awards");
        const responsibilitySec = aSecs.find((c) => c.__component === "sections.about-responsibility");
        const continueSec = aSecs.find((c) => c.__component === "sections.related-links");

        const s = sections.about || {};
        const pData = mastheadSec?.data || {};

        // Build dynamic spine sections
        const dynamicSections = [];
        if (founderSec) {
          const founderImg = getStrapiMedia(founderSec.image) || "/images/about/foundar-emaar.jpg";
          dynamicSections.push({
            id: "founder",
            type: "founder",
            n: "01",
            nav: "The founder",
            label: "01. The founder",
            image: { src: founderImg, alt: founderSec.caption || founderSec.name, caption: founderSec.caption },
            quote: founderSec.quote,
            name: founderSec.name,
            role: founderSec.role,
            action: { label: founderSec.action_label, href: founderSec.action_href },
          });
        }
        if (recordSec) {
          const splitImg = getStrapiMedia(recordSec.split_image) || "/images/about/landmark-destination.jpg";
          dynamicSections.push({
            id: "record",
            type: "record",
            n: "02",
            nav: "The record",
            label: "02. The record",
            title: recordSec.title,
            items: Array.isArray(recordSec.stats) && recordSec.stats.length > 0
              ? recordSec.stats.map((st) => ({ value: st.value, text: st.text, source: st.source }))
              : about.spine.sections.find((sec) => sec.type === "record")?.items,
            note: recordSec.note || about.spine.sections.find((sec) => sec.type === "record")?.note,
            split: {
              image: { src: splitImg, alt: recordSec.split_title, caption: recordSec.split_text },
              title: recordSec.split_title,
              text: [
                { t: "Burj Khalifa", strong: true }, { t: ", a global icon. " },
                { t: "Dubai Mall", strong: true }, { t: ", the world's most-visited retail and lifestyle destination. And " },
                { t: "Dubai Fountain", strong: true }, { t: ", the world's largest performing fountain." },
              ],
              cta: { label: recordSec.split_cta_label, href: recordSec.split_cta_href },
            },
          });
        }
        if (businessesSec) {
          dynamicSections.push({
            id: "businesses",
            type: "businesses",
            title: businessesSec.title,
            items: Array.isArray(businessesSec.items) && businessesSec.items.length > 0
              ? businessesSec.items.map((b) => ({
                  tag: b.tag,
                  title: b.title,
                  href: b.href,
                  image: getStrapiMedia(b.image) || b.image,
                }))
              : about.spine.sections.find((sec) => sec.type === "businesses")?.items,
          });
        }
        if (internationalSec) {
          dynamicSections.push({
            id: "international",
            type: "international",
            n: "03",
            nav: "Where we are",
            label: "03. Where we are",
            title: internationalSec.title,
            text: internationalSec.text,
            items: Array.isArray(internationalSec.items) && internationalSec.items.length > 0
              ? internationalSec.items.map((it) => ({ name: it.name, domain: it.domain, href: it.href }))
              : about.spine.sections.find((sec) => sec.type === "international")?.items,
          });
        }
        if (leadershipSec) {
          dynamicSections.push({
            id: "leadership",
            type: "leadership",
            n: "04",
            nav: "Leadership",
            label: "04. Leadership",
            title: leadershipSec.title,
            items: Array.isArray(leadershipSec.items) && leadershipSec.items.length > 0
              ? leadershipSec.items.map((it) => ({ tag: it.tag, title: it.title, href: it.href }))
              : about.spine.sections.find((sec) => sec.type === "leadership")?.items,
          });
        }
        if (awardsSec) {
          dynamicSections.push({
            id: "awards",
            type: "awards",
            n: "05",
            nav: "Featured awards",
            label: "05. Featured awards",
            title: awardsSec.title,
            cta: { label: awardsSec.cta_label, href: awardsSec.cta_href },
            items: Array.isArray(awardsSec.items) && awardsSec.items.length > 0
              ? awardsSec.items.map((it) => ({ title: it.title, by: it.by }))
              : about.spine.sections.find((sec) => sec.type === "awards")?.items,
          });
        }
        if (responsibilitySec) {
          dynamicSections.push({
            id: "governance",
            type: "governance",
            title: responsibilitySec.title,
            items: Array.isArray(responsibilitySec.items) && responsibilitySec.items.length > 0
              ? responsibilitySec.items.map((it) => ({ label: it.label, text: it.text, href: it.href }))
              : about.spine.sections.find((sec) => sec.type === "governance")?.items,
          });
        }

        const continueData = continueSec
          ? {
              label: continueSec.title || "Continue",
              items: Array.isArray(continueSec.items) && continueSec.items.length > 0
                ? continueSec.items.map((it) => ({ title: it.title, text: it.text, href: it.href }))
                : about.continue.items,
            }
          : (pData.continue || s.continue || about.continue);

        return {
          ...about,
          seo: resolveSeo(aboutPage?.seo, about.seo),
          masthead: {
            ...about.masthead,
            ...(pData || {}),
            title: mastheadSec?.title || aboutPage?.heading || s.title || about.masthead.title,
            lede: mastheadSec?.lede || aboutPage?.description || s.content || s.subtitle || about.masthead.lede,
            note: mastheadSec?.note !== undefined ? mastheadSec.note : about.masthead.note,
            text: pData.text || about.masthead.text,
            breadcrumb: pData.breadcrumb || about.masthead.breadcrumb,
            actions: pData.actions || about.masthead.actions,
          },
          spine: dynamicSections.length > 0
            ? { ...about.spine, sections: dynamicSections }
            : (pData.spine || s.spine || about.spine),
          continue: continueData,
        };
      }

      // 5. Contact Us Page
      if (slug === "contact" || slug === "contact-us") {
        const contactPage = pages.find((p) => p.slug === "contact" || p.slug === "contact-us");
        const cSecs = Array.isArray(contactPage?.contentSections) ? contactPage.contentSections : [];
        const mastheadSec = cSecs.find((c) => c.__component === "sections.contact-masthead");
        const reachSec = cSecs.find((c) => c.__component === "sections.contact-reach");
        const formSec = cSecs.find((c) => c.__component === "sections.contact-form");
        const officesSec = cSecs.find((c) => c.__component === "sections.contact-offices");
        const teamsSec = cSecs.find((c) => c.__component === "sections.contact-teams");
        const continueSec = cSecs.find((c) => c.__component === "sections.related-links");

        const s = sections.contact || {};
        const pData = mastheadSec?.data || {};
        const phone = mastheadSec?.toll_free || settings.contact_phone || "800 EMAAR (36227)";
        const updatedFacts = contact.masthead?.facts
          ? contact.masthead.facts.map((f, i) => (i === 0 ? { ...f, text: phone } : f))
          : contact.masthead.facts;

        // Build dynamic spine sections
        const dynamicSections = [];
        if (reachSec) {
          dynamicSections.push({
            id: "now",
            type: "routes",
            n: "01",
            nav: "Contact options",
            label: "01. Contact options",
            title: reachSec.title,
            text: reachSec.text,
            items: Array.isArray(reachSec.items) && reachSec.items.length > 0
              ? reachSec.items.map((it) => ({ icon: it.icon, k: it.label, v: it.value, m: it.note, href: it.href }))
              : contact.spine.sections.find((sec) => sec.type === "routes")?.items,
          });
        }
        if (formSec) {
          const defaultFormSec = contact.spine.sections.find((sec) => sec.type === "form");
          dynamicSections.push({
            id: "enquire",
            type: "form",
            n: "02",
            nav: "Send an enquiry",
            label: "02. Send an enquiry",
            title: formSec.title,
            text: formSec.text,
            topics: defaultFormSec?.topics || [],
            privacyHref: defaultFormSec?.privacyHref || "/privacy-policy",
            scamHref: defaultFormSec?.scamHref || "/scam-alerts",
            successTitle: formSec.success_title || defaultFormSec?.successTitle,
            successText: formSec.success_text || defaultFormSec?.successText,
          });
        }
        if (officesSec) {
          dynamicSections.push({
            id: "offices",
            type: "offices",
            n: "03",
            nav: "Offices",
            label: "03. Offices",
            title: officesSec.title,
            text: officesSec.text,
            items: Array.isArray(officesSec.items) && officesSec.items.length > 0
              ? officesSec.items.map((it) => {
                  const citySlug = (it.city || "office").toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  const lines = it.address ? it.address.split("\n").map((l) => l.trim()).filter(Boolean) : [];
                  const details = [];
                  if (it.phone) details.push({ label: "Tel", text: it.phone, href: it.phone_href || `tel:${it.phone.replace(/[^0-9+]/g, "")}` });
                  const hours = it.hours ? it.hours.split("\n").map((l) => l.trim()).filter(Boolean) : [];
                  return {
                    id: citySlug,
                    region: it.region,
                    country: it.country,
                    name: it.city,
                    lines,
                    details,
                    hours,
                    phone: it.phone ? { label: it.phone, href: it.phone_href || `tel:${it.phone.replace(/[^0-9+]/g, "")}` } : undefined,
                  };
                })
              : contact.spine.sections.find((sec) => sec.type === "offices")?.items,
          });
        }
        if (teamsSec) {
          const defaultOtherSec = contact.spine.sections.find((sec) => sec.type === "contacts");
          dynamicSections.push({
            id: "other",
            type: "contacts",
            n: "04",
            nav: "Other enquiries",
            label: "04. Other enquiries",
            title: teamsSec.title,
            text: teamsSec.text,
            items: Array.isArray(teamsSec.items) && teamsSec.items.length > 0
              ? teamsSec.items.map((it) => ({
                  k: it.category,
                  title: it.title,
                  text: it.text,
                  email: it.email,
                  href: it.href,
                }))
              : defaultOtherSec?.items,
            scam: {
              title: teamsSec.scam_title || defaultOtherSec?.scam?.title,
              text: teamsSec.scam_text || defaultOtherSec?.scam?.text,
              label: defaultOtherSec?.scam?.label || "Read scam alerts",
              href: defaultOtherSec?.scam?.href || "/scam-alerts",
            },
          });
        }

        const continueData = continueSec
          ? {
              label: continueSec.title || "Continue",
              items: Array.isArray(continueSec.items) && continueSec.items.length > 0
                ? continueSec.items.map((it) => ({ title: it.title, text: it.text, href: it.href }))
                : contact.continue.items,
            }
          : (pData.continue || s.continue || contact.continue);

        return {
          ...contact,
          seo: resolveSeo(contactPage?.seo, contact.seo),
          masthead: {
            ...contact.masthead,
            ...(pData || {}),
            title: mastheadSec?.title || contactPage?.heading || s.title || contact.masthead.title,
            lede: mastheadSec?.lede || contactPage?.description || s.subtitle || contact.masthead.lede,
            breadcrumb: pData.breadcrumb || contact.masthead.breadcrumb,
            railLabel: pData.railLabel || contact.masthead.railLabel,
            facts: pData.facts || updatedFacts,
            actions: pData.actions || contact.masthead.actions,
          },
          spine: dynamicSections.length > 0
            ? { ...contact.spine, sections: dynamicSections }
            : (pData.spine || s.spine || contact.spine),
          continue: continueData,
        };
      }

      // 6. FAQ Page
      if (slug === "faq") {
        const faqPage = pages.find((p) => p.slug === "faq");
        const fSecs = Array.isArray(faqPage?.contentSections) ? faqPage.contentSections : [];
        const faqSecs = fSecs.filter((c) => c.__component === "sections.faq-section");
        const continueSec = fSecs.find((c) => c.__component === "sections.related-links");

        const s = sections.faq || {};
        const firstFaqSec = faqSecs[0];
        const pData = firstFaqSec?.data || {};

        // Build dynamic spine FAQ categories
        const dynamicSections = faqSecs.map((fs, idx) => {
          const num = fs.category_number || String(idx + 1).padStart(2, "0");
          const nav = fs.nav_label || fs.title || `Category ${num}`;
          const id = `faq-${nav.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
          const isFiles = Array.isArray(fs.items) && fs.items.some((it) => it.file_title || it.file_href);

          if (isFiles) {
            return {
              id: id || "factsheets",
              type: "files",
              n: num,
              nav,
              label: `${num}. ${nav}`,
              title: fs.title || nav,
              items: fs.items.map((it) => ({
                title: it.file_title || it.question,
                href: it.file_href || it.answer,
              })),
            };
          }

          return {
            id,
            type: "faq",
            n: num,
            nav,
            label: `${num}. ${nav}`,
            title: fs.title || nav,
            items: Array.isArray(fs.items)
              ? fs.items.map((it) => ({
                  q: it.question,
                  a: it.answer,
                }))
              : [],
          };
        });

        const continueData = continueSec
          ? {
              label: continueSec.title || "Continue",
              items: Array.isArray(continueSec.items) && continueSec.items.length > 0
                ? continueSec.items.map((it) => ({ title: it.title, text: it.text, href: it.href }))
                : faq.continue.items,
            }
          : (pData.continue || s.continue || faq.continue);

        return {
          ...faq,
          seo: resolveSeo(faqPage?.seo, faq.seo),
          masthead: {
            ...faq.masthead,
            ...(pData || {}),
            title: firstFaqSec?.title || faqPage?.heading || s.title || faq.masthead.title,
            lede: firstFaqSec?.lede || faqPage?.description || s.subtitle || faq.masthead.lede,
            breadcrumb: pData.breadcrumb || faq.masthead.breadcrumb,
            railLabel: pData.railLabel || faq.masthead.railLabel,
            facts: pData.facts || faq.masthead.facts,
            actions: pData.actions || faq.masthead.actions,
          },
          spine: dynamicSections.length > 0
            ? { ...faq.spine, sections: dynamicSections }
            : (pData.spine || s.spine || faq.spine),
          continue: continueData,
        };
      }

      // 7. Thank You Page
      if (slug === "thank-you" || slug === "thankyou") {
        const tyPage = pages.find((p) => p.slug === "thank-you");
        const tySecs = Array.isArray(tyPage?.contentSections) ? tyPage.contentSections : [];
        const tySec = tySecs.find((c) => c.__component === "sections.thank-you");

        const defaultData = {
          kicker: "Enquiry received",
          title: "Thank you.",
          text: "Your enquiry has been sent. A member of the Emaar team will get back to you shortly. For a faster answer, call 800 EMAAR (36227).",
          phone_label_1: "Toll free within the UAE, 24/7",
          phone_value_1: "800 EMAAR (36227)",
          phone_href_1: "tel:80036227",
          phone_label_2: "From outside the UAE",
          phone_value_2: "+971 4 366 1688",
          phone_href_2: "tel:+97143661688",
          back_label: "Back to home",
          back_href: "/",
          contact_label: "Contact us",
          contact_href: "/contact-us",
        };

        return {
          seo: resolveSeo(tyPage?.seo, {
            title: "Thank you",
            description: "Your enquiry has been sent.",
          }),
          ...(tySec || defaultData),
        };
      }
    }
  } catch (err) {
    console.error(`getPage("${slug}") Strapi error, falling back to mock:`, err);
  }

  return mock[slug] ?? null;
}
