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
  lang,
}: {
  params?: any;
  user: any;
  courses: any;
  lang?: any;
}) {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <>
      <Tabs
        aria-label="Options"
        className=""
        classNames={{ tabList: "min-w-full", tabContent: "space-y-5 gap-5", panel: "space-y-5" }}
      >
        <Tab key="photos" title="Profile">
          <Card className="lg:w-[700px]">
            <UserProfile data={user}></UserProfile>
          </Card>
          <div className="">
            <div className="space-y-1 flex justify-between">
              <div className="space-y-1">
                <h4 className="text-2xl font-medium">{lang.my_courses}</h4>
                <p className="text-small text-default-400"></p>
                <Divider className="my-4" />
              </div>
            </div>

            
          </div>
          <div className="grid grid-cols-3 max-sm:w-full justify-items-center gap-10 max-lg:grid-cols-2 max-[600px]:grid-cols-1">
              {courses &&
                courses.map((e: any, index: number) => {
                  return <CourseCard data={e} key={index}></CourseCard>;
                })}
            </div>
        </Tab>
        <Tab
          key="photos2"
          title={lang.settings}
          className="lg:w-[700px] flex flex-col gap-5 "
        >
          <div className="">
            <h2 className="text-xl">{lang.theme}</h2>
            <p className="text-small   ">{lang.theme_desc}</p>
            <ThemeSwitcher variant="big"></ThemeSwitcher>
          </div>

          <div className="flex max-sm:flex-col max-sm:gap-5 justify-between">
            <div>
              <h2 className="text-xl">{lang.select_lang}</h2>
              <p className="text-small ">{lang.lang_desc}</p>
            </div>
            <LangSelect className="w-[200px] max-sm:w-full"></LangSelect>
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
