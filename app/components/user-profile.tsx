"use client";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  CardBody,
  Image,
} from "@nextui-org/react";
import EditProfile from "./edit-profile";
import { Config } from "@/Config";

export default function UserProfile({ data }: { data: any }) {
  localStorage.removeItem("user");
  localStorage.setItem("user", JSON.stringify(data));
  //@ts-ignore
  return (
    <CardBody className="flex flex-row justify-between items-center  max-md:flex-col  max-sm:items-center">
      <User
        as="button"
        avatarProps={{
          size: "lg",
          className: "w-24 aspect-square h-24",
          isBordered: true,
          //@ts-ignore
          src:
            //@ts-ignore
            data &&
            Config.STORAGE_URL +
              "/" +
              //@ts-ignore
              data.photo,
        }}
        className="transition-transform py-5 px-4 "
        //@ts-ignore

        description={""}
        //@ts-ignore
        name=""
      />
      <div className="p-3 space-y-2 w-full max-md:text-center">
        <h4 className="font-bold text-large line-clamp-2">{data.name}</h4>
        <small className="text-default-500 line-clamp-2"> Student</small>

        <small className="text-default-500 line-clamp-2"> {data.email}</small>
      </div>
      <EditProfile data={data}></EditProfile>

    </CardBody>
  );
}
