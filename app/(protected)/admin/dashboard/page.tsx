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
  User,
  ChipProps,
  Chip,
} from "@nextui-org/react";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import CourseCard from "@/app/components/course-card";
import { Divider } from "@nextui-org/react";
import CreateCourse from "@/app/components/protected/create-course";
import { getMineCourse } from "@/app/actions/course";
import { count } from "console";
import { countUsers, getReports, lastUsers } from "@/app/actions/analytics";
import { UsersIcon } from "lucide-react";
import CountryChart from "@/app/components/country-chart";
import { report } from "process";
export default async function Page() {
  const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    disabled: "danger",
    pending: "warning",
  };

  const courses = await getMineCourse();
  const users = await countUsers();
  const reports = await getReports();
  const lastusers = await lastUsers();
  return (
    <main className="w-full  min-sh-[100vh]  max-h-[500vh] pt-[100px] max-md:flex flex-col p-12 grid grid-cols-4 max-md:p-3 max-md:pt-24  gap-5">
      <div className="grid min-w-full grid-cols-3 max-md:grid-cols-1 max-md:flex flex-col col-span-4  gap-5 flex-1  md:min-h-[260px]">
        <div className="col-span-1 max-md:h-[200px] h-full flex flex-col w-full gap-5">
          <Link className=" flex-1 flex " href="/admin/users">
            <Card className="flex-1 h-full hover:translate-y-[-5px] cursor-pointer ">
              <CardBody className="flex flex-row items-center gap-5">
                <div className="bg-primary aspect-square h-full flex justify-center items-center rounded-xl p-5">
                  <UsersIcon color="white" size={30}></UsersIcon>
                </div>
                <div>
                  <h1 className="font-bold">Total users</h1>
                  <h1>{users}</h1>
                </div>
              </CardBody>
            </Card>
          </Link>
          <Link className=" flex-1 " href="/admin/users">
            <Card className="flex-1 h-full  cursor-pointer ">
              <CardBody className="flex flex-row items-center gap-5">
                <div className="bg-primary aspect-square flex justify-center h-full items-center rounded-xl p-5">
                  <UsersIcon color="white" size={30}></UsersIcon>
                </div>
                <div>
                  <h1 className="font-bold">Total users</h1>
                  <h1>{users}</h1>
                </div>
              </CardBody>
            </Card>
          </Link>
        </div>
        <Card className="col-span-2 max-md:min-h-[500px] max-md:col-span-1 max-md:row-span-1   cursor-pointer  h-[23 0px]">
          <p className="px-10 pt-5 text-lg  font-medium">Users per country</p>
          <CardBody className="flex flex-row items-center gap-5 ">
            <CountryChart></CountryChart>
          </CardBody>
        </Card>
      </div>
      <Card className="col-span-2 max-md:col-span-4  md:row-span-10 h-full flex flex-col p-2">
        <CardHeader className="flex justify-between">
          <h1>Latest reports</h1>{" "}
          <Link href="/admin/reports" className="text-xs dark:text-white/50">
            View all
          </Link>
        </CardHeader>
        <CardBody className="gap-5">
          {reports.map((report: any) => {
            return (
              <>
                <div className="w-full flex items-center gap-5  ">
                  <User
                    avatarProps={{
                      radius: "lg",
                      src:
                        report.user.photo &&
                        `https://moodle.edu4wb.com/storage/${report.user.photo}`,
                    }}
                    description={report.user.email}
                    name={report.user.name} // assuming the user object has a name property
                  />
                  <p className="text-xs line-clamp-2">{report.message}</p>
                </div>
                <hr className="w-[90%] self-center dark:border-white/10"></hr>
              </>
            );
          })}
        </CardBody>
      </Card>
      <Card className="col-span-2 max-md:col-span-4 md:row-span-10  h-full flex flex-col p-2">
        <CardHeader className="flex justify-between">
          <h1>Newest Registered Users</h1>{" "}
          <Link href="/admin/users" className="text-xs dark:text-white/50">
            View all
          </Link>
        </CardHeader>
        <CardBody className="gap-5">
          {lastusers.map((user: any) => {
            return (
              <>
                <div className="w-full flex items-center gap-5  justify-between">
                  <User
                    avatarProps={{
                      radius: "lg",
                      src:
                        user.photo &&
                        `https://moodle.edu4wb.com/storage/${user.photo}`,
                    }}
                    description={user.email}
                    name={user.name} // assuming the user object has a name property
                  />
                  <Chip
                    className="capitalize cursor-pointer"
                    color={statusColorMap[user.status]}
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
      {/* <div className="row-span-1 max-w-full col-span-4">
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
        : "none"} */}
    </main>
  );
}
