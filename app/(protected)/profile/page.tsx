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
    <main className=" min-h-[100vh] pt-[100px] p-32 space-y-10 max-md:p-5 max-md:pt-[100px]">
      <Card className="w-[700px]">
        <UserProfile data={user}></UserProfile>
      </Card>
      <div className="">
        <div className="space-y-1 flex justify-between">
          <div className="space-y-1">
            <h4 className="text-3xl font-medium">Own courses</h4>
            <p className="text-small text-default-400">
              Beautiful, fast and modern React UI library.
            </p>
          </div>
        </div>

        <Divider className="my-4" />
      </div>
    </main>
  );
}
