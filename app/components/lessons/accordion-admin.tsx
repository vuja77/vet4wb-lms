"use client";
import React from "react";

import { Accordion, AccordionItem } from "@nextui-org/react";
import FileList from "../file-list";
import AddMaterials from "../protected/add-material";
export default function AccordionLessonAdmin({ lessons, course}: {lessons:any, course?:any|undefined}) {
 
  return (
    <Accordion variant="splitted">
      {lessons.map((e:any, index: number) => {
        return (
          <AccordionItem key={index} aria-label="Accordion 1" title={e.name}>
            <FileList enable={1} data={e.materials} course={course}></FileList>
            <AddMaterials id={e.id}></AddMaterials>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
