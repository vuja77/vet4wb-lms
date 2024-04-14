import React from "react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { setCookie } from "cookies-next";
export default function LangSelect() {
  return (
    <Select
      className="min-w-[100px]"
      label="Select lagague"
      onChange={(e) => setCookie("lang", e.target.value)}
      value={"me"}
      startContent={
        <Avatar
          alt="Argentina"
          className="w-14 h-6 aspect-square"
          src="https://flagcdn.com/gb.svg"
        />
      }
    >
      <SelectItem
        key={"eng"}
        value={"eng"}
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
        key="brazil"
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
