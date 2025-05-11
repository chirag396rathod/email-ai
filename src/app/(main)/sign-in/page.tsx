"use client";
import React from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import googleIcon from "@/assets/google-icon.svg";

const SignIn = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated" && session?.accessToken) {
    console.log("call 1");
    localStorage.setItem("accessToken", session.accessToken ?? "");
    localStorage.setItem("user", JSON.stringify(session.user) ?? "");
    localStorage.setItem("exp", session.expires);
    redirect("/flow");
  }

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <Button
        variant="outline"
        className="cursor-pointer gap-2 px-4 py-2"
        onClick={() => signIn("google")}
      >
        <Image src={googleIcon} width={24} height={24} alt="Google icon" />
        <span className="font-medium text-sm">Sign in with Google</span>
      </Button>
    </div>
  );
};

export default SignIn;
