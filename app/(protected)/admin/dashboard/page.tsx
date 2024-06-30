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
  user,
} from "@nextui-org/react";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import CourseCard from "@/app/components/course-card";
import { Divider } from "@nextui-org/react";
import CreateCourse from "@/app/components/protected/create-course";
import { getMineCourse } from "@/app/actions/course";
import { count } from "console";
import { countUsers } from "@/app/actions/analytics";
export default async function Page() {
  const courses = await getMineCourse();
  const users = await countUsers()
  return (
    <main className=" h-[100vh] pt-[100px] p-12 grid grid-cols-4 grid-rows-3 gap-5">
      <div className="grid grid-cols-3 gap-12 col-span-4">
        <Card className="flex-1">
          <CardBody>
            <h1>{users}</h1>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h1>1</h1>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h1>1</h1>
          </CardBody>
        </Card>
      </div>
      <div className="row-span-1 max-w-full col-span-4">
        <div className="space-y-1 flex justify-between">
          <div className="space-y-1">
            <h4 className="text-3xl font-medium">Courses</h4>
          </div>
          <CreateCourse></CreateCourse>
        </div>

        <Divider className="my-4" />
      </div>
      {courses
        ? courses.map((e: any, index: number) => {
            return (
              <CourseCard
                data={e}
                key={index}
                className="row-span-1"
              ></CourseCard>
            );
          })
        : "none"}
    </main>
  );
}
