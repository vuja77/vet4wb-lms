"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  Progress,
} from "@nextui-org/react";
import { HeartIcon } from "./icons/HeartIcon";
import Link from "next/link";
import { Config } from "@/Config";

export default function CourseCard({
  data,
  progress,
}: {
  data: any;
  progress: any;
}) {
  console.log(data);
  return (
    <Link href={"course/" + data.id}>
      <Card className="py-4 max-w-[295px] cursor-pointer hover:border-primary border border-content1 transition-all">
        <CardHeader className="pb-0 pt-2 px-4 flex items-start">
          <div>
            <small className="text-default-500">Author: {data.teacher}</small>
            <h4 className="font-bold text-large line-clamp-2">{data.name}</h4>
          </div>
          {/* <Button
            isIconOnly
            className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
            radius="full"
            variant="light"
          >
            <HeartIcon
              className={"[&>path]:stroke-transparent"}
              fill="currentColor"
            />
          </Button> */}
        </CardHeader>
        <CardBody className="overflow-visible py-2 gap-3 ">
          {progress && <Progress label={true} value={22}></Progress>}
          

          <Image
            alt="Card background"
            className="object-cover rounded-xl h-[200px]"
            src={Config.STORAGE_URL + "/" + data.thumbnail}
            width={270}
          />
        </CardBody>
      </Card>
    </Link>
  );
}
