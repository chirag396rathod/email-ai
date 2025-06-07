"use client";
import React, { useEffect, useState } from "react";
import { StaterFlow } from "./mock";
import axiosInstance from "@/utils/axiosInstance";
import { useParams } from "next/navigation";

export const useFlows = () => {
  const params: any = useParams();
  const [loading, setLoading] = useState(false);
  const [flowList, setFlowList] = useState({ id: null, data: StaterFlow });

  const getFlowList = async () => {
    const id = params && params.id && params.id[0];
    if(!id) return
    try {
      setLoading(true);
      const response = await axiosInstance({
        method: "GET",
        url: `/flows/${id}`,
      });
      const { data } = response.data;
      const flowData = JSON.parse(data?.json);
      setFlowList({
        id: data?.id,
        data: flowData,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFlowList();
  }, []);

  return {
    flowList,
    setFlowList,
    loading,
    setLoading
  };
};
