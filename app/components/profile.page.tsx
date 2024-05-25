"use client";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Progress,
} from "@nextui-org/react";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import CourseCard from "@/app/components/course-card";
import { Divider } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import AccordionLesson from "@/app/components/lessons/accordion";
import { getCourse, getMineCourse } from "@/app/actions/course";
import EditProfile from "@/app/components/edit-profile";
import UserProfile from "@/app/components/user-profile";
import { getDetails } from "@/app/actions/user";

import LangSelect from "./nav/lang-select";
import { useEffect, useState } from "react";
import { tree } from "next/dist/build/templates/app-page";
export default async function ProfilePage({
  params,
  user,
  courses,
}: {
  params?: any;
  user: any;
  courses: any;
}) {
   

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <>
      <Tabs aria-label="Options" className="w-full">
        <Tab key="photos" title="Profile"
        >
          <Card className="lg:w-[700px]">
            <UserProfile data={user}></UserProfile>
          </Card>
          <div className="">
            <div className="space-y-1 flex justify-between">
              <div className="space-y-1">
                <h4 className="text-2xl font-medium">Own courses</h4>
                <p className="text-small text-default-400"></p>
              </div>
            </div>

            <Divider className="my-4" />
            <div className="grid grid-cols-3 max-sm:w-full justify-items-center gap-10 max-lg:grid-cols-2 max-[600px]:grid-cols-1">
              {courses &&
                courses.map((e: any, index: number) => {
                  return <CourseCard data={e} key={index}></CourseCard>;
                })}
            </div>
          </div>
        </Tab>
        <Tab
          key="photos2"
          title="Settings"
          className="lg:w-[700px] flex flex-col gap-5 max-md:min-w-full"
        >
          <div className="">
            <h2 className="text-xl">Theme</h2>
            <p className="text-small   ">
              Change the appearance of the web.
            </p>
            <div className="grid grid-cols-2 gap-5">
              
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <h2 className="text-xl">Select language</h2>
              <p className="text-small ">
                Change the appearance of the web.
              </p>
            </div>
            <LangSelect className="w-[200px]"></LangSelect>
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
