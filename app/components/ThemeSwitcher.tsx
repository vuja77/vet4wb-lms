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
  useEffect(() => {
    if (isSelected) {
      setTheme("light");
    } else {
      setIsSelected(false);
      setTheme("dark");
    }
  });
  if (!mounted) return null;
  if (variant === "big") {
    return (
      <div className="min-w-full grid grid-cols-2 gap-6 pt-3">
        <button
          onClick={() => setIsSelected(true)}
          className={`border-border border-gray-400/20 border rounded-lg flex justify-center items-center p-5 hover:bg-slate-200/15 transition-all ${theme==="light" && 'bg-gray-300/90 '}`}
        >
          <SunIcon />
        </button>
        <button
          onClick={() => setIsSelected(false)}
          className={`border-border border-gray-400/20 border rounded-lg flex justify-center items-center p-5 hover:bg-slate-200/15 transition-all ${theme==="dark" && 'bg-slate-200/15 '}`}
        >
          <MoonIcon />
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button
        aria-label="theme"
          onClick={() => setIsSelected(!isSelected)}
          className="border-border border-gray-400/20 border rounded-lg flex justify-center items-center aspect-square w-10"
        >
          {isSelected ? (
            <motion.div
              animate={{ opacity: [0, 100] }}
              transition={{ ease: "easeInOut" }}
            >
              <SunIcon />
            </motion.div>
          ) : (
            <motion.div animate={{ opacity: [0, 100] }}>
              <MoonIcon />
            </motion.div>
          )}
        </button>
      </div>
    );
  }
}
