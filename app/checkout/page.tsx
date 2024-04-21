import SiteConfig from "@/backend/siteConfig";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { BillingAddress } from "./BillingAddress";
import { Cart } from "@/features/Cart";
import { Button } from "@nextui-org/button";
import { ShippingAddress } from "./ShippingAddress";
import { Auth } from "./Auth";
import { CheckoutForm } from "./CheckoutForm";

interface Props {}

async function CheckoutPage(props: Props) {
  const states = await getCountryStates();

  return (
    <div className="grid grid-cols-3 gap-8 h-full">
      <div className="col-span-2 overflow-y-auto">
        <div className="flex flex-col gap-8">
          <Auth />
          <CheckoutForm states={states} />
        </div>
      </div>
      <div className="col-span-1">
        <Card className="h-full">
          <CardHeader>Cart</CardHeader>
          <CardBody>
            <Cart />
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
