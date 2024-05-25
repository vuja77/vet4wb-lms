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
import { getMineCourse } from "@/app/actions/course";
export default async function App() {
  const courses = await getMineCourse()
  return (
    <main className=" min-h-[100vh] pt-[100px] p-24 max-sm:p-2 max-sm:pt-24 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:w-full">
    <div className="">
      <div className="space-y-1">
        <h4 className="text-3xl font-medium">My courses</h4>
        
      </div>
      <Divider className="my-4" />
    </div>
    <div className="grid grid-cols-2 max-sm:w-full justify-items-center gap-10 max-lg:grid-cols-2 max-[600px]:grid-cols-1">
      {courses && courses.map((e:any,index:number) => {
        return(
          <CourseCard data={e} key={index} progress></CourseCard>
        )
      })}
   
    </div>
  </main>
  );
}
