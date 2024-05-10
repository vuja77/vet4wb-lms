"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { SunIcon } from "./icons/SunIcon";
import { MoonIcon } from "./icons/MoonIcon";
export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    setTheme("light");

  }, []);
  const [isSelected, setIsSelected] = useState(false);
  function change(e: any) {
    if (e) {
      setTheme("light");

      setIsSelected(true);
    } else {
      setIsSelected(false);
      setTheme("dark");


    }
  }
  if (!mounted) return null;

  return (
    <div>
      <Switch
        defaultSelected
        size="lg"
        color="success"
        isSelected={isSelected}
        onValueChange={change}
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
      >
      </Switch>
    </div>
  );
}
