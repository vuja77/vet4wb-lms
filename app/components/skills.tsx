"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Divider,
} from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";

import Typewriter from "typewriter-effect";
export default function Skills() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1 max-md:grid-rows-2">
      <div className="bg-primary/50 w-full h-[260px] rounded-3xl text-center grid grid-cols-2 gap-10 max-md:flex flex-col">
        <Image
          alt="Card example background"
          className="max-h-[260px]"

          src="/slika.png"
        />
        <div className="w-full p-5 pr-10">
          <div className="space-y-5">
            <h4 className="text-3xl font-extrabold text-white ">
             Personal dewelopment
            </h4>

            <p className="text-white text-small"></p>
          </div>
        </div>
      </div>
      <div className="bg-secondary/50  h-[260px] w-full pt-[10px]  rounded-3xl text-center grid grid-cols-2 gap-10 max-md:flex flex-col">
        <Image
          alt="Card example background"
          className="max-h-[250px] aspect-square"
          src="/person2.png"
        />
        <div className="w-full p-5 pr-10">
          <div className="space-y-5">
            <h4 className="text-3xl font-extrabold text-white">
              Soft skills
            </h4>

            <p className="text-white text-small">Read more </p>
          </div>
          <p className="text-white text-small">Read more </p>

        </div>
      </div>
    </div>
  );
}
