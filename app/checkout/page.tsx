import SiteConfig from "@/backend/siteConfig";

import { ShippingAddressForm } from "@/features/ShippingAddressForm";
import { Auth } from "@/widgets/Auth";
import { ViewMode } from "@/widgets/authViewMode";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { BillingAddress } from "./BillingAddress";
import { Cart } from "@/features/Cart";
import { Button } from "@nextui-org/button";

interface Props {}

async function CheckoutPage(props: Props) {
  const states = await getCountryStates();

  return (
    <div className="grid grid-cols-3 gap-8 h-full">
      <div className="col-span-2 overflow-y-auto">
        <div className="flex flex-col gap-8">
          <Card>
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
          <BillingAddress states={states} />
        </div>
      </div>
      <div className="col-span-1 overflow-y-auto">
        <Card className="h-full">
          <CardHeader>Cart</CardHeader>
          <CardBody className="flex flex-col">
            <Cart className="grow overflow-y-auto" />
            <Button className="m-4" size="lg" color="primary">
              Pay now
            </Button>
          </CardBody>
        </Card>
      </div>
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
