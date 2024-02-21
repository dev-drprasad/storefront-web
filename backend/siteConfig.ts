import { getBackendURLPrefix, getMediaURLPrefix } from "./utils";

const getLogoUrl = () => {
  return fetch(`${getBackendURLPrefix()}/config`)
    .then((res) => res.json())
    .then((data) => data.logoUrl as string);
};

const SiteConfig = {
  getLogoUrl,
};

export default SiteConfig;
