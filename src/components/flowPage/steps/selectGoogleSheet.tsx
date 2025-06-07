"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GoogleIcon from "@/assets/sheetIcon.svg";
import axiosInstance from "@/utils/axiosInstance";
import { Loader, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

const SelectGoogleSheet = ({
  flowList,
  setFlowList,
  item,
}: {
  flowList: any;
  setFlowList: any;
  item: any;
}) => {
  const router = useRouter();
  const [selectedSheetId, setSelectedSheetId] = useState<string | undefined>();
  const [loader, setLoader] = useState(false);
  const [sheetList, setSheetList] = useState([]);
  const data = flowList.data[0];
  const access_token = data?.extraInfo?.access_token;
  const refresh_token = data?.extraInfo?.refresh_token;

  const fetchSheetList = async (hasRefresh?: boolean) => {
    if (item?.extraInfo?.files && !hasRefresh) {
      setSheetList(item?.extraInfo?.files || []);
      setSelectedSheetId(item?.extraInfo?.sheetId);
      return;
    }
    if ((!access_token && !refresh_token) || loader) return;
    try {
      setLoader(true);
      const response = await axiosInstance({
        url: "/google/sheet",
        method: "POST",
        data: {
          access_token,
          refresh_token,
        },
      });
      const { data } = response.data;
      setSheetList(data?.files);
      handleSubmitFormData(data?.files, "files", false, hasRefresh);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const handleSubmitFormData = async (
    sheetData: any,
    name: string,
    hasUpdateNext: boolean,
    hasRefresh?: boolean
  ) => {
    try {
      setLoader(true);
      if (!sheetData) return;
      const currantStep = { ...item };
      currantStep.status = "completed";
      currantStep.extraInfo = sheetData;
      let NextItemIndex: any;
      const updatedData = flowList.data.map((f: any, index: number) => {
        if (f.title === item.title) {
          NextItemIndex = index + 1;
          return {
            ...f,
            status: hasUpdateNext ? "completed" : item.status,
            extraInfo: { ...item.extraInfo, [name]: sheetData },
          };
        }
        if (NextItemIndex === index && hasUpdateNext) {
          return {
            ...f,
            status: "active",
          };
        }
        return f;
      });
      const flowResponse = await axiosInstance({
        method: "POST",
        url: "/flows",
        data: {
          json: JSON.stringify(updatedData),
          flowId: flowList.id,
        },
      });
      const data = flowResponse.data;
      if (data) {
        setFlowList({
          id: flowList.id,
          data: updatedData,
        });
        if (!hasRefresh) {
          router.replace("/flow/update/" + flowList.id + "/?hasRefresh=true");
        }
      }
    } catch (error) {
      console.error("Google authentication failed:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleSelectSheet = (data) => {
    setSelectedSheetId(data);
  };

  const handleSubmitSheet = () => {
    if (selectedSheetId) {
      handleSubmitFormData(selectedSheetId, "sheetId", true, true);
    }
  };

  useEffect(() => {
    fetchSheetList();
  }, []);

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
          <div className="text-white text-[16px] font-medium">
            Google Sheet
            {item.status === "completed" && (
              <span className="inline-block rounded-full bg-primary px-3 text-sm font-medium text-white ml-2">
                Selected
              </span>
            )}
          </div>
          <div className="text-sm text-zinc-400 font-normal">
            Connect your google sheet to fetch sheet details.
          </div>
        </div>
        <Select
          onValueChange={(e) => handleSelectSheet(e)}
          value={selectedSheetId}
          disabled={item.status === "completed"}
        >
          <SelectTrigger className="min-w-[250px]">
            <SelectValue placeholder="Select sheet" />
          </SelectTrigger>
          <SelectContent className="min-w-[250px] max-w-[250px] max-h-[300px]">
            {sheetList &&
              sheetList.map((item: any, key) => (
                <SelectItem key={key} value={item.id}>
                  {item?.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-4">
        <div className="mt-4">
          <Button
            variant={"outline"}
            onClick={() => {
              fetchSheetList(true);
            }}
            disabled={item.status === "completed"}
          >
            {!loader ? (
              <>
                <RefreshCw />
                Refetch Sheet
              </>
            ) : (
              <div className=" w-full h-full flex items-center justify-center">
                <Loader className="h-6 w-6 animate-spin text-white-600" />
              </div>
            )}
          </Button>
        </div>
        <div className="mt-4">
          <Button
            variant={"default"}
            onClick={() => handleSubmitSheet()}
            disabled={item.status === "completed"}
          >
            {!loader ? (
              <>Submit</>
            ) : (
              <div className=" w-full h-full flex items-center justify-center">
                <Loader className="h-6 w-6 animate-spin text-white-600" />
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectGoogleSheet;
