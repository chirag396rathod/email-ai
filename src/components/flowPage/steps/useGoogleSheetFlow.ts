import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance"; // Update with your actual axios instance import
import { GOOGLE_SHEET_SCOPE } from "@/utils/constants"; // Update as per your file
import { GoogleAuthFn } from "@/utils/getGoogleToken"; // Update as per your file

export const useGoogleSheetFlow = ({
  item,
  flowList,
  setFlowList,
  hasRefetch,
}: {
  item?: any;
  flowList: any;
  setFlowList: (val: any) => void;
  hasRefetch?: boolean;
}) => {
  const [loading, setLoader] = useState(false);
  const [googleResponse, setGoogleResponse] = useState<any>(null);

  const handleConnectClick = async () => {
    try {
      setLoader(true);
      const response: any = await GoogleAuthFn(GOOGLE_SHEET_SCOPE);
      if (!response) return;
      setGoogleResponse(response);
    } catch (error) {
      console.error("Google authentication failed:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleSaveDataOnServer = async (response: any) => {
    try {
      setLoader(true);

      let updatedSteps: any = [];
      if (hasRefetch) {
        const stepUpdate = [...flowList.data][0];
        console.log(response);
        updatedSteps = [...flowList.data].map((step) => {
          if (step.title === stepUpdate.title) {
            return { ...step, extraInfo: response };
          }
          return step;
        });
      } else {
        const currantStep = {
          ...item,
          status: "completed",
          extraInfo: response,
        };

        const remainsSteps = flowList.data.filter(
          (step: any) => step.title !== currantStep.title
        );
        const nextStep = remainsSteps[0];
        nextStep.status = "active";

        updatedSteps = [currantStep, nextStep, ...remainsSteps.slice(1)];
      }
      let reqBody: any = {};
      if (hasRefetch) {
        reqBody = {
          json: JSON.stringify(updatedSteps),
          flowId: flowList.id,
        };
      } else {
        reqBody = {
          json: JSON.stringify(updatedSteps),
        };
      }
      const flowResponse = await axiosInstance.post("/flows", reqBody);
      const data = flowResponse.data;
      if (data) {
        setFlowList({
          id: data?.data?.id,
          data: updatedSteps,
        });
      }
    } catch (error) {
      console.error("Saving flow failed:", error);
    } finally {
      setLoader(false);
      setGoogleResponse(null);
    }
  };

  useEffect(() => {
    if (googleResponse) {
      handleSaveDataOnServer(googleResponse);
    }
  }, [googleResponse]);

  return {
    loading,
    handleConnectClick,
  };
};
