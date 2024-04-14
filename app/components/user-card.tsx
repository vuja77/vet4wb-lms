"use client";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import { Config } from "@/Config";
import { getCookie } from "cookies-next";
export default function UserCard() {
  const [user, setUser] = useState();
  useEffect(() => {
    //@ts-ignore
    setUser(JSON.parse(localStorage.getItem("data")));
  }, []);

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger className="py-5">
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                //@ts-ignore
                src:
                  Config.STORAGE_URL +
                  "/" +
                //@ts-ignore
                  getCookie('user')?.user.photo,
              }}
              className="transition-transform py-5 px-4 max"
              //@ts-ignore

              description={user && user.user.email}
              //@ts-ignore

              name={user && user.user.name}
            />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger" onPress={() => alert(1)}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
