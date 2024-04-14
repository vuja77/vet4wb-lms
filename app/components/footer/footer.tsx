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
import { Config } from "@/Config";
export default function Footer() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <footer className="flex flex-col gap-10 w-full">
        <div className="grid grid-cols-5">
          <div className="col-span-2 flex">
            <Image src="/logo.png" width={100}></Image>
            <Image src="/co-funded-vertical3.png" width={200}></Image>
          </div>
          <ul className="space-y-3">
            <li className="font-bold text-xl">Pages</li>
            <div className="ml-1 space-y-3">
              <li className="text-small">Courses</li>
              <li className="text-small">Courses</li>
           </div>
          </ul>
          <ul className="space-y-3">
            <li className="font-bold text-xl">Pages</li>
            <div className="ml-1 space-y-3">
              <li className="text-small">Courses</li>
              <li className="text-small">Courses</li>
              <li className="text-small">Courses</li>
            </div>
          </ul>
          <ul className="space-y-3">
            <li className="font-bold text-xl">Pages</li>
            <div className="ml-1 space-y-3">
              <li className="text-small">Courses</li>
              <li className="text-small">Courses</li>
              <li className="text-small">Courses</li>
            </div>
          </ul>
        </div>
        <div >
          <small>Copyright © 2023 Vet4WesternBalkans| All Rights Reserved
</small>
        </div>
      </footer>
    </>
  );
}
