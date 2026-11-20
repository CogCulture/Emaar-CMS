"use strict";

/**
 * `page-populate-middleware` middleware
 */

const fullPopulate = {
  contentSections: {
    populate: {
      items: {
        populate: "*",
      },
      tiles: {
        populate: "*",
      },
      stats: {
        populate: "*",
      },
      key_facts: {
        populate: "*",
      },
      images: true,
      desktop_video: true,
      mobile_video: true,
      desktop_poster: true,
      mobile_poster: true,
      logo_media: true,
      showcase_video: true,
      converse_video: true,
      hero_image: true,
      mobile_hero_image: true,
      brochure_file: true,
      floorplan_file: true,
      image: true,
      split_image: true,
    },
  },
  seo: {
    populate: "*",
  },
};

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const slug = ctx.query?.filters?.slug;
    ctx.query = {
      ...ctx.query,
      populate: fullPopulate,
      ...(slug ? { filters: { slug } } : (ctx.query?.filters ? { filters: ctx.query.filters } : {})),
      ...(ctx.query?.locale ? { locale: ctx.query.locale } : {}),
    };

    await next();
  };
};
