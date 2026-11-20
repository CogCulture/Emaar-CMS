const rawStrapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "";
const isLocalhost = !rawStrapiUrl || rawStrapiUrl.includes("localhost") || rawStrapiUrl.includes("127.0.0.1");

function formatUploadUrl(url) {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) {
    return url;
  }
  // When running locally / across local network, route /uploads through the Next.js proxy rewrite
  if (url.startsWith("/uploads")) {
    if (isLocalhost) {
      return url; // Next.js rewrite proxy handles /uploads/:path* -> Strapi :1337/uploads/:path*
    }
    return `${rawStrapiUrl}${url}`;
  }
  return url;
}

/**
 * Resolves any image/video URL:
 * - If it's a Strapi v4 media object ({ data: { attributes: { url } } }) -> formats upload URL
 * - If it's a string starting with /uploads -> formats upload URL
 * - If it's already an absolute URL (http...) -> returns as is
 * - If it's a local static asset (/images/...) -> returns as is
 */
export function getStrapiMedia(mediaInput) {
  if (!mediaInput) return null;

  // Case 1: Plain string
  if (typeof mediaInput === "string") {
    return formatUploadUrl(mediaInput);
  }

  // Case 2: Strapi v4 single media relation: { data: { attributes: { url } } }
  const attrUrl = mediaInput.data?.attributes?.url;
  if (attrUrl) {
    return formatUploadUrl(attrUrl);
  }

  // Case 3: Strapi flat media object: { url: "/uploads/..." }
  if (mediaInput.url) {
    return formatUploadUrl(mediaInput.url);
  }

  return null;
}
