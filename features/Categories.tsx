"use client";

import { classnames } from "@/components/primitives";
import { Category } from "@/types";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import Link from "next/link";

interface Props {
  categories: Category[];
  className: string;
  selected?: string;
}

const Categories = ({ categories, selected }: Props) => {
  return (
    <div className={`w-1/5 p-4 mr-8 ${classnames.border}`}>
      <Listbox
        aria-label="Categories"
        selectedKeys={selected ? [selected] : undefined}
        selectionMode="single"
      >
        {categories.map((category) => (
          <ListboxItem
            key={category.id}
            href={`/product-categories/${category.id}`}
            as={Link}
            title={category.name}
          >
            {category.name}
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
};

export default Categories;
