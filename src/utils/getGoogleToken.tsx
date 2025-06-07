import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

export const GoogleAuthFn = (
  SCOPES: string
): Promise<{ authCode: string } | null> => {
  return new Promise((resolve) => {
    try {
      const client = (window as any).google.accounts.oauth2.initCodeClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: SCOPES,
        ux_mode: "popup",
        callback: (response: { code: string }) => {
          if (response.code) {
            const resData: any = getRefreshToken(response.code);
            resolve(resData);
          } else {
            console.error("Authorization code not received");
            resolve(null);
          }
        },
        error_callback: (error: any) => {
          resolve(null);
        },
      });

      client.requestCode();
    } catch (error) {
      console.error("Google authentication failed:", error);
      resolve(null);
    }
  });
};

const getRefreshToken = async (authCode: string) => {
  try {
    const params = new URLSearchParams({
      code: authCode,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!, // must be kept secret
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI!, // same as in your OAuth client settings
      grant_type: "authorization_code",
    });
    const response = await axios({
      method: "post",
      url: "https://oauth2.googleapis.com/token",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: params.toString(),
    });
    if (response.status === 200) {
      const googleData: unknown = response.data;
      return googleData;
    } else {
      console.error("Error fetching refresh token");
    }
  } catch (error) {
    console.error("Error fetching refresh token:", error);
  }
};
