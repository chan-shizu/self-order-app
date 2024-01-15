"use server";

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type PostOrderBody = {
  tableId: number;
  itemId: string;
  name: string;
  price: number;
  count: number;
};

export const postOrder = async (body: PostOrderBody[]) => {
  try {
    const order = await prisma.order.createMany({ data: body });
    console.log("############");
    console.log(order);
    if (order.count) throw Error("post失敗!!");
    return { status: "ok" };
  } catch {
    return { status: "error" };
  }
};
