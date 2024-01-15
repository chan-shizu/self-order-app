"use client";

import { FC } from "react";
import Image from "next/image";

type Props = {
  item: MenuItem;
  onClick: (id: string) => void;
};

export type MenuItem = {
  id: string;
  name: string;
  imagePath: string;
  price: number;
};

export const MenuCard: FC<Props> = ({ item, onClick }) => {
  return (
    <button
      className="text-left border rounded-md px-3 pt-2"
      onClick={() => onClick(item.id)}
    >
      <div className="flex justify-center relative h-24 w-28 mx-auto -z-10">
        <Image
          src={item.imagePath}
          alt="メニューの画像"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <p className="mt-3 text-sm h-12">
        {item.name}({item.price}円)
      </p>
    </button>
  );
};
