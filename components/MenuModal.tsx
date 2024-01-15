"use client";

import { FC, useState } from "react";
import { MenuItem } from "./MenuCard";
import Image from "next/image";

type Props = {
  item: MenuItem;
  closeModal: () => void;
  updateCartItem: (id: string, count: number) => void;
  initialCount: number;
};

export const MenuModal: FC<Props> = ({
  item,
  closeModal,
  updateCartItem,
  initialCount,
}) => {
  const [itemCount, setItemCount] = useState(initialCount);

  const handleOnAddButtonClick = () => {
    updateCartItem(item.id, itemCount);
    closeModal();
  };

  return (
    <div
      className="bg-white/90 fixed w-full h-screen top-0 left-0 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="border w-80 bg-white pb-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full text-center text-2xl px-2 py-3 border-b-2 flex">
          <p>
            {item.name}({item.price}円)
          </p>
          <button
            onClick={closeModal}
            className="relative before:absolute before:left-0 before:top-0 before:h-[2px] before:w-[16px] bg-black"
          ></button>
        </div>
        <div className="flex mt-6 gap-x-4 px-4">
          <div className="flex justify-center">
            <Image
              src={item.imagePath}
              alt="メニューの画像"
              width={100}
              height={100}
            />
          </div>
          <div className="w-full">
            {/* <p className=" text-center text-3xl">{item.price}円</p> */}
            <div className="flex mt-4 justify-center gap-x-3 items-center w-full mx-auto">
              <button
                className="h-12 bg-sky-200 w-12 rounded-full"
                onClick={() => setItemCount((prev) => Math.max(prev - 1, 0))}
              >
                -
              </button>
              <p className="flex-none text-3xl w-4 flex justify-center items-center">
                {itemCount}
              </p>
              <button
                className="h-12 bg-red-400 w-12 rounded-full"
                onClick={() => setItemCount((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex gap-x-2 h-14 px-4 mt-8">
          <button
            className="w-full bg-slate-300 rounded-full"
            onClick={closeModal}
          >
            閉じる
          </button>
          <button
            className="w-full bg-red-300 rounded-full"
            onClick={handleOnAddButtonClick}
          >
            追加
          </button>
        </div>
      </div>
    </div>
  );
};
