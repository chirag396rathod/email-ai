"use client";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar/appSidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { redirect, usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-5">
        <div className="flex justify-between items-center mb-4">
          <SidebarTrigger className="hover:text-background cursor-pointer" />
          {pathname.split("/").length > 2 && (
            <Button
              variant={"outline"}
              className="cursor-pointer"
              onClick={() => {
                redirect("/flow/add");
              }}
            >
              <Plus />
              <span>Add New</span>
            </Button>
          )}
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
