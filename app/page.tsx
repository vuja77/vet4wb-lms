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
export default async function Home() {
  const courses = await getAllCourse();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 pt-24 pb-5 gap-20 max-md:p-5">
      <Nav></Nav>
      <TracingBeam className="">
        <div className="flex min-h-screen flex-col items-center justify-between gap-14">
          <Hero></Hero>
          <Featured courses={courses}></Featured>
          <div className="max-w-md">
        <div className="space-y-1">
          <h4 className="text-3xl font-medium text-center">Social Networks</h4>
          <p className="text-small text-default-400">
          </p>
        </div>
        <Divider className="my-4" />
      </div>
          <Footer></Footer>
        </div>
      </TracingBeam>
    </main>
  );
}
