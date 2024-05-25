import { Divider, Image } from "@nextui-org/react";
import Nav from "./components/nav/nav";
import Hero from "./components/hero/hero";
import Featured from "./components/featured-courses/featured";
import Popular from "./components/popular-courses/popular";
import { getAllCourse } from "./actions/course";
import Footer from "./components/footer/footer";
import { CardBody, CardContainer, CardItem } from "@/app/components/3d-card";
import { TracingBeam } from "./components/tracking-beam";
import Skills from "./components/skills";
import { SocialIcon } from "react-social-icons";
import translations from "@/langs.json";
import { cookies } from "next/headers";
import { getLang } from "@/utils/lang";

export default async function Home() {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang");
  const courses = await getAllCourse();
  const langague = getLang();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 pt-24 pb-5 gap-20 max-md:p-5">
      <TracingBeam className="">
        <div className="flex min-h-screen flex-col items-center justify-between gap-14">
          <Hero lang={langague}></Hero>
          <Featured lang={langague} courses={courses}></Featured>
          <div className="max-w-md">
            <div className="space-y-1">
              <h4 className="text-2xl font-medium text-center">
                {langague && langague.social}
              </h4>
              <p className="text-small text-default-400"></p>
            </div>
            <Divider className="my-4" />
            <div className="flex flex-row gap-x-12">
              <SocialIcon
                url="https://www.facebook.com/VET4WesternBalkans/"
                className="max-w-9 max-h-9 rounded-full"
              />
              <SocialIcon
                url="https://www.linkedin.com/company/vet-4-western-balkans/"
                className="max-w-9 max-h-9 rounded-full"
              />
              <SocialIcon
                url="https://www.instagram.com/vet4westernbalkans/"
                className="max-w-9 max-h-9 rounded-full"
              />
              <SocialIcon
                url="https://www.youtube.com/channel/UCX-vqSTcldihITTGAVL4oIg"
                className="max-w-9 max-h-9 rounded-full"
              />
            </div>
          </div>
          <Footer lang={langague}></Footer>
        </div>
      </TracingBeam>
    </main>
  );
}
