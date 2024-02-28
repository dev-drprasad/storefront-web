import SiteConfig from "@/backend/siteConfig";

import { ShippingAddressForm } from "@/features/ShippingAddressForm";
import { Auth } from "@/widgets/Auth";
import { ViewMode } from "@/widgets/authViewMode";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

interface Props {}

async function CheckoutPage(props: Props) {
  const states = await getCountryStates();

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2">
        <Card className="mb-8">
          <CardHeader>Login / Signup</CardHeader>
          <CardBody className="p-4">
            <Auth defaultMode={ViewMode.SIGNIN} vertical />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Shipping Address</CardHeader>
          <CardBody className="p-4">
            <ShippingAddressForm states={states} />
          </CardBody>
        </Card>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
}

async function getCountryStates() {
  try {
    return (await SiteConfig.getCountryStates()) || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default CheckoutPage;
