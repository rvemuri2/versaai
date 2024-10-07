/* eslint-disable */
"use client";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import logo from "@/public/logo.svg";
import Image from "next/image";
import { ThemeProvider } from "@/components/theme-provider";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toaster } from "react-hot-toast";

export default function TopNav() {
  const { isSignedIn, user } = useUser();
  const { setTheme } = useTheme();

  return (
    <nav className="flex flex-col">
      <div className="flex justify-between items-center p-2 shadow">
        <Toaster />
        <Link href="/">
          <Image src={logo} alt="Logo" />
        </Link>
        <Link href="/membership">🔥 Join Free or $0.99/month</Link>
        <div className="flex items-center">
          {isSignedIn && (
            <Link
              href="/dashboard"
              className="mr-2"
            >{`${user.fullName}'s Dashboard`}</Link>
          )}
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <div className="ml-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span>
                  <Button size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {/* Horizontal line below the logo */}
      <hr className="border-t border-gray-500 mt-2 w-full" />
    </nav>
  );
}
