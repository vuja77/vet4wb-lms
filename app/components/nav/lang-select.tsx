"use client";
import React, { useEffect, useState } from "react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
export default function LangSelect() {
  //@ts-ignore
  const [lang, setLang] = React.useState(getCookie("lang-icon"));
  useEffect(() => {
    setLang(getCookie("lang-icon"));
  }, []);
  const router = useRouter();
  return (
    <Select
      className="w-[70px]"
      onChange={(e) => {
        setLang(e.target.value);
        setCookie("lang", e.target.value === "al" ? "sq" : e.target.value);
        setCookie("lang-icon", e.target.value);
        router.refresh();
      }}
      startContent={
        <Avatar
          alt="Argentina"
          className="min-w-[22px] object-cover h-5 aspect-square"
          src={"https://flagcdn.com/" + lang + ".svg"}
        />
      }
    >
      <SelectItem key={"gb"} value={"gb"} className="p-0 py-2 pl-2 flex justify-center">
        <Avatar
          alt="Argentina"
          className="w-6 h-6"
          src="https://flagcdn.com/gb.svg"
        />
      </SelectItem>
      <SelectItem value={"me"} key="me" className="p-0 py-2 pl-2 ">
        <Avatar
          alt="Venezuela"
          className="w-6 h-6"
          src="https://flagcdn.com/me.svg"
        />
      </SelectItem>
      <SelectItem value={"al"} key="al" className="p-0 py-2 pl-2 ">
        <Avatar alt="al" className="w-6 h-6" src="https://flagcdn.com/al.svg" />
      </SelectItem>
    </Select>
  );
}
