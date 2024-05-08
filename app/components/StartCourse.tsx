"use client";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  Card,
  CardBody,
  Button,
} from "@nextui-org/react";
import { Config } from "@/Config";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
//@ts-ignore
import confetti from "canvas-confetti";
export default function StartCourse({ id,lang }: any) {
  const [user, setUser] = useState();
  var triangle = confetti.shapeFromPath({ path: "M0 10 L5 0 L10 10z" });

  async function startcourse() {
    await axios
      .post(
        Config.API_URL + "/course-taker",
        {
          course_id: id,
        },
        {
          headers: {
            Authorization: "Bearer " + getCookie("token"),
          },
        }
      )
      .then((res) => {console.log(res); router.refresh();  toast.custom((t) => (
        <Card className="inset-x-0 backdrop-blur-md p-2 rounded-full data-[menu-open=true]:backdrop-blur-lg backdrop-saturate-150 bg-background/20">
          <CardBody>
            <p>👏, Course started</p>
          </CardBody>
        </Card>
      )); confetti({
        shapes: [triangle],
        particleCount: 500,
        spread: 200,
      });});
  }
  const router = useRouter();
  return (
    <>
      <Button className="w-full" color="primary" onPress={() => startcourse()}>
      {lang?.start}
      </Button>
    </>
  );
}
