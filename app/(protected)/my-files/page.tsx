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
  Chip,
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
    <main className="min-h-[100vh] pt-[100px] p-12 max-sm:p-2 max-sm:pt-24 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:w-full">
      <div className="">
        <div className="space-y-1">
          <h4 className="text-3xl font-medium">{language.my_courses}</h4>
        </div>
        <Divider className="my-4" />
      </div>
      <div className=" max-sm:w-full justify-items-center gap-5 max-lg:grid-cols-2 max-[600px]:grid-cols-1 w-full">
        <Card className="col-span-2 max-md:col-span-4 md:row-span-10  h-full flex flex-col p-2">
          <CardHeader className="flex justify-between">
            <h1>Newest Registered Users</h1>{" "}
            <Link href="/admin/users" className="text-xs dark:text-white/50">
              View all
            </Link>
          </CardHeader>
          <CardBody className="gap-5">
            {courses.map((user: any) => {
              return (
                <>
                  <div className="w-full flex items-center gap-5  justify-between">
                    <Chip
                      className="capitalize cursor-pointer"
                      size="sm"
                      variant="flat"
                    >
                      {user.status}
                    </Chip>
                  </div>
                  <hr className="w-[90%] self-center  dark:border-white/10"></hr>
                </>
              );
            })}
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
