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
      className="text-left border rounded-md p-2"
      onClick={() => onClick(item.id)}
    >
      <div className="flex justify-center">
        <Image
          src={item.imagePath}
          alt="メニューの画像"
          width={100}
          height={100}
        />
      </div>
      <p className="mt-3">{item.name}</p>
      <p>{item.price}円</p>
    </button>
  );
};
