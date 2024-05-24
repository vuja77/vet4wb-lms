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
import { getCourse } from "@/app/actions/course";
import EditProfile from "@/app/components/edit-profile";
import UserProfile from "@/app/components/user-profile";
import { getDetails } from "@/app/actions/user";
export default async function Page({ params }: { params: any }) {
  const user = await getDetails();

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <main className="w-fit pl-24 min-h-[100vh] pt-[100px] flex flex-col  space-y-5 max-md:p-5 max-md:pt-[100px]  ">
      <h1 className="font-bold text-3xl">My Profile</h1>
      <p className="text-small">
        Customize settings, email preferences, and web appearance.
      </p>
      {/* <Tabs aria-label="Options">
        <Tab key="photos" title="Photos">
          
        </Tab>
        <Tab key="photos2" title="Photos">
          
        </Tab>
      </Tabs> */}
      <Card className="lg:w-[700px]">
        <UserProfile data={user}></UserProfile>
      </Card>
      <div className="">
        <div className="space-y-1 flex justify-between">
          <div className="space-y-1">
            <h4 className="text-2xl font-medium">Own courses</h4>
            <p className="text-small text-default-400"></p>
          </div>
        </div>

        <Divider className="my-4" />
      </div>
    </main>
  );
}
