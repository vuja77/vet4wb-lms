import SideBar from "@/app/components/Sidebar/sidebar";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import Nav from "@/app/components/nav/nav";
import UserCard from "@/app/components/user-card";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });
import translations from "@/langs.json";
import Footer from "@/app/components/footer/footer";
import { getLang } from "@/utils/lang";

export const metadata: Metadata = {
  title: "Edu4Wb",
  description: "Generated by create next app",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang");
  let langague = getLang()
  return (
    <div>

      <div className="flex">
        <SideBar lang={langague}></SideBar>
        <div className="relative top-[0px] flex place-items-center before:absolute before:h-[700px] before:w-full sm:before:w-[280px] left-1/2 bottom-96 before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-success-200 after:via-success-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-success-700 before:dark:opacity-10 after:dark:from-success-900 after:dark:via-success after:dark:opacity-20 before:lg:h-[360px] z-[-1]"></div>
        <div className="relative left-[-300px] top-[100px]  flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-success-200 after:via-success-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-success-700 before:dark:opacity-10 after:dark:from-success-900 after:dark:via-success after:dark:opacity-20 before:lg:h-[360px] z-[-1]"></div>

        {children}
       
      </div>
      <div className="p-12 px-24 max-md:px-2 max-md:p-2">
        <Footer lang={langague}></Footer>
      </div>
    </div>
  );
}
