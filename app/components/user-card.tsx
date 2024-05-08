"use client";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  Card,
  CardBody,
} from "@nextui-org/react";
import { Config } from "@/Config";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function UserCard() {
  const [user, setUser] = useState();
  useEffect(() => {
    //@ts-ignore
    setUser(JSON.parse(localStorage.getItem("data")));
  }, []);
  const router = useRouter();
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger className="py-5">
          {
            //@ts-ignore
            JSON.parse(localStorage.getItem("data")).user ? (
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  //@ts-ignore
                  src:
                    //@ts-ignore
                    JSON.parse(localStorage.getItem("data")).user.photo &&
                    Config.STORAGE_URL +
                      "/" +
                      //@ts-ignore
                      JSON.parse(localStorage.getItem("data")).user.photo,
                }}
                className="transition-transform py-5 px-4 max"
                //@ts-ignore

                description={user && user.user.email}
                //@ts-ignore

                name={user && user.user.name}
              />
            ) : (
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  //@ts-ignore
                  src: "http://173.212.196.7:8001/storage/1713126470.jpg",
                }}
                className="transition-transform py-5 px-4 max"
                //@ts-ignore

                description={""}
                //@ts-ignore

                name={user && user.user.name}
              />
            )
          }
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            onPress={() => {
              deleteCookie("token");
              router.refresh();
              toast.custom((t) => (
                <Card className="inset-x-0 backdrop-blur-md p-2 rounded-full data-[menu-open=true]:backdrop-blur-lg backdrop-saturate-150 bg-background/20">
                  <CardBody>
                    <p>👏, Logout successfuly</p>
                  </CardBody>
                </Card>
              ));
            }}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
