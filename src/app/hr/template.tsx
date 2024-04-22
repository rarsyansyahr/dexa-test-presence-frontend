"use client";

import Sidebar, { SidebarItemProps } from "@/components/sidebar";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, PropsWithChildren } from "react";
import {
  LuFingerprint,
  LuHistory,
  LuHome,
  LuLogOut,
  LuUser,
} from "react-icons/lu";

const EmployeeLayout: FC<PropsWithChildren> = (props) => {
  const path = usePathname();
  const router = useRouter();

  const menus: Array<SidebarItemProps> = [
    {
      text: "Beranda",
      icon: LuHome,
      link: "/hr/home",
      active: path === "/hr/home",
    },
    {
      text: "Karyawan",
      icon: LuFingerprint,
      link: "/hr/employees",
      active: path === "/hr/employees",
    },
    {
      text: "Rekap Presensi",
      icon: LuHistory,
      link: "/hr/presence-summaries",
      active: path === "/hr/presence-summaries",
    },
    {
      text: "Keluar",
      icon: LuLogOut,
      onClick: () => {
        if (confirm("Apakah Anda yakin ingin keluar dari aplikasi ?"))
          router.replace("/auth/login");
      },
    },
  ];

  return (
    <main className="flex h-screen w-full bg-gray-100">
      <Sidebar menus={menus} profile={false} />

      <div className="flex flex-col w-full h-full md:p-4 p-3">
        <div className="text-base md:text-lg font-semibold">
          {menus.find((menu) => menu.link === path)?.text}
        </div>

        <div className="bg-white rounded-md md:px-4 md:py-6 md:mt-3 px-2 py-3 mt-2">
          {props.children}
        </div>
      </div>
    </main>
  );
};

export default EmployeeLayout;
