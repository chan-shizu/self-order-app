import { FC } from "react";

type Props = {};

export const SideBar: FC<Props> = ({}) => {
  return (
    <nav className="">
      <ul className="list-none flex h-16 divide-x-2">
        <li className="w-1/3 h-full px-2">
          <a
            className="bg-slate-100 w-full h-full flex justify-center items-center"
            href="#food-section"
          >
            ご飯系
          </a>
        </li>
        <li className="w-1/3 h-full px-2">
          <a
            className="bg-slate-100 w-full h-full flex justify-center items-center"
            href="#drink-section"
          >
            飲み物系
          </a>
        </li>
        <li className="w-1/3 h-full px-2">
          <a className="bg-slate-100 w-full h-full flex justify-center items-center">
            その他
          </a>
        </li>
      </ul>
    </nav>
  );
};
