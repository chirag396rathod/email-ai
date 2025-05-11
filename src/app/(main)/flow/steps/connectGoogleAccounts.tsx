import React from "react";
import GoogleIcon from "@/assets/google-icon.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ConnectGoogleAccounts = () => {
  return (
    <div className="border rounded-2xl p-4 bg-secondary">
      <div className="text-lg font-medium ">Connect your google account.</div>
      <div className="text-sm font-normal text-zinc-400">
        Let’s quickly connect your Google account to get started — this won’t
        take long!
      </div>
      <div className="p-2 flex items-center gap-4 border rounded-2xl mt-4">
        <Image
          objectFit="contain"
          src={GoogleIcon}
          width={32}
          height={32}
          alt="google"
        />
        <div className="flex justify-between items-center w-full">
          <div className="w-full">
            <div className="text-white text-[16px] font-medium">
              Google Sheet
            </div>
            <div className="text-sm text-zinc-400 font-normal">
              Connect your google sheet to fetch sheet details.
            </div>
          </div>
          <Button className="text-primary" variant={"outline"}>Connect</Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectGoogleAccounts;
