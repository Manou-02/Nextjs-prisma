import { NextResponse } from "next/server";
import { generateAccessToken, generateRefreshToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const POST = async (req: Request) => {
  try {
    const { username, password } = await req.json();

    const findedUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: username,
          },
          {
            name: username,
          },
        ],
      },
    });

    if (!findedUser) {
      return NextResponse.json(
        {
          error: "Aucun utilisateur trouvé",
        },
        {
          status: 404,
        }
      );
    }

    // // Validate password
    // const isMatch = await bcrypt.compare(password, userFromDb.hashedPassword);
    // if (!isMatch) {
    //   return NextResponse.json(
    //     { message: "Invalid credentials" },
    //     { status: 401 }
    //   );
    // }

    // Generate JWT
    // const token = jwt.sign({ userId: userFromDb.id, email }, JWT_SECRET, {
    const payload = {
      userId: findedUser.id,
      email: findedUser.email,
    };
    const token = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return NextResponse.json({
      message: "Login successful",
      data: findedUser,
      token,
      refreshToken,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      { status: 500 }
    );
  }
};
