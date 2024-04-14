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
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  ChipProps,
  getKeyValue,
} from "@nextui-org/react";
import { EditIcon } from "@/app/components/icons/EditIcon";
import { DeleteIcon } from "@/app/components/icons/DeleteIcon";
import { EyeIcon } from "@/app/components/icons/EyeIcon";
import { columns, users } from "./data";

import { Accordion, AccordionItem } from "@nextui-org/react";
export default function App() {
  const [selected, setSelected] = React.useState<string | number>("login");
  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };

  type User = (typeof users)[0];

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <main className="min-h-[100vh] pt-[100px] p-24 space-y-10 max-md:p-5 max-md:pt-[100px]">
      <Card>
        <CardBody className="flex flex-row gap-5">
          <Image src="/hero-card-complete.jpeg" width={100} />
          <div> 
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-medium line-clamp-2">
            ENHANCING TRANSVERSAL, GENERIC AND SUBJECT-SPECIFIC SKILLS OF
            STUDENTS
          </h4>
          </div>
        </CardBody>
      </Card>
      <div className="max-w-md">
        <div className="space-y-1">
          <h4 className="text-3xl font-medium">Statistics</h4>
          <p className="text-small text-default-400">
           statistics
          </p>
        </div>
        <Divider className="my-4" />
      </div>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
}
