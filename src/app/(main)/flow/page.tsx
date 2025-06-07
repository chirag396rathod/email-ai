"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const WelcomePage = () => {
  const onAddNew = () => {
    redirect("/flow/add");
  };
  return (
    <div className="flex justify-center items-center">
      <Button onClick={onAddNew} variant={"outline"} className="cursor-pointer">
        <Plus />
        <span>Add New</span>
      </Button>
    </div>
  );
};

export default WelcomePage;
