"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { SunIcon } from "./icons/SunIcon";
import { MoonIcon } from "./icons/MoonIcon";
import { motion } from "framer-motion";
export function ThemeSwitcher({ variant }: { variant?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  const [isSelected, setIsSelected] = useState(theme === "dark" ? false : true);
  function change(e: any) {
    if (e) {
      setIsSelected(true);
    } else {
    }
  }
  // useEffect(() => {
  //   if (isSelected) {
  //     setTheme("light");
  //   } else {
  //     setIsSelected(false);
  //     setTheme("dark");
  //   }
  // });
  if (!mounted) return null;
  if (variant === "big") {
    return (
      <div className="min-w-full grid grid-cols-2 gap-6 pt-3">
        <button
          aria-label="theme"
          onClick={() => {
            localStorage.removeItem("theme");
            setTheme("light");
          }}
          className={`border-border border-gray-400/20 border rounded-lg flex justify-center items-center p-5 hover:bg-slate-200/15 transition-all ${
            theme === "dark" && "bg-slate-200/15 "
          }`}
        >
          <SunIcon />
        </button>

        <button
          aria-label="theme"
          onClick={() => {localStorage.removeItem("theme");setTheme("dark")}}
          className={`border-border border-gray-400/20 border rounded-lg flex justify-center items-center p-5 hover:bg-slate-200/15 transition-all ${
            theme === "dark" && "bg-slate-200/15 "
          }`}
        >
          <MoonIcon />
        </button>
      </div>
    );
  } else {
    return (
      <div>
        {theme === "dark" ? (
          <button
            aria-label="theme"
            onClick={() => {
              localStorage.removeItem("theme");
              setTheme("light");
            }}
            className="border-border border-gray-400/20 border rounded-lg flex justify-center items-center aspect-square w-10"
          >
            <MoonIcon />
          </button>
        ) : (
          <button
            aria-label="theme"
            onClick={() => setTheme("dark")}
            className="border-border border-gray-400/20 border rounded-lg flex justify-center items-center aspect-square w-10"
          >
            <SunIcon />
          </button>
        )}
      </div>
    );
  }
}
