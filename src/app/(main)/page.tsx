"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.accessToken && typeof window !== 'undefined') {
      localStorage.setItem("accessToken", session.accessToken ?? "");
      localStorage.setItem("user", JSON.stringify(session.user) ?? "");
      localStorage.setItem("exp", session.expires);
      // redirect("/flow");
    }else{
      redirect('/sign-in')
    }
  }, [status, session]);

  return null;
};

export default Home;
