export const getBackendURLPrefix = () =>
  process.env.BACKEND_API_URI || "/api/storefront/v1";

export const getMediaURLPrefix = () => process.env.MEDIA_URI || "/media";
