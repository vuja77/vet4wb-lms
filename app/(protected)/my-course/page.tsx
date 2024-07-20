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
import { getLang } from "@/utils/lang";
export default async function App() {
  const courses = await getMineCourse();
  console.log(courses);
  let language = getLang();
  return (
    <main className="min-h-[100vh] pt-[100px] flex flex-col flex-1 p-12 max-sm:p-2 max-sm:pt-24 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:w-full">
      <div className="min-w-full">
        <div className="space-y-1">
          <h4 className="text-3xl font-medium">{language.my_courses}</h4>
        </div>
        <Divider className="my-4 w-full" />
      </div>
      <div className="grid grid-cols-4  max-sm:w-full justify-items-center gap-5 max-lg:grid-cols-2 max-[600px]:grid-cols-1 h-full">
        {courses.length > 0 ? (
          courses.map((e: any, index: number) => {
            return <CourseCard data={e} key={index} progress></CourseCard>;
          })
        ) : (
          <div className="border-dashed rounded-md border col-span-4 w-full flex flex-col items-center justify-center h-full">
            <h1>You dont have courses</h1>
            <Button color="primary">Start learning</Button>
          </div>
        )}
      </div>
    </main>
  );
}
