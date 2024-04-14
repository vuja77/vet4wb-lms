"use client";
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
import FileList from "../file-list";
import AddMaterials from "../protected/add-material";
export default function AccordionLessonAdmin({ lessons }: {lessons:any}) {
  const [selected, setSelected] = React.useState<string | number>("login");
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <Accordion variant="splitted">
      {lessons.map((e:any, index: number) => {
        return (
          <AccordionItem key={index} aria-label="Accordion 1" title={e.name}>
            <FileList data={e.materials}></FileList>
            <AddMaterials id={e.id}></AddMaterials>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
