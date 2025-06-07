import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const sheetRange = "Sheet1!A1:E10";
    const reqParams = await request.json();
    const { sheetId, access_token } = reqParams;

    // ✅ Step 2: Use the access token to read data from Google Sheet
    const sheetResponse = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const sheetData = [...sheetResponse.data.values]
      .slice(1)
      .map(([a, b, c]) => ({
        name: a,
        email: b,
        topic: c,
      }));

    const results = await Promise.all(
      sheetData.map(
        async (user: { name: string; email: string; topic: string }) => {
          const prompt = `Write a personalized email to ${user.name} about the topic "${user.topic}". Keep it engaging and informative. considered bast regards as Email AI Team and generate only body content don't generate subject point content and best regards also can't generate suggestion sentence like Here is a personalized email to ${user.name}:.`;
          // Call GROQ API
          const groqRes = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
              model: "llama3-8b-8192", // or "mixtral-8x7b-32768"
              messages: [{ role: "user", content: prompt }],
              temperature: 0.7,
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json",
              },
            }
          );

          const emailContent = groqRes.data.choices[0].message.content;
          return {
            name: user.name,
            email: user.email,
            topic: user.topic,
            emailContent: emailContent,
          };
        }
      )
    );
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to fetch sheet data",
        error: error?.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
