"use server";

import { prisma } from "@/lib/prismaClientInstance";

export const fetchOrders = async (tableId: number) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        AND: [
          { tableId: tableId },
          {
            OR: [{ status: "INITIAL" }, { status: "SERVED" }],
          },
        ],
      },
      select: {
        name: true,
        price: true,
        // @ts-ignore
        itemId: true,
        count: true,
      },
    });
    return { status: "ok", value: orders };
  } catch {
    return { status: "error", value: [] };
  }
};
