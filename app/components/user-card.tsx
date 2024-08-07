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
  Divider,
} from "@nextui-org/react";
import { Config } from "@/Config";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function UserCard({ lang }: any) {
  const [user, setUser] = useState();
  useEffect(() => {
    //@ts-ignore
    setUser(JSON.parse(localStorage.getItem("data")));
  }, []);
  const router = useRouter();
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger className="py-5 z-10">
          {
            //@ts-ignore
            JSON.parse(localStorage.getItem("user")) ? (
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  showFallback: true,
                  alt: "user",
                  //@ts-ignore
                  src:
                    //@ts-ignore
                    JSON.parse(localStorage.getItem("user")) &&
                    Config.STORAGE_URL +
                      "/" +
                      //@ts-ignore
                      JSON.parse(localStorage.getItem("user")).photo,
                }}
                className="transition-transform py-5 px-4  user"
                //@ts-ignore

                description={""}
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
          <DropdownItem key="settings" href="/profile">
            {lang && lang.my_profile}
          </DropdownItem>
          {/* @ts-ignore */}
          {user && user.user.role_id === 795734325693 ? (
            <DropdownItem key="settings" href="/admin/dashboard">
              Admin panel
            </DropdownItem>
          ) : (
            <DropdownItem
              classNames={{ base: "hover:bg-transparent" }}
            ></DropdownItem>
          )}
          <DropdownItem
            key="logout"
            color="danger"
            onPress={() => {
              deleteCookie("token");
              deleteCookie("user");
              deleteCookie("lang");
              router.push("/login");
              toast.custom((t) => (
                <Card className="inset-x-0 backdrop-blur-md p-2 rounded-full data-[menu-open=true]:backdrop-blur-lg backdrop-saturate-150 bg-background/20">
                  <CardBody>
                    <p>👏, Logout successfuly</p>
                  </CardBody>
                </Card>
              ));
            }}
          >
            {lang && lang.log_out}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
