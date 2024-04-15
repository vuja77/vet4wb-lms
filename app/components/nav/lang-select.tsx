"use client";
import React, { useState } from "react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
export default function LangSelect() {
        //@ts-ignore
  const [lang, setLang] = React.useState(getCookie('lang-icon'));
  const router = useRouter();
  return (
    <Select
      className="min-w-[90px]"
      label="Select lagague"
      onChange={(e) => {
        setLang(e.target.value);
        setCookie("lang", e.target.value === "al" ? "sq" : e.target.value);
        setCookie("lang-icon", e.target.value);
        router.refresh();
      }}
      startContent={
        <Avatar
          alt="Argentina"
          className="w-16 h-6 aspect-square"
          src={"https://flagcdn.com/" + lang + ".svg"}
        />
      }
    >
      <SelectItem
        key={"gb"}
        value={"gb"}
        startContent={
          <Avatar
            alt="Argentina"
            className="w-6 h-6"
            src="https://flagcdn.com/gb.svg"
          />
        }
      ></SelectItem>
      <SelectItem
        value={"me"}
        key="me"
        startContent={
          <Avatar
            alt="Venezuela"
            className="w-6 h-6"
            src="https://flagcdn.com/me.svg"
          />
        }
      ></SelectItem>
      <SelectItem
        value={"al"}
        key="al"
        startContent={
          <Avatar
            alt="al"
            className="w-6 h-6"
            src="https://flagcdn.com/al.svg"
          />
        }
      ></SelectItem>
    </Select>
  );
}
