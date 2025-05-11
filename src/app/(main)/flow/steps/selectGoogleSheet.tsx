import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import React from "react";
import GoogleIcon from "@/assets/sheetIcon.svg";

const SelectGoogleSheet = () => {
  return (
    <div className="border rounded-2xl p-4 mt-4 bg-secondary">
      <div className="text-lg font-medium ">Select google sheet.</div>
      <div className="text-sm font-normal pb-4 text-zinc-400">
        Now choose the Google Sheet you want to use — we’ll read data from it to
        create your emails
      </div>
      <div className="border rounded-2xl p-4 flex justify-between items-center w-full">
        <Image
          objectFit="contain"
          src={GoogleIcon}
          width={32}
          height={32}
          alt="google"
        />
        <div className="w-full ml-4">
          <div className="text-white text-[16px] font-medium">Google Sheet</div>
          <div className="text-sm text-zinc-400 font-normal">
            Connect your google sheet to fetch sheet details.
          </div>
        </div>
        <Select>
          <SelectTrigger className="w-[50%]">
            <SelectValue placeholder="Select sheet" />
          </SelectTrigger>
          <SelectContent className="w-[50%]">
            <SelectItem value="1">Sheet 1</SelectItem>
            <SelectItem value="2">Sheet 2</SelectItem>
            <SelectItem value="3">Sheet 3</SelectItem>
            <SelectItem value="4">Sheet 4</SelectItem>
            <SelectItem value="5">Sheet 5</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4">
        <Button variant={"default"}>Submit</Button>
      </div>
    </div>
  );
};

export default SelectGoogleSheet;
