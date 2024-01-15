import { FC } from "react";

type OrderItem = {
  id: string;
  count: number;
  name: string;
  price: number;
};

type Props = {
  items: OrderItem[];
  closeModal: () => void;
  updateCartItem: (id: string, count: number) => void;
};

export const CartModal: FC<Props> = ({ items, closeModal, updateCartItem }) => {
  return (
    <div className="bg-white fixed w-full h-screen top-0 left-0">
      <h2 className="text-3xl text-center py-5 border-b-2">カート内の表品</h2>
      <div className="px-4">
        <table className="w-full mt-6">
          <tr className="w-full text-left text-xl h-14">
            <th className="w-[60%]">商品名(値段)</th>
            <th className="w-[20%]">個数</th>
          </tr>
          {items.map((item) => (
            <tr className="w-full h-10">
              <td className="">
                {item.name}({item.price}円)
              </td>
              <td className="w-[100px] flex justify-center gap-x-2">
                <button
                  className="h-8 bg-sky-200 w-8 rounded-full"
                  onClick={() =>
                    updateCartItem(item.id, Math.max(item.count - 1, 0))
                  }
                >
                  -
                </button>
                <p className="flex-none w-4 flex justify-center items-center">
                  {item.count}
                </p>
                <button
                  className="h-8 bg-red-400 w-8 rounded-full"
                  onClick={() => updateCartItem(item.id, item.count + 1)}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className="sticky bottom-0 h-20 bg-white/90 flex gap-x-4 w-full p-4">
        <button
          className="w-full bg-slate-300 rounded-full"
          onClick={closeModal}
        >
          戻る
        </button>
        <button className="w-full bg-red-300 rounded-full">注文</button>
      </div>
    </div>
  );
};
