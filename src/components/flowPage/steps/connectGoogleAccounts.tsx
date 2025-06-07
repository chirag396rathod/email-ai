"use client";
import React from "react";
import { Loader } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/assets/google-icon.svg";
import { useGoogleSheetFlow } from "./useGoogleSheetFlow";

const ConnectGoogleAccounts = ({
  item,
  flowList,
  setFlowList,
}: {
  item: any;
  flowList: any;
  setFlowList: any;
  setLoading: any;
}) => {
  const { loading, handleConnectClick } = useGoogleSheetFlow({
    item,
    flowList,
    setFlowList,
  });

  return (
    <div className="relative border rounded-2xl p-4 bg-secondary">
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
              Google Account
              {item.status === "completed" && (
                <span className="inline-block rounded-full bg-primary px-3 text-sm font-medium text-white ml-2">
                  Connected
                </span>
              )}
            </div>
            <div className="text-sm text-zinc-400 font-normal">
              Connect your google sheet to fetch sheet details.
            </div>
          </div>
          <Button
            className={
              item.status === "completed" ? "text-white" : "text-primary"
            }
            variant={item.status === "completed" ? "default" : "outline"}
            onClick={handleConnectClick}
            disabled={item.status === "completed"}
          >
            {item.status === "completed" ? "Connected" : "Connect"}
          </Button>
        </div>
      </div>
      {loading && (
        <div className="flex items-center absolute top-0 left-0 w-full h-full backdrop-blur-xs rounded-2xl">
          <div className=" w-full h-full flex items-center justify-center">
            <Loader className="h-6 w-6 animate-spin text-white-600" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectGoogleAccounts;
