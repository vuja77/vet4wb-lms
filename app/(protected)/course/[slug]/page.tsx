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
  Image,
  Progress,
} from "@nextui-org/react";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import CourseCard from "@/app/components/course-card";
import { Divider } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import CreateCourse from "@/app/components/protected/create-course";
import FileList from "@/app/components/file-list";
import CreateLesson from "@/app/components/protected/lesson-create";
import { PlusIcon } from "@/app/components/icons/PlusIcon";
import { getCourse, getCourseNotAuth, startCourse } from "@/app/actions/course";
import AccordionLesson from "@/app/components/lessons/accordion";
import AccordionLessonAdmin from "@/app/components/lessons/accordion-admin";
import { cookies } from "next/headers";
import { Config } from "@/Config";
import { getLang } from "@/utils/lang";
import StartCourse from "@/app/components/StartCourse";
import ScormModal from "@/app/components/scorm-modal";
import { getCookie } from "cookies-next";
export default async function App({ params }: { params: any }) {
  const cookieStore = cookies();
  const hasCookie = cookieStore.has("theme");
  let course = null;
  if (cookieStore.has("token")) {
    course = await getCourse(params.slug);
  } else {
    course = await getCourseNotAuth(params.slug);
  }
  const langague = getLang();
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <main className=" min-h-[100vh] pt-[100px] p-32 space-y-10 max-md:p-5 max-md:pt-[100px] w-[80%]  max-md:min-w-full">
      <Card>
        <CardBody className="grid grid-cols-2 p-0 max-md:grid-cols-1 max-md:grid-rows-2 max-md:w-full ">
          <Image
            src={Config.STORAGE_URL + "/" + course.thumbnail}
            className="aspect-video object-cover"
          ></Image>
          <div className="p-5 space-y-5 max-md:p-1 flex flex-col justify-between">
            {/* <p className="text-tiny uppercase font-bold ">
              {course.course_type.name}
            </p> */}

            <small className="text-default-500 text-sm flex flex-row gap-1">
              {langague?.author}:{" "}
              <div dangerouslySetInnerHTML={{ __html: course.teacher }}></div>
            </small>
            <h4 className="font-bold text-large line-clamp-2">{course.name}</h4>
            <small className="text-default-500 line-clamp-2">
              {course.description}
            </small>
            {cookieStore.has("token") && course.enable === 1 ? (
              <>
                <Progress
                  value={course.progress}
                  className="max-w-md"
                  showValueLabel={true}
                />
                {course.lessons[0].materials.filter((e: any) =>
                      cookieStore.has("lang")
                        ? e.langague === cookieStore.get("lang")?.value
                        : e.langague === "gb"
                    )[0] ?  <ScormModal
                    data={
                      course.lessons[0].materials.filter((e: any) =>
                        cookieStore.has("lang")
                          ? e.langague === cookieStore.get("lang")?.value
                          : e.langague === "gb"
                      )[0]
                    }
                    progress={course.progress}
                    course={params.slug}
                  ></ScormModal> : <Button>No course on your langague</Button>}
               
              </>
            ) : cookieStore.has("token") && course.enable === 0 ? (
              <>
                <StartCourse id={params.slug} lang={langague}></StartCourse>
              </>
            ) : (
              <Link className="w-full" href="/login">
                <Button className="w-full" color="primary" href="/login">
                  {langague?.start}
                </Button>
              </Link>
            )}
          </div>
        </CardBody>
      </Card>
      {/* <div className="">
        <div className="space-y-1 flex justify-between">
          <div className="space-y-1">
            <h4 className="text-3xl font-medium">{langague?.Lessons}</h4>
            <p className="text-small text-default-400"></p>
          </div>
        </div>

        <Divider className="my-4" />
      </div>
      <AccordionLesson
        lessons={course.lessons}
        enable={course.enable}
        course={params.slug}
      ></AccordionLesson> */}
    </main>
  );
}
