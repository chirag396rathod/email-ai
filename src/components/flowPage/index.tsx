"use client";
import React from "react";
import { Loader } from "lucide-react";
import { useFlows } from "@/hooks/use-flow";
import ConnectGoogleAccounts from "./steps/connectGoogleAccounts";
import SelectGoogleSheet from "./steps/selectGoogleSheet";
import GenerateContent from "./steps/GenerateContent";
import Success from "./steps/success";

const Flow = () => {
  const { flowList, setFlowList, loading, setLoading } = useFlows();

  return (
    <div className="container max-w-[768px] mx-auto my-0">
      {loading ? (
        <div className="flex items-start mt-4  w-full h-full">
          <div className=" w-full h-full flex items-center justify-center">
            <Loader className="h-6 w-6 animate-spin text-white-600" />
          </div>
        </div>
      ) : (
        <>
          {flowList.data.map((item, key) => {
            if (
              item.title === "Step 1" &&
              (item.status === "active" || item.status === "completed")
            ) {
              return (
                <ConnectGoogleAccounts
                  key={key}
                  item={item}
                  flowList={flowList}
                  setFlowList={setFlowList}
                  setLoading={setLoading}
                />
              );
            }
            if (
              item.title === "Step 2" &&
              (item.status === "active" || item.status === "completed")
            ) {
              return (
                <SelectGoogleSheet
                  key={key}
                  item={item}
                  flowList={flowList}
                  setFlowList={setFlowList}
                />
              );
            }
            if (
              item.title === "Step 3" &&
              (item.status === "active" || item.status === "completed")
            ) {
              return (
                <GenerateContent
                  key={key}
                  item={item}
                  flowList={flowList}
                  setFlowList={setFlowList}
                />
              );
            }
            if (
              item.title === "Step 4" &&
              (item.status === "active" || item.status === "completed")
            ) {
              return <Success key={key} />;
            }
          })}
        </>
      )}
    </div>
  );
};

export default Flow;
