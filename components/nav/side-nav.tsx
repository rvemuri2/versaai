"use client";
import React from "react";
import {
  LayoutDashboard,
  FileClock,
  WalletCards,
  Settings,
} from "lucide-react";

import Link from "next/link";

import { usePathname } from "next/navigation";

export default function SideNav() {
  const path = usePathname();
  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];
  return (
    <div className="h-screen p-5 shadow-sm border">
      {menu.map((item, index) => (
        <div
          key={index}
          className={`${
            path === item.path ? "bg-primary text-white" : "hover:text-white"
          } flex m-2 mr-2 p-2 hover:bg-primary cursor-pointer text-white rounded-lg`}
        >
          <div className="flex justify-center items-center md:justify-start w-full">
            <Link href={item.path} className="flex">
              <item.icon />{" "}
              <span className="ml-2 hidden md:inline">{item.name}</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
