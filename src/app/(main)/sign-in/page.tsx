"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import googleIcon from "@/assets/google-icon.svg";
import axiosInstance from "@/utils/axiosInstance";
import { Loader } from "lucide-react";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const handleLogin = async (user: unknown) => {
    try {
      setLoading(true);
      const response = await axiosInstance({
        method: "POST",
        url: "/users",
        data: user,
      });
      const { data } = response.data;
      if (data) {
        if (status === "authenticated" && session?.accessToken) {
          localStorage.setItem("accessToken", session.accessToken ?? "");
          localStorage.setItem("user", JSON.stringify(data) ?? "");
          localStorage.setItem("exp", session.expires);
          window.location.href = "http://localhost:3000/flow";
        }
      }
    } catch (error: unknown) {
      console.error("error :-", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      handleLogin(session);
    }
  }, [session]);

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <Button
        variant="outline"
        className="cursor-pointer gap-2 px-4 py-2 w-[200px]"
        onClick={() => signIn("google")}
        disabled={loading}
      >
        {!loading ? (
          <>
            <Image src={googleIcon} width={24} height={24} alt="Google icon" />
            <span className="font-medium text-sm">Sign in with Google</span>
          </>
        ) : (
          <Loader className="h-6 w-6 animate-spin text-white-600" />
        )}
      </Button>
    </div>
  );
};

export default SignIn;
