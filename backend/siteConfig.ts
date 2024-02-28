import { getBackendURLPrefix } from "./utils";

const getLogoUrl = () => {
  return fetch(`${getBackendURLPrefix()}/config`)
    .then((res) => res.json())
    .then((data) => data.logoUrl as string);
};

const getCountryStates = () => {
  return fetch(`${getBackendURLPrefix()}/config`)
    .then((res) => res.json())
    .then((data) => data.states as { name: string; stateCode: string }[]);
};

const SiteConfig = {
  getLogoUrl,
  getCountryStates,
};

export default SiteConfig;
