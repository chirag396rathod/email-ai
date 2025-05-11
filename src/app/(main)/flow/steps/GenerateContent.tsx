"use client";
import React from "react";
import { useLottie } from "lottie-react";
import Loader from "@/assets/josn-loder.json";
import { CircleCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";

const GenerateContent = () => {
  const options = {
    animationData: Loader,
    loop: true,
    style: {
      width: 32, // or "100px"
      height: 32,
      margin: "auto",
    },
  };
  const { View } = useLottie(options);

  return (
    <div className="mt-4 border rounded-2xl p-4 bg-secondary">
      <div className="text-lg font-medium ">
        Generate Emails from Your Sheet Prompts
      </div>
      <div className="text-sm font-normal pb-4 text-zinc-400">
        We’ll read your sheet and use the prompt column to generate personalized
        email content.
      </div>
      <div className="flex items-center border-t-2 pt-4">
        <div>{View}</div>
        <span className="text-[14px] font-normal ml-2">
          Crafting your perfect email using AI. just a moment!
        </span>
      </div>
      <div className="flex items-center pt-4">
        <div className="w-[32px] h-[32x] flex items-center justify-center">
          <CircleCheckBig width={20} height={20} color="#198038" />
        </div>
        <span className="text-[14px] font-normal ml-2">
          Email content ready to send.
        </span>
      </div>
      <Button variant={"outline"} className="mt-4">Preview Email Content</Button>
    </div>
  );
};

export default GenerateContent;
