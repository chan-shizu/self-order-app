"use client";

import { SideBar } from "@/components/SideBar";
import { MenuCard, MenuItem } from "@/components/MenuCard";
import { NextPage } from "next";
import { useState } from "react";
import { MenuModal } from "@/components/MenuModal";
import { CartModal } from "@/components/CartModal";
import { OrderModal } from "@/components/OrderModal";
import { postOrder } from "./postOrder";

type Props = {
  params: {
    tableId: string;
  };
};

const foodItems: MenuItem[] = [
  {
    id: "1_1",
    name: "チャーハン",
    imagePath: "/images/cha-han.jpg",
    price: 0,
  },
  {
    id: "1_2",
    name: "インスタントラーメン",
    imagePath: "/images/ra-men.jpg",
    price: 0,
  },
  {
    id: "1_3",
    name: "野菜炒め",
    imagePath: "/images/cha-han.jpg",
    price: 0,
  },
  {
    id: "1_4",
    name: "適当に肉を焼いたもの",
    imagePath: "/images/cha-han.jpg",
    price: 0,
  },
  {
    id: "1_5",
    name: "甘い系のお菓子",
    imagePath: "/images/cha-han.jpg",
    price: 0,
  },
  {
    id: "1_6",
    name: "ポテチなど",
    imagePath: "/images/cha-han.jpg",
    price: 0,
  },
  {
    id: "1_7",
    name: "甘い系のお菓子",
    imagePath: "/images/cha-han.jpg",
    price: 0,
  },
  {
    id: "1_8",
    name: "ポテチなど",
    imagePath: "/images/cha-han.jpg",
    price: 0,
  },
];

const drinkItems: MenuItem[] = [
  {
    id: "2_1",
    name: "水道水",
    imagePath: "/images/cha-han.jpg",
    price: 0,
  },
  {
    id: "2_2",
    name: "お茶",
    imagePath: "/images/cha-han.jpg",
    price: 0,
  },
  {
    id: "2_3",
    name: "カルピス",
    imagePath: "/images/cha-han.jpg",
    price: 0,
  },
  {
    id: "2_4",
    name: "コーラ",
    imagePath: "/images/cha-han.jpg",
    price: 0,
  },
  {
    id: "2_5",
    name: "ビール",
    imagePath: "/images/cha-han.jpg",
    price: 0,
  },
  {
    id: "2_6",
    name: "サワー系",
    imagePath: "/images/cha-han.jpg",
    price: 0,
  },
  {
    id: "2_7",
    name: "ワイン",
    imagePath: "/images/cha-han.jpg",
    price: 0,
  },
];

type cartItem = {
  id: string;
  count: number;
};

const menuItems = foodItems.concat(drinkItems);

const Page: NextPage<Props> = ({ params: { tableId } }) => {
  const [openModalMenuId, setOpenModalMenuId] = useState("");
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<cartItem[]>([]);

  const handleMenuCardOnClick = (id: string) => {
    setOpenModalMenuId(id);
  };
  const closeModal = () => {
    setOpenModalMenuId("");
  };
  const updateCartItem = (id: string, count: number) => {
    const itemExist = cartItems.some((item) => item.id === id);
    if (itemExist) {
      const newCartItems = cartItems.map((item) =>
        item.id === id ? { id: id, count: count } : item
      );
      setCartItems(newCartItems);
    } else {
      setCartItems((prev) => [...prev, { id: id, count: count }]);
    }
  };
  const closeCartModal = () => {
    const newCartItems = cartItems.filter((item) => item.count > 0);
    setCartItems(newCartItems);
    setIsCartModalOpen(false);
  };
  const openCartModal = () => {
    const newCartItems = cartItems.filter((item) => item.count > 0);
    setCartItems(newCartItems);
    setIsCartModalOpen(true);
  };
  const insertOrder = async () => {
    const orderPostBody = cartItems.map((item) => {
      const menuItem = menuItems.find((menuItem) => menuItem.id === item.id);
      return {
        tableId: +tableId,
        itemId: item.id,
        name: menuItem?.name!,
        price: menuItem?.price!,
        count: item.count,
      };
    });
    const result = await postOrder(orderPostBody);
    if (result.status !== "ok") {
      console.log("postする際にerrorが発生しちゃった、、");
    }
    setCartItems([]);
    setIsCartModalOpen(false);
  };

  const selectedMenuItem = menuItems.find(
    (item) => item.id === openModalMenuId
  );
  const selectedItemCount =
    cartItems.find((item) => item.id === openModalMenuId)?.count ?? 0;
  const cartModalItems = cartItems.map((item) => {
    const menuItem = menuItems.find((menuItem) => menuItem.id === item.id);
    return {
      id: item.id,
      count: item.count,
      name: menuItem?.name!,
      price: menuItem?.price!,
    };
  });

  return (
    <div className="relative">
      <header className="text-center flex justify-center items-center text-xl font-semibold relative">
        <h1 className="border-b-2 w-full py-3">テーブル{tableId}番</h1>
        <a className="absolute text-base top-3 right-3" href="tel:07074939329">
          呼び出し
        </a>
      </header>
      {/* <div className="flex"> */}
      <div className="mt-3 sticky top-0 bg-white/90 pt-3">
        <SideBar />
      </div>
      <div className="px-2">
        <section id="food-section" className="pt-10">
          <h2 className="text-3xl border-b-2 pb-2">ごはん</h2>
          <div className="w-full grid grid-cols-2 gap-x-2 gap-y-4 mt-2">
            {foodItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onClick={handleMenuCardOnClick}
              />
            ))}
          </div>
        </section>
        <section id="drink-section" className="pt-10">
          <h2 className="text-3xl border-b-2 pb-2">飲み物</h2>
          <div className="w-full grid grid-cols-2 gap-x-2 gap-y-4 mt-2">
            {drinkItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onClick={handleMenuCardOnClick}
              />
            ))}
          </div>
        </section>
      </div>
      <div className="sticky bottom-0 h-20 bg-white flex gap-x-4 w-full p-4">
        <button
          className="w-full bg-red-300 rounded-full relative"
          onClick={openCartModal}
        >
          カート
          <p className="absolute -top-2 right-0 w-8 h-8 text-xl rounded-full border-2 border-red-500 bg-white">
            {cartItems.length}
          </p>
        </button>
        <button
          className="w-full bg-slate-300 rounded-full"
          onClick={() => setIsOrderModalOpen(true)}
        >
          注文済み
        </button>
      </div>

      {openModalMenuId !== "" && (
        <MenuModal
          item={selectedMenuItem!}
          closeModal={closeModal}
          updateCartItem={updateCartItem}
          initialCount={selectedItemCount}
        />
      )}

      {isCartModalOpen && (
        <CartModal
          items={cartModalItems}
          closeModal={closeCartModal}
          updateCartItem={updateCartItem}
          insertOrder={insertOrder}
        />
      )}

      {isOrderModalOpen && (
        <OrderModal closeModal={() => setIsOrderModalOpen(false)} />
      )}
    </div>
  );
};

export default Page;
