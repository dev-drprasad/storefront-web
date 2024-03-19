"use client";

import { getMediaURLPrefix } from "@/backend/utils";
import { SearchIcon } from "@/components/icons";
import Money from "@/entities/money";
import { useProducts } from "@/entities/product/hooks";

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";

interface Props {
  className: string;
}

export function Search(props: Props) {
  const { className } = props;
  const { data = [], loading } = useProducts();

  return (
    <Autocomplete
      defaultItems={data}
      variant="bordered"
      label="Search"
      labelPlacement="inside"
      className={className}
      isLoading={loading}
      endContent={<SearchIcon />}
    >
      {(searchItem) => (
        <AutocompleteItem key={searchItem.id} textValue={searchItem.name}>
          <Link
            className="flex gap-2 items-center"
            href={`/products/${searchItem.slug}`}
          >
            <Avatar
              alt={searchItem.name}
              className="flex-shrink-0"
              src={`${getMediaURLPrefix()}/${searchItem.imageUrls.at(0)}`}
              radius="sm"
            />
            <div className="flex flex-col">
              <span className="text-small">{searchItem.name}</span>
              <span className="text-tiny text-primary-400">
                {Money.format(searchItem.sellPrice)}
              </span>
            </div>
          </Link>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
