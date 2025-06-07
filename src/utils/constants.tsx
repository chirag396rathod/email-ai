export const GOOGLE_SHEET_SCOPE =
  "openid email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/documents.readonly https://www.googleapis.com/auth/spreadsheets";

export const getUserDetails = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

export const getUserId = () => {
  if (typeof window !== 'undefined') {
    const data = getUserDetails()
    return data?.id;
  }
  return null;
};
