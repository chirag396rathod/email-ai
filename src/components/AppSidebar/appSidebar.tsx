import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { signOut } from "next-auth/react";

import Logo from "@/assets/logo.svg";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, MoreHorizontal, StickyNote } from "lucide-react";
import { redirect } from "next/navigation";

export function AppSidebar() {
  return (
    <Sidebar className="border-none">
      <SidebarContent className="bg-secondary">
        <div className="flex items-center mt-[32px] px-5">
          <Image src={Logo} width={180} height={50} alt="logo" />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[14px] mt-[42px] font-semibold text-gray-400">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <StickyNote />
                    <span>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Modi, quo?
                    </span>
                  </a>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction>
                      <MoreHorizontal />
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start">
                    <DropdownMenuItem>
                      <span>Edit Project</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Delete Project</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-secondary">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  variant={"outline"}
                  asChild
                  onClick={() => {
                    localStorage.clear();
                    signOut({ callbackUrl: "/sign-in" });
                  }}
                >
                  <div>
                    <LogOut />
                    <span>Logout</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
