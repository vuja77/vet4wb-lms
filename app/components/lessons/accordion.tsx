"use client";
import React from "react";

import { Accordion, AccordionItem } from "@nextui-org/react";
import FileList from "../file-list";
export default function AccordionLesson({ lessons, enable, course }: { lessons: any, enable:any, course:any }) {
 
  return (
    <Accordion variant="splitted">
      {lessons.map((e: any, index: number) => {
        return (
          <AccordionItem key={index} aria-label="Accordion 1" title={e.name}>
            <FileList data={e.materials} enable={enable} course={course}></FileList>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
