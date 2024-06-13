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
import { getLang } from "@/utils/lang";
export default async function App() {
  const courses = await getAllCourse();
  let lang = getLang()
  return (
    <main className=" min-h-[100vh] pt-[100px] p-12 max-sm:p-2 max-sm:pt-24 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:w-full ">
      <div className="">
        <div className="space-y-1">
          <h4 className="text-3xl font-medium">{lang.education_space}</h4>
          
        </div>
        <Divider className="my-4" />
      </div>
      <div className="grid grid-cols-4 max-sm:w-full justify-items-center gap-5 max-lg:grid-cols-2 max-[600px]:grid-cols-1 w-full">
        {courses && courses.map((e:any,index:number) => {
          return(
            <CourseCard data={e} key={index}></CourseCard>
          )
        })}
     
      </div>
      
    </main>
  );
}
