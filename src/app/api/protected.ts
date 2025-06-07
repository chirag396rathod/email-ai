// /pages/api/protected.ts
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.json({ message: "Protected content", user: session.user });
}
