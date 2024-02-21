import Backend from "@/backend";
import { Image } from "@nextui-org/image";
import React from "react";

const getLogoUrl = Backend.SiteConfig.getLogoUrl;

const SiteLogo = async () => {
  const logoUrl = await getLogoUrl();

  return <Image src={logoUrl} alt="site logo" />;
};

export default SiteLogo;
