"use server";

import { prisma } from "@/lib/prismaClientInstance";

type PostOrderBody = {
  tableId: number;
  itemId: string;
  name: string;
  price: number;
  count: number;
};

export const postOrders = async (body: PostOrderBody[]) => {
  try {
    const res = await prisma.order.createMany({ data: body });
    if (res.count) throw Error("post失敗!!");
    return { status: "ok" };
  } catch {
    return { status: "error" };
  }
};
