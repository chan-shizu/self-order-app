import { FC } from "react";

type Props = { closeModal: () => void; orderItems: OrderItem[] };

export type OrderItem = {
  itemId: string;
  name: string;
  price: number;
  count: number;
};

export const OrderModal: FC<Props> = ({ closeModal, orderItems }) => {
  const totalFee = orderItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  return (
    <div className="bg-white fixed w-full h-screen top-0 left-0 z-20">
      <h2 className="text-3xl text-center py-5 border-b-2">カート内の表品</h2>
      <div className="px-4">
        <table className="w-full mt-6">
          <tr className="w-full text-left text-xl h-10 border-b">
            <th className="w-[60%]">商品名</th>
            <th className="w-[20%]">値段</th>
            <th className="w-[20%]">個数</th>
          </tr>
          {orderItems.map((item) => (
            <tr className="w-full h-8" key={item.itemId}>
              <td className="w-[60%]">{item.name}</td>
              <td className="w-[20%]">{item.price}</td>
              <td className="w-[20%]">{item.count}</td>
            </tr>
          ))}
        </table>
      </div>
      <div className="border-t mx-4 pt-2 flex">
        <p className="w-[60%]">合計金額</p>
        <p className="w-[40%]">{totalFee}</p>
      </div>
      <div className="sticky bottom-0 h-20 bg-white/90 flex gap-x-4 w-full p-4">
        <button
          className="w-full bg-slate-300 rounded-full"
          onClick={closeModal}
        >
          戻る
        </button>
      </div>
    </div>
  );
};
