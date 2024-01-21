import { FC } from "react";

type Props = {};

export const SideBar: FC<Props> = ({}) => {
  return (
    <nav className="">
      <ul className="list-none flex h-16 divide-x-2 overflow-x-scroll pb-3">
        <li className="min-w-[120px] h-full px-2">
          <a
            className="bg-slate-100 w-full h-full flex justify-center items-center"
            href="#food-section"
          >
            ごはん
          </a>
        </li>
        <li className="min-w-[120px] h-full px-2">
          <a
            className="bg-slate-100 w-full h-full flex justify-center items-center"
            href="#snack-section"
          >
            おかし
          </a>
        </li>
        <li className="min-w-[120px] h-full px-2">
          <a
            className="bg-slate-100 w-full h-full flex justify-center items-center"
            href="#drink-section"
          >
            飲み物
          </a>
        </li>
        <li className="min-w-[120px] h-full px-2">
          <a
            className="bg-slate-100 w-full h-full flex justify-center items-center"
            href="#other-section"
          >
            その他
          </a>
        </li>
      </ul>
    </nav>
  );
};
