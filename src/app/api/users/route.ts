import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // ✅ read once
    const { email, accessToken } = body;

    if (!accessToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: body?.name,
          email: body?.email,
          image: body?.picture,
          provider: "google",
          providerId: body?.token,
        },
      });
    }
    return NextResponse.json({
      message: "User created successfully",
      data: user,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: `Internal Server Error - ${error.message || error}` },
      { status: 500 }
    );
  }
}
