import { NextResponse } from "next/server";

export const GET = (req: Request) => {
  return NextResponse.json(
    {
      name: "zaza",
    },
    { status: 200 }
  );
};
