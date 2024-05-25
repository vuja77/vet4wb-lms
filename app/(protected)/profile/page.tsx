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
import AccordionLesson from "@/app/components/lessons/accordion";
import { getCourse, getMineCourse } from "@/app/actions/course";
import EditProfile from "@/app/components/edit-profile";
import UserProfile from "@/app/components/user-profile";
import { getDetails } from "@/app/actions/user";
import ProfilePage from "@/app/components/profile.page";
import { getLang } from "@/utils/lang";
export default async function Page({ params }: { params: any }) {
  const user = await getDetails();
  const courses = await getMineCourse();
  let language = getLang();
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <main className="w-fit max-sm:w-full pl-24 min-h-[100vh] pt-[100px] flex flex-col  space-y-5 max-md:p-5 max-md:pt-[100px]  ">
      <h1 className="font-bold text-3xl">{language.my_profile}</h1>
      <p className="text-small">
      {language.settings_desc}
      </p>
      {/* <Tabs aria-label="Options">
        <Tab key="photos" title="Photos">
          
        </Tab>
        <Tab key="photos2" title="Photos">
          
        </Tab>
      </Tabs> */}
      <ProfilePage courses={courses} user={user} lang={language}></ProfilePage>
    </main>
  );
}
