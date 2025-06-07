"use client";
import React, { useEffect, useState } from "react";
import { useLottie } from "lottie-react";
import LoaderJson from "@/assets/josn-loder.json";
import { CircleCheckBig, Loader, RefreshCw } from "lucide-react";
import { useGoogleSheetFlow } from "./useGoogleSheetFlow";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { ContentPreviewModal } from "./ContentPreviewModal";

const GenerateContent = ({ item, flowList, setFlowList }: any) => {
  const [loader, setLoader] = useState(false);
  const [generatedData, setGeneratedData] = useState([]);
  const [hasReconnect, setHasReconnect] = useState(false);
  const { loading, handleConnectClick } = useGoogleSheetFlow({
    item,
    flowList,
    setFlowList,
    hasRefetch: true,
  });

  const data = flowList.data ? flowList.data : {};
  const access_token = data[0]?.extraInfo?.access_token;
  const refresh_token = data[0]?.extraInfo?.refresh_token;
  const sheetId = data[1]?.extraInfo?.sheetId;

  const readSheetAndGenerateContent = async () => {
    try {
      setLoader(true);
      const response = await axiosInstance({
        url: "/generate",
        method: "POST",
        data: {
          access_token,
          refresh_token,
          sheetId,
        },
      });
      if (response.status === 200) {
        setGeneratedData(response.data.data);
      }
    } catch (error: any) {
      const response = error?.response?.data?.error?.error;
      console.log(response);
      if (response?.status === "UNAUTHENTICATED") {
        setHasReconnect(true);
      }
    } finally {
      setLoader(false);
    }
  };

  const handleSubmitFormData = async (contentData: any) => {
    try {
      setLoader(true);
      if (contentData.length === 0) return;
      const currantStep = { ...item };
      currantStep.status = "completed";
      currantStep.extraInfo = contentData;
      let NextItemIndex: any;
      const updatedData = flowList.data.map((f: any, index: number) => {
        if (f.title === item.title) {
          NextItemIndex = index + 1;
          return {
            ...f,
            status: "completed",
            extraInfo: contentData,
          };
        }
        if (NextItemIndex === index) {
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
      }
    } catch (error) {
      console.error("Google authentication failed:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      setHasReconnect(false);
    }
  }, [loading]);

  useEffect(() => {
    if (item.status === "completed") {
      console.log(item.extraInfo);
      setGeneratedData(item.extraInfo);
    }
  }, [item]);

  return (
    <div className="mt-4 border rounded-2xl p-4 bg-secondary relative">
      <div className="text-lg font-medium ">
        Generate Emails from Your Sheet Prompts
      </div>
      <div className="text-sm font-normal pb-2 text-zinc-400">
        We’ll read your sheet and use the prompt column to generate personalized
        email content.
      </div>
      {(loader || generatedData.length > 0 || item.status === "completed") && (
        <div className="flex items-center pt-4">
          <div className="w-[32px] h-[32x] flex items-center justify-center">
            {loader ? (
              <RefreshCw
                className="animate-spin text-white-600"
                width={20}
                height={20}
              />
            ) : (
              <CircleCheckBig width={20} height={20} color="#198038" />
            )}
          </div>
          <span className="text-[14px] font-normal ml-2">
            {loader
              ? "Crafting your perfect email using AI. just a moment!"
              : "Email AI generated content successfully!"}
          </span>
        </div>
      )}
      {generatedData.length > 0 || item.status === "completed" ? (
        <>
          <div className="flex items-center pt-4 ">
            <div className="w-[32px] h-[32x] flex items-center justify-center">
              <CircleCheckBig width={20} height={20} color="#198038" />
            </div>
            <span className="text-[14px] font-normal ml-2">
              Email content ready to send.
            </span>
          </div>

          <div className="flex justify-end border-t mt-4">
            <ContentPreviewModal
              className="mt-4"
              data={generatedData}
              setGeneratedData={setGeneratedData}
              handleSubmitFormData={handleSubmitFormData}
              disabled={item.status === "completed"}
            />
          </div>
        </>
      ) : (
        <>
          {!loader && (
            <div className="flex items-center justify-between mt-2 border-t pt-4">
              <span className="text-[14px] font-normal mr-2">
                Click here to generate content.
              </span>
              {hasReconnect ? (
                <Button variant={"default"} onClick={handleConnectClick}>
                  Reconnect to Google Sheets
                </Button>
              ) : (
                <Button
                  variant={"default"}
                  onClick={readSheetAndGenerateContent}
                >
                  {loader ? (
                    <div className=" w-full h-full flex items-center justify-center">
                      <Loader className="h-6 w-6 animate-spin text-white-600" />
                    </div>
                  ) : (
                    <>
                      <RefreshCw />
                      Generate Email Content
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
        </>
      )}
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

export default GenerateContent;
