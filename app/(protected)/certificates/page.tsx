import React from "react";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
  Progress,
  CardFooter,
  Image,
} from "@nextui-org/react";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import CourseCard from "@/app/components/course-card";
import { Divider } from "@nextui-org/react";
import { getMineCourse, getAllCourse, getMineCert } from "@/app/actions/course";
import { getLang } from "@/utils/lang";
import { Config } from "@/Config";
import CertCard from "@/app/components/cert-card";
export default async function App() {
  const cert = await getMineCert();
  let language = getLang();
  return (
    <main className="min-h-[100vh] pt-[100px] p-12 max-sm:p-2 max-sm:pt-24 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:w-full w-full">
      <div className="">
        <div className="space-y-1">
          <h4 className="text-3xl font-medium">{language.certificates}</h4>
        </div>
        <Divider className="my-4" />
      </div>
      <div className="grid grid-cols-4 max-sm:w-full justify-items-center gap-5 max-lg:grid-cols-2 max-[600px]:grid-cols-1 min-w-full">
        {cert ?
          cert.map((e: any, index: number) => {
            return <CertCard data={e} key={index}/>;
          }): <h1 className="text-black">ALo</h1>}

          {cert.length <1 && <h1 className="text-black flex flex-1 justify-center items-center col-span-4">Currently, there are no certificates available.</h1>}
      </div>
    </main>
  );
}
