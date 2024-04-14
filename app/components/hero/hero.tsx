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
  Image,
} from "@nextui-org/react";
import Typewriter from "typewriter-effect";

export default function Hero() {
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
    <div className="bg-photo min-w-full  rounded-3xl px-12 max-md:px-3 max-md:flex max-md:flex-col grid grid-cols-3 h-[680px] max-md:h-space-y-10 max-md:mt-[100px]">
      
      <div className="py-24 space-y-10 col-span-2 max-md:col-span-3 items-center mt-[120px]">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("Welcome to VET4WB learning platform")
              .callFunction(() => {})
              .pauseFor(500)
              .callFunction(() => {})
              .start();
          }}
        />

        <div className="space-x-10">
          <Button className="text-white bg-white text-primary">
            Learn now
          </Button>
        </div>
      </div>
     
    </div>
  );
}
