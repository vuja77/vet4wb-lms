"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon } from "./icons/SunIcon";
import { MoonIcon } from "./icons/MoonIcon";

export function ThemeSwitcher({ variant }: { variant?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleThemeChange = (newTheme: string) => {
    localStorage.removeItem("theme");
    setTheme(newTheme);
  };

  if (variant === "big") {
    return (
      <div className="min-w-full grid grid-cols-2 gap-6 pt-3">
        <button
          aria-label="theme"
          onClick={() => handleThemeChange("light")}
          className={`border-border border-gray-400/20 border rounded-lg flex justify-center items-center p-5 hover:bg-slate-200/15 transition-all ${
            theme === "dark" && "bg-slate-200/15"
          }`}
        >
          <SunIcon />
        </button>

        <button
          aria-label="theme"
          onClick={() => handleThemeChange("dark")}
          className={`border-border border-gray-400/20 border rounded-lg flex justify-center items-center p-5 hover:bg-slate-200/15 transition-all ${
            theme === "dark" && "bg-slate-200/15"
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
            onClick={() => handleThemeChange("light")}
            className="border-border border-gray-400/20 border rounded-lg flex justify-center items-center aspect-square w-10"
          >
            <MoonIcon />
          </button>
        ) : (
          <button
            aria-label="theme"
            onClick={() => handleThemeChange("dark")}
            className="border-border border-gray-400/20 border rounded-lg flex justify-center items-center aspect-square w-10"
          >
            <SunIcon />
          </button>
        )}
      </div>
    );
  }
}
