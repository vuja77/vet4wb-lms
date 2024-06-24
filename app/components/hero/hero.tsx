"use client";
import React from "react";
import {

  Link,
  Button,
} from "@nextui-org/react";
import Typewriter from "typewriter-effect";

export default function Hero({ lang }: any) {

  return (
    <div className="bg-photo min-w-full   rounded-3xl px-12 max-md:px-3 max-md:flex max-md:flex-col grid grid-cols-3 h-[680px] max-sm:max-h-[550px] max-md:h-space-y-10 max-md:mt-[100px]">
      <div className="py-24 space-y-10 col-span-2 max-md:col-span-3 items-center mt-[120px] pt-36 text-white ">
        <Typewriter
         
          onInit={(typewriter) => {
            typewriter
              .typeString(lang.welcome)
              .callFunction(() => {})
              .pauseFor(500)
              .callFunction(() => {})
              .start();
          }}
        />

        <div className="space-x-10">
          <Button className=" bg-white text-primary">
            <Link href="/login" className="p-2">{lang.start}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
