import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const data = await prisma.user.findMany();

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

export const POST = async (req: Request) => {
  try {
    const data = await req.json();

    const res = await prisma.user.create({
      data,
    });

    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      { status: 500 }
    );
  }
};

// export const PATCH = async ()
