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
export default function Featured({
  courses,
  lang,
}: {
  courses: any;
  lang: any;
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <div className="max-w-md">
        <div className="space-y-1">
          <h4 className="text-3xl font-medium text-center">{lang.courses}</h4>
          <p className="text-small text-default-400"></p>
        </div>
        <Divider className="my-4" />
      </div>
      <div className="grid grid-cols-3 w-full gap-10 max-md:grid-cols-1 max-md:p-0">
        {courses.map((e: any, index: number) => {
          return (
            <Link href={"/course/" + e.id} key={index}>
              <Card className="py-4 p-0 border hover:border-primary transition-all cursor-pointer h-[420px]">
                <CardBody className="overflow-visible py-2 p-0">
                  <p className="text-tiny uppercase font-bold absolute z-20 m-2 self-end bg-primary rounded-full p-2 w-[240px] text-center text-white">
                    {e.course_type.name}
                  </p>

                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl min-w-full h-[300px]"
                    width={1000}
                    src={Config.STORAGE_URL + "/" + e.thumbnail}
                    isZoomed
                  />
                  <CardFooter className="flex flex-col items-start gap-2">
                    <small className="text-default-500">
                      {lang.author}: {e.teacher}
                    </small>
                    <h4 className="font-bold text-large">{e.name}</h4>
                  </CardFooter>
                </CardBody>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}
