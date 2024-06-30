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
  CardFooter,
} from "@nextui-org/react";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import CourseCard from "@/app/components/course-card";
import { Divider } from "@nextui-org/react";
import CreateCourse from "@/app/components/protected/create-course";
import { getMineCourse } from "@/app/actions/course";
import { count } from "console";
import { countUsers } from "@/app/actions/analytics";
import { UsersIcon } from "lucide-react";
export default async function Page() {
  const courses = await getMineCourse();
  const users = await countUsers();
  return (
    <main className=" h-[100vh] pt-[100px] p-12 grid grid-cols-4 gap-5">
      <div className="flex  w-full col-span-4  gap-5 flex-wrap ">
        <Link className="flex-1 h-[100px]" href="/admin/users">
        <Card className="flex-1 hover:translate-y-[-5px] cursor-pointer min-w-[250px] h-[100px]">
          <CardBody className="flex flex-row items-center gap-5">
            <div className="bg-primary aspect-square flex justify-center items-center rounded-xl p-5">
              <UsersIcon color="white"></UsersIcon>
            </div>
            <div>
              <h1 className="font-bold">Total users</h1>
              <h1>{users}</h1>
            </div>
          </CardBody>
        </Card>
        </Link>
        <Card className="flex-1 hover:translate-y-[-5px] cursor-pointer min-w-[250px] h-[100px]">
          <CardBody className="flex flex-row items-center gap-5 ">
            <div className="bg-primary aspect-square flex justify-center items-center rounded-xl p-5">
              <UsersIcon color="white"></UsersIcon>
            </div>
            <div>
              <h1 className="font-bold">Total users</h1>
              <h1>{users}</h1>
            </div>
          </CardBody>
        </Card>
        <Card className="flex-1 hover:translate-y-[-5px] cursor-pointer min-w-[250px] h-[100px]">
          <CardBody className="flex flex-row items-center gap-5">
            <div className="bg-primary aspect-square flex justify-center items-center rounded-xl p-5">
              <UsersIcon color="white"></UsersIcon>
            </div>
            <div>
              <h1 className="font-bold">Total users</h1>
              <h1>{users}</h1>
            </div>
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
                admin
              ></CourseCard>
            );
          })
        : "none"}
    </main>
  );
}
