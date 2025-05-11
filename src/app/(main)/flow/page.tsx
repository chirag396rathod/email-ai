import React from "react";
import ConnectGoogleAccounts from "./steps/connectGoogleAccounts";
import SelectGoogleSheet from "./steps/selectGoogleSheet";
import GenerateContent from "./steps/GenerateContent";
import Success from "./steps/success";

const Flow = () => {
  return (
    <div className="container max-w-[768px] mx-auto my-0">
      <ConnectGoogleAccounts />
      <SelectGoogleSheet />
      <GenerateContent />
      <Success />
    </div>
  );
};

export default Flow;
