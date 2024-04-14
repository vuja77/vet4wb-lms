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
import { HeartIcon } from "../icons/HeartIcon";
import CourseCard from "../course-card";
import Typewriter from "typewriter-effect";
export default function Popular() {
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
    <div className=" w-full p-2 rounded-3xl text-center grid grid-cols-2 gap-10 max-md:flex flex-col">
      <Image
        alt="Card example background"
        className="object-cover aspect-video "
        src="/person.jpg"
      />
      <div className="w-full p-5 pr-10">
        <div className="space-y-5">
          <h4 className="text-3xl font-extrabold ">
            Why Upskill becomes the best training course & bootcamp
          </h4>
        <Divider className="my-4" />

          <p className=" text-small">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    </div>
  );
}
