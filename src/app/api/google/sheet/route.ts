import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { access_token, refresh_token } = body;
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    oauth2Client.setCredentials({
      access_token,
      refresh_token,
    });
    const drive = google.drive({ version: "v3", auth: oauth2Client });
    const res = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet' and trashed = false",
      fields: "files(id, name)",
      pageSize: 100, // adjust as needed
    });
    return NextResponse.json(
      {
        data: res.data,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: `Internal Server Error - ${error.message || error}` },
      { status: 500 }
    );
  }
}
