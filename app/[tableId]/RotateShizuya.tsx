import Image from "next/image";
import { FC } from "react";

export const RotateShizuya: FC = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-full flex justify-center align-middle z-50 bg-white/90">
      <div className="my-auto">
        <div className="animate-spin w-[150px] h-[150px] relative ml-5">
          <Image
            src="/images/loading_person_2.png"
            alt="person"
            objectFit="cover"
            layout="fill"
            className=""
          />
        </div>
        <p className="mt-5">ローディング中です、、、、</p>
      </div>
    </div>
  );
};
