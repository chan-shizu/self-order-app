"use client";

import { SideBar } from "@/components/SideBar";
import { MenuCard, MenuItem } from "@/components/MenuCard";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { MenuModal } from "@/components/MenuModal";
import { CartModal } from "@/components/CartModal";
import { OrderItem, OrderModal } from "@/components/OrderModal";
import { postOrders } from "./postOrders";
import { fetchOrders } from "./fetchOrders";

type Props = {
  params: {
    tableId: string;
  };
};

const foodItems: MenuItem[] = [
  {
    id: "1_1",
    name: "野菜炒め",
    imagePath: "/images/yasai_itame.webp",
    price: 0,
  },
  {
    id: "1_2",
    name: "目玉焼き",
    imagePath: "/images/medama_yaki.jpg",
    price: 0,
  },
  {
    id: "1_3",
    name: "チャーハン",
    imagePath: "/images/cha-han.jpg",
    price: 0,
  },
  {
    id: "1_4",
    name: "卵かけご飯",
    imagePath: "/images/tamagokake_gohan.webp",
    price: 0,
  },
  {
    id: "1_5",
    name: "インスタントラーメン",
    imagePath: "/images/ra-men.jpg",
    price: 0,
  },
  {
    id: "1_6",
    name: "おにぎり",
    imagePath: "/images/onigiri.jpg",
    price: 0,
  },
  {
    id: "1_7",
    name: "ピザ",
    imagePath: "/images/pizza.jpeg",
    price: 0,
  },
  {
    id: "1_8",
    name: "サンドウィッチ",
    imagePath: "/images/sandwich.jpg",
    price: 0,
  },
];

const snackItems: MenuItem[] = [
  {
    id: "2_1",
    name: "甘い系のお菓子",
    imagePath: "/images/amai_okashi.jpg",
    price: 0,
  },
  {
    id: "2_2",
    name: "ポテチなど",
    imagePath: "/images/potechi.jpg",
    price: 0,
  },
  {
    id: "2_3",
    name: "ポップコーン",
    imagePath: "/images/popcorn.jpg",
    price: 0,
  },
  {
    id: "2_4",
    name: "ケーキ",
    imagePath: "/images/cake.webp",
    price: 0,
  },
  {
    id: "2_5",
    name: "シュークリームとか",
    imagePath: "/images/shu-cream.jpg",
    price: 0,
  },
];

const drinkItems: MenuItem[] = [
  {
    id: "3_1",
    name: "水",
    imagePath: "/images/water.jpg",
    price: 0,
  },
  {
    id: "3_2",
    name: "お茶",
    imagePath: "/images/ocha.jpg",
    price: 0,
  },
  {
    id: "3_3",
    name: "カルピス",
    imagePath: "/images/calpis.jpg",
    price: 0,
  },
  {
    id: "3_4",
    name: "コーラ",
    imagePath: "/images/cola.jpg",
    price: 0,
  },
  {
    id: "3_5",
    name: "ビール",
    imagePath: "/images/beer.jpg",
    price: 0,
  },
  {
    id: "3_6",
    name: "サワー",
    imagePath: "/images/sawa.webp",
    price: 0,
  },
  {
    id: "3_7",
    name: "ほろ酔い",
    imagePath: "/images/horoyoi.jpg",
    price: 0,
  },
  {
    id: "3_8",
    name: "ストロング",
    imagePath: "/images/strong.png",
    price: 0,
  },
  {
    id: "3_9",
    name: "ワイン",
    imagePath: "/images/wine.jpg",
    price: 0,
  },
];

const otherItems: MenuItem[] = [
  {
    id: "4_1",
    name: "タオル",
    imagePath: "/images/towel.jpg",
    price: 0,
  },
  {
    id: "4_2",
    name: "クッション",
    imagePath: "/images/cushion.jpg",
    price: 0,
  },
  {
    id: "4_3",
    name: "プロジェクター",
    imagePath: "/images/projector.jpg",
    price: 0,
  },
  {
    id: "4_4",
    name: "ギター",
    imagePath: "/images/akogi.jpg",
    price: 0,
  },
  {
    id: "4_5",
    name: "キーボード",
    imagePath: "/images/keyboard.jpg",
    price: 0,
  },
  {
    id: "4_6",
    name: "スマイル",
    imagePath: "/images/smile.jpg",
    price: 0,
  },
];

type cartItem = {
  id: string;
  count: number;
};

const menuItems = foodItems.concat(drinkItems, snackItems, otherItems);

const Page: NextPage<Props> = ({ params: { tableId } }) => {
  const [openModalMenuId, setOpenModalMenuId] = useState("");
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<cartItem[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    (async () => {
      const orders = await fetchOrders(+tableId);
      if (orders.status !== "ok") return;
      const uniqueOrders = Array.from(
        // @ts-ignore
        new Map(orders.value.map((order) => [order.itemId, order])).values()
      );
      const ordersWithCount = uniqueOrders.map((order) => {
        const orderCount = orders.value.filter(
          // @ts-ignore
          (currentOrder) => order.itemId === currentOrder.itemId
        ).length;
        return {
          // @ts-ignore
          itemId: order.itemId,
          name: order.name,
          price: order.price,
          count: orderCount,
        };
      });
      setOrderItems(ordersWithCount);
    })();
  }, [isOrderModalOpen, isCartModalOpen]);

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
    const result = await postOrders(orderPostBody);
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
      <div className="sticky top-0 bg-white z-10 pt-3">
        <SideBar />
      </div>
      <div className="px-2">
        <section className="pt-3 relative">
          <div className="absolute -mt-20" id="food-section"></div>
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
        <section className="pt-7 relative">
          <div className="absolute -mt-20" id="snack-section"></div>
          <h2 className="text-3xl border-b-2 pb-2">おかし</h2>
          <div className="w-full grid grid-cols-2 gap-x-2 gap-y-4 mt-2">
            {snackItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onClick={handleMenuCardOnClick}
              />
            ))}
          </div>
        </section>
        <section className="pt-7 relative">
          <div className="absolute -mt-20" id="drink-section"></div>
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
        <section className="pt-7 relative">
          <div className="absolute -mt-20" id="other-section"></div>
          <h2 className="text-3xl border-b-2 pb-2">その他</h2>
          <div className="w-full grid grid-cols-2 gap-x-2 gap-y-4 mt-2">
            {otherItems.map((item) => (
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
          {cartItems.length > 0 && (
            <p className="absolute -top-2 right-0 w-8 h-8 text-xl rounded-full border-2 border-red-500 bg-white">
              {cartItems.length}
            </p>
          )}
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
        <OrderModal
          closeModal={() => setIsOrderModalOpen(false)}
          orderItems={orderItems}
        />
      )}
    </div>
  );
};

export default Page;
