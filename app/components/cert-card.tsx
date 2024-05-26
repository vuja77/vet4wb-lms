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
import { Download } from "lucide-react";

export default function CertCard({
  data,
  progress,
}: {
  data: any;
  progress?: any;
}) {
  async function download() {
    try {
      const response = await axios.get(
        Config.API_URL + "/download/" + data.id,
        {
          responseType: "blob",
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "certificate.pdf"); 
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Card key={data.id} className="h-[370px] max-w-[350px] cursor-pointer border border-content1 hover:border-primary  transition-all">
      <CardBody className="overflow-visible rounded-[0px] py-2 p-0">
        <Image
          alt="Card background"
          className="object-cover z-10 min-w-full h-[200px]"
          width={1000}
          radius="none"
          src={Config.STORAGE_URL + "/" + data.thumbnail}
          isZoomed
        />
        <CardFooter className="flex flex-col items-stretch justify-between gap-2 h-full">
          <div>
            <small className="text-default-500 flex gap-1">
              Author:{" "}
              <div dangerouslySetInnerHTML={{ __html: data.teacher }}></div>
            </small>
            <h4 className="font-bold text-large line-clamp-2">{data.name}</h4>
          </div>
          <Button color="primary" className="w-full" onPress={()=> download()}>
            Download Certificate <Download></Download>
          </Button>
        </CardFooter>
      </CardBody>
    </Card>
  );
}
