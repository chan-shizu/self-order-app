import { FC } from "react";

type Props = { closeModal: () => void };

const menuItems = [
  {
    id: "1_1",
    count: 3,
    name: "チャーハン",
    price: 0,
  },
  {
    id: "1_2",
    count: 3,
    name: "インスタントラーメン",
    price: 0,
  },
  {
    id: "1_3",
    count: 1,
    name: "野菜炒め",
    price: 0,
  },
];

export const OrderModal: FC<Props> = ({ closeModal }) => {
  const totalFee = menuItems.reduce((sum, item) => item.price * item.count, 0);

  return (
    <div className="bg-white fixed w-full h-screen top-0 left-0">
      <h2 className="text-3xl text-center py-5 border-b-2">カート内の表品</h2>
      <div className="px-4">
        <table className="w-full mt-6">
          <tr className="w-full text-left text-xl h-10 border-b">
            <th className="w-[60%]">商品名</th>
            <th className="w-[20%]">値段</th>
            <th className="w-[20%]">個数</th>
          </tr>
          {menuItems.map((item) => (
            <tr className="w-full h-8" key={item.id}>
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
