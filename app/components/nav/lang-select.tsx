"use client";
import React, { useEffect, useState } from "react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
export default function LangSelect({ className }: { className?: string }) {
  //@ts-ignore
  const [lang, setLang] = React.useState(getCookie("lang-icon"));
  useEffect(() => {
    setLang(getCookie("lang-icon") ? getCookie("lang-icon") : "gb");
  }, []);
  const router = useRouter();
  console.log();
  return (
    <Select
      className={className}
      //@ts-ignore
      defaultSelectedKeys={getCookie("lang") && [getCookie("lang") === "sq" ? "al" : getCookie("lang")]}
      onChange={(e) => {
        console.log(e.target.value);
        deleteCookie("lang");
        setLang(e.target.value);
        setCookie("lang", e.target.value === "al" ? "sq" : e.target.value);
        setCookie("lang-icon", e.target.value);
        router.refresh();
      }}
      startContent={
        <Avatar
          alt="Argentina"
          className="w-7 object-cover h-6 aspect-square"
          src={
            lang != "me"
              ? "https://flagcdn.com/" + getCookie("lang-icon") + ".svg"
              : "/ikonica-cg-bh.png"
          }
        />
      }
    >
      <SelectItem
        key={"gb"}
        value={"gb"}
        className="p-0 py-2 pl-2 flex justify-center"
        startContent={
          <Avatar
            alt="Argentina"
            className="w-6 h-6"
            src="https://flagcdn.com/gb.svg"
          />
        }
      >
        English
      </SelectItem>
      <SelectItem
        value={"me"}
        key="me"
        className="p-0 py-2 pl-2 "
        startContent={
          <Avatar
            alt="Venezuela"
            className="w-6 h-6"
            src="/ikonica-cg-bh.png"
          />
        }
      >
        Montenegro - BiH
      </SelectItem>
      <SelectItem
        value={"al"}
        key="al"
        className="p-0 py-2 pl-2 "
        startContent={
          <Avatar
            alt="al"
            className="w-6 h-6"
            src="https://flagcdn.com/al.svg"
          />
        }
      >
        Albanian
      </SelectItem>
    </Select>
  );
}
