"use client";
import React from "react";
import {

  Link,
  Divider,
} from "@nextui-org/react";
import {
  Card,
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

  return (
    <>
      <div className="max-w-md">
        <div className="space-y-1">
          <h4 className="text-3xl font-bold text-center ">{lang.courses}</h4>
          <p className="text-small text-default-400"></p>
        </div>
        <Divider className="my-4" />
      </div>
      <div className="grid grid-cols-4 w-full gap-0 max-md:grid-cols-1 max-xl:grid-cols-2 max-md:p-0 max-md:gap-10">
        {courses && courses.map((e: any, index: number) => {
          return (
            <Link href={"/course/" + e.id} key={index} aria-label="link COURSE">
              <Card
                radius="md"
                className="py-4 p-0 border border-[#104421] dark:border-[#104421] hover:border-primary transition-all cursor-pointer rounded-none h-[430px]"
              >
                <CardBody className="overflow-visible rounded-[0px] py-2 p-0">
                
                  <Image
                    alt="Card background"
                    className="object-cover   z-10 min-w-full h-[300px]"
                    width={1000}
                    radius="none"
                    src={Config.STORAGE_URL + "/" + e.thumbnail}
                    isZoomed
                  />
                  <CardFooter className="flex flex-col items-start gap-2">
                    <small className="text-default-500 flex gap-1">
                      {lang.author}: <div dangerouslySetInnerHTML={{ __html: e.teacher }} ></div>
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
