"use client";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar/appSidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-5">
        <div className="flex justify-between items-center mb-4">
          <SidebarTrigger className="hover:text-background cursor-pointer" />
          <Button variant={"outline"} className="cursor-pointer">
            <Plus />
            <span>Add New</span>
          </Button>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
