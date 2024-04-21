"use client";

import { StateSelectField } from "@/components/StateSelectField";
import { InputField } from "@/shared/components";
import { Select, SelectItem } from "@nextui-org/select";
import { useForm } from "react-hook-form";

type Form = ReturnType<typeof useForm<IFormData>>;
type Register = Form["register"];

interface Props {
  states: { name: string; stateCode: string }[];
  register: Register;
  errors?: Form["formState"]["errors"];
}

export function ShippingAddressForm(props: Props) {
  const { states, errors = {}, register } = props;
  if (!register) return;
  const { fields } = getFields(register);

  return (
    <div>
      <fieldset className="flex flex-col gap-4">
        <Select
          label="Country"
          autoComplete="shipping country"
          isInvalid={!!errors.zipCode}
          errorMessage={errors.zipCode?.message}
          selectedKeys={["IN"]}
          className="mb-4 d-none"
          {...fields.country}
          style={{ display: "none" }} // need country select element for state field to auto-complete 🤷‍♂️
        >
          <SelectItem key={"IN"} value="IN">
            India
          </SelectItem>
        </Select>

        <div className="grid grid-cols-2 gap-8">
          <InputField
            className="col-span-1"
            label="First Name"
            autoComplete="shipping given-name"
            isRequired
            isInvalid={!!errors.firstName}
            errorMessage={errors.firstName?.message}
            {...fields.firstName}
          />
          <InputField
            className="col-span-1"
            label="Last Name"
            autoComplete="shipping family-name"
            isRequired
            isInvalid={!!errors.lastName}
            errorMessage={errors.lastName?.message}
            {...fields.lastName}
          />
        </div>
        <InputField
          label="Company Name"
          placeholder="Company Name (Optional)"
          autoComplete="shipping organization"
          isInvalid={!!errors.companyName}
          errorMessage={errors.companyName?.message}
          {...fields.companyName}
        />

        <InputField
          label="Street, Area, Village"
          autoComplete="shipping address-line1"
          isRequired
          isInvalid={!!errors.streetAreaVillage}
          errorMessage={errors.streetAreaVillage?.message}
          {...fields.streetAreaVillage}
        />

        <div className="grid grid-cols-3 gap-4">
          <InputField
            className="col-span-1"
            label="City"
            autoComplete="shipping address-level2"
            isInvalid={!!errors.city}
            isRequired
            errorMessage={errors.city?.message}
            {...fields.city}
          />

          <InputField
            className="col-span-1"
            label="Zip / Postal Code"
            autoComplete="shipping postal-code"
            isRequired
            isInvalid={!!errors.zipCode}
            errorMessage={errors.zipCode?.message}
            {...fields.zipCode}
          />

          <StateSelectField
            className="col-span-1"
            states={states}
            isInvalid={!!errors.state}
            errorMessage={errors.state?.message}
            {...fields.state}
          />
        </div>
        <InputField
          label="Phone Number"
          autoComplete="shipping tel"
          isRequired
          isInvalid={!!errors.phoneNumber}
          errorMessage={errors.phoneNumber?.message}
          {...fields.phoneNumber}
        />
      </fieldset>
    </div>
  );
}

export interface IFormData {
  country: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  streetAreaVillage: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
}

function getFields(register: Register) {
  const firstName = register("firstName", {
    required: "You must enter first name",
  });
  const country = register("country", {
    required: "You must select first name",
  });
  const lastName = register("lastName", {
    required: "You must enter last name",
  });
  const companyName = register("companyName", {
    minLength: {
      value: 3,
      message: "Company name must be atleast 3 characters",
    },
  });
  const streetAreaVillage = register("streetAreaVillage", {
    required: "You must street, area, village details",
  });
  const city = register("city", {
    required: "You must enter city name",
  });
  const state = register("state", {
    required: "You must select state",
  });

  const zipCode = register("zipCode", {
    required: "You must enter zip code",
  });

  const phoneNumber = register("phoneNumber", {
    required: "You must select state",
    minLength: {
      value: 10,
      message: "Phone number must be at least 10 characters",
    },
  });

  return {
    fields: {
      country,
      firstName,
      lastName,
      companyName,
      streetAreaVillage,
      city,
      state,
      zipCode,
      phoneNumber,
    },
  };
}

export type { Props as IShippingAddressForm };
