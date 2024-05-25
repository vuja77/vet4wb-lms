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
import LangSelect from "../nav/lang-select";
export default function Footer({ lang }: any) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <footer className="flex flex-col gap-10 w-full items-center justify-center">
        <div className="grid grid-cols-5">
          <div className="col-span-2 max-sm:col-span-5 flex max-md:flex-col items-center gap-3 ">
            <Link href="https://vet4wb.com">
              <Image src="/logo.png" width={100}></Image>
            </Link>
            <p className="w-full col-span-3 max-md:text-[13px] hidden max-sm:block">
              {lang.footer}
            </p>
            <Link href="https://european-union.europa.eu/index_en">
              <Image src="/co-funded-vertical3.png" width={250}></Image>
            </Link>
          </div>
          <p className="w-full col-span-3 max-md:text-small max-sm:hidden">
            {lang.footer}
          </p>
        </div>

        <div>
          <p className="text-center text-xs">
            Copyright © 2024 <span className="text-secondary">Vet</span>4
            <span className="text-primary">Western</span>
            <span className="text-secondary">Balkans</span>| All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
}
