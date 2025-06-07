import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  context: { params: { id?: string[] } }
) {
  try {
    const userId = req.headers.get("id") || "";
    const flowId = context.params?.id?.[0]; // ✅ this works

    let data;
    if (flowId) {
      data = await prisma.flows.findUnique({ where: { id: flowId } });
    } else {
      data = await prisma.flows.findMany({
        where: { createdById: userId },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("id") || "";
    const reqParams = await req.json();
    const flowId = reqParams.flowId;
    let flow: any;
    if (flowId) {
      flow = await prisma.flows.update({
        where: {
          id: flowId,
        },
        data: {
          json: reqParams.json,
          createdById: userId,
        },
      });
    } else {
      flow = await prisma.flows.create({
        data: {
          json: reqParams.json,
          createdById: userId,
        },
      });
    }
    return NextResponse.json(
      {
        data: flow,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
