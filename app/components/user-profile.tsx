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
  //@ts-ignore
  return (
    <CardBody className="flex flex-row justify-between  max-md:flex-col  max-sm:items-center">
      <Image
        width={190}
        className="rounded-full self-center aspect-square object-cover h-full"
        src={Config.STORAGE_URL + "/" + data.photo}
      ></Image>
      <div className="p-5 space-y-5 w-full max-md:text-center">
        <h4 className="font-bold text-large line-clamp-2">{data.name}</h4>
        <small className="text-default-500 line-clamp-2"> {data.email}</small>
        <EditProfile data={data}></EditProfile>
      </div>
    </CardBody>
  );
}
