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
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import {
  redirect,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";

import Logo from "@/assets/logo.svg";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Loader, LogOut, MoreHorizontal, StickyNote } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { getUserDetails } from "@/utils/constants";

export function AppSidebar() {
  const router = useRouter();
  const params: any = useParams();
  const [loader, setLoader] = useState(false);
  const [history, setHistory] = useState([]);
  const user = getUserDetails();
  const searchParams = useSearchParams();

  const getFlowList = async () => {
    try {
      setLoader(true);
      const flowResponse = await axiosInstance({
        method: "GET",
        url: "/flows",
        headers: {
          id: user.id,
        },
      });
      const data = flowResponse.data;
      setHistory(data.data);
    } catch (error) {
      console.error("Google authentication failed:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleClick = (id) => {
    redirect("/flow/update/" + id);
  };

  useEffect(() => {
    getFlowList();
  }, []);

  useEffect(() => {
    const hasRefresh = searchParams.get("hasRefresh");

    if (hasRefresh === "true") {
      getFlowList();

      // ✅ Remove `hasRefresh` from the URL
      const params = new URLSearchParams(searchParams.toString());
      params.delete("hasRefresh");

      const newUrl =
        window.location.pathname + (params.toString() ? `?${params}` : "");
      router.replace(newUrl); // client-side, no reload
    }
  }, [searchParams]);

  return (
    <Sidebar className="border-none">
      <SidebarContent className="bg-secondary">
        <div
          className="flex items-center mt-[32px] px-5 cursor-pointer"
          onClick={() => {
            redirect("/flow");
          }}
        >
          <Image src={Logo} width={180} height={50} alt="logo" />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[14px] mt-[42px] font-semibold text-gray-400">
            History
          </SidebarGroupLabel>
          {loader ? (
            <div className="flex items-start mt-4  w-full h-full">
              <div className=" w-full h-full flex items-center justify-center">
                <Loader className="h-6 w-6 animate-spin text-white-600" />
              </div>
            </div>
          ) : (
            <>
              {history.map((item: any, key: number) => {
                const isActive = item.id === params?.id?.[0];

                return (
                  <SidebarGroupContent className="mt-2" key={key}>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          onClick={() => handleClick(item?.id)}
                          variant={isActive ? "outline" : "default"}
                          className={
                            isActive
                              ? "bg-muted text-primary hover:bg-muted"
                              : ""
                          }
                        >
                          <a href="#">
                            <StickyNote />
                            <span>
                              List {key + 1} - {item?.id}
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
                );
              })}
            </>
          )}
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
