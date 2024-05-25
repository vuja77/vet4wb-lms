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
} from "@nextui-org/react";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import CourseCard from "@/app/components/course-card";
import { Divider } from "@nextui-org/react";
import { getMineCourse,getAllCourse } from "@/app/actions/course";
export default async function App() {
  const courses = await getAllCourse();
console.log(courses)
  return (
    <main className=" min-h-[100vh] pt-[100px] p-24 max-sm:p-2 max-sm:pt-24 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:w-full">
      <div className="">
        <div className="space-y-1">
          <h4 className="text-3xl font-medium">Certificates</h4>
          
        </div>
        <Divider className="my-4" />
      </div>
      <div className="flex items-center justify-center w-full">
       <h1 className="font-bold text-4xl text-white/40">VERY VERY SOON!!!!!!!!!!!!!!!</h1>
     
      </div>
      
    </main>
  );
}
