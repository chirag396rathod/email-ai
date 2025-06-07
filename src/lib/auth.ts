import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function requireUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    throw new Error("UNAUTHORIZED");
  }
  return session.user; // { id, email, … }
}
