"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  Progress,
  CardFooter,
} from "@nextui-org/react";
import { HeartIcon } from "./icons/HeartIcon";
import Link from "next/link";
import { Config } from "@/Config";
import axios from "axios";
import { getCookie } from "cookies-next";

export default function CourseCard({
  data,
  progress,
}: {
  data: any;
  progress?: any;
}) {
  console.log(data);

  return (
    <Link href={"course/" + data.id}>
      <Card className="max-h-[370px] max-w-[320px] cursor-pointer hover:border-primary border border-content1 transition-all">
        <CardBody className="overflow-visible rounded-[0px] py-2 p-0">
          {/* <p className="text-tiny uppercase font-bold absolute z-20 m-2 self-end bg-primary rounded-full p-2 w-[240px] text-center text-white">
                    {e.course_type.name}
                  </p> */}

          <Image
            alt="Card background"
            className="object-cover rounded-none rounded-[0px] z-10 min-w-full h-[200px]"
            width={1000}
            radius="none"
            src={Config.STORAGE_URL + "/" + data.thumbnail}
            isZoomed
          />
          <CardFooter className="flex flex-col items-start justify-between gap-2 h-fit">
            <div>
              <small className="text-default-500 flex gap-1">
                Author:{" "}
                <div dangerouslySetInnerHTML={{ __html: data.teacher }}></div>
              </small>
              <h4 className="font-bold text-large line-clamp-2">{data.name}</h4>
            </div>
            {progress && (
              <Progress
                className="self-end"
                value={data.progress}
                showValueLabel
              ></Progress>
            )}
          </CardFooter>
        </CardBody>
      </Card>
    </Link>
  );
}
