"use client";

import { classnames } from "@/components/primitives";
import { Category } from "@/types";
import { Listbox, ListboxItem } from "@nextui-org/listbox";

interface Props {
  categories: Category[];
  className: string;
}

const Categories = ({ categories, className }: Props) => {
  return (
    <div className={`w-1/5 p-4 mr-8 ${classnames.border}`}>
      <Listbox aria-label="Categories">
        {categories.map((category) => (
          <ListboxItem key={category.id}>{category.name}</ListboxItem>
        ))}
      </Listbox>
    </div>
  );
};

export default Categories;
