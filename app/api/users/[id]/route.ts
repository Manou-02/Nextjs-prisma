import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (_: Request, context: any) => {
  try {
    const { id } = await context.params;

    const data = await prisma.user
      .findFirst({
        where: {
          id: parseInt(id),
        },
      })
      .catch((err) => {
        console.log(err);
      });

    return NextResponse.json(
      {
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      { status: 500 }
    );
  }
};
