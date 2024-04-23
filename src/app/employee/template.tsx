"use client";

import Sidebar, { SidebarItemProps } from "@/components/sidebar";
import { usePathname } from "next/navigation";
import React, { FC, PropsWithChildren } from "react";
import { LuHome, LuUser } from "react-icons/lu";

const EmployeeLayout: FC<PropsWithChildren> = (props) => {
  const path = usePathname();

  const menus: Array<SidebarItemProps> = [
    {
      text: "Beranda",
      icon: LuHome,
      link: "/employee/home",
      active: path === "/employee/home",
    },
    {
      text: "Profil",
      icon: LuUser,
      link: "/employee/profile",
      active: path === "/employee/profile",
    },
  ];

  return (
    <main className="flex w-full h-full bg-gray-100">
      <Sidebar menus={menus} />

      <div className="flex w-full flex-col md:p-4 p-3">
        <div className="text-lg md:text-2xl font-semibold">
          {menus.find((menu) => menu.link === path)?.text}
        </div>

        <div className="flexw-full bg-white rounded-md md:px-4 md:py-6 md:mt-3 px-2 py-3 mt-2">
          {props.children}
        </div>
      </div>
    </main>
  );
};

export default EmployeeLayout;
