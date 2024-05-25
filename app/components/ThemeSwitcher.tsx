"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { SunIcon } from "./icons/SunIcon";
import { MoonIcon } from "./icons/MoonIcon";
import {motion} from "framer-motion"
export function ThemeSwitcher() {
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

  return (
    <div>
      <button
        onClick={() => setIsSelected(!isSelected)}
        className="border-border border-gray-400/20 border rounded-lg flex justify-center items-center aspect-square w-10"
      >
        {isSelected ? <motion.div animate={{opacity: [0,100]}} transition={{ease:"easeInOut"}}><SunIcon /></motion.div> : <motion.div animate={{opacity: [0,100]}}><MoonIcon /></motion.div>}
      </button>
    
    </div>
  );
}
