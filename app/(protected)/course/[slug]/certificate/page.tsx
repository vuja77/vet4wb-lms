"use client";
import React, { useEffect } from "react";
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
  CardFooter,
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
//@ts-ignore
import confetti from "canvas-confetti";
import { Accordion, AccordionItem } from "@nextui-org/react";
import axios from "axios";
import Course from "@/lib/types";
export default function App({ params }: { params: any }) {
  const [page, setPage] = React.useState(1);
  const [userss, setUsers] = React.useState([]);
  const [allusers, setAllUsers] = React.useState();
  const [course, setCourse] = React.useState<Course>();
  const handleConfetti = () => {
    //@ts-ignore
    var triangle = confetti.shapeFromPath({ path: "M0 10 L5 0 L10 10z" });
    download();
    confetti({
      shapes: [triangle],
      particleCount: 500,
      spread: 200,
    });
  };
  async function getUsers() {
    await axios
      .get("http://127.0.0.1:8000/api/course/" + params.slug, {
        headers: {
          Authorization:
            "Bearer 2|H9UIhAFbwPQhBOTgHJNDo4ugsWeXe9gZCEqWtIcvd449f31a",
        },
      })
      .then((e) => {
        console.log(e.data.users);
        setUsers(e.data[0].users);
        setCourse(e.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getUsers();
  }, []);
  async function download() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/download', {
          responseType: 'blob',
          headers: {
            Authorization:
              "Bearer 2|H9UIhAFbwPQhBOTgHJNDo4ugsWeXe9gZCEqWtIcvd449f31a",
          },  // Postavljamo tip odgovora na blob (binarni podaci)
      });

      // Kreiramo URL iz odgovora za preuzimanje
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Kreiramo link za preuzimanje
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf'); // Postavljamo naziv datoteke za preuzimanje

      // Dodajemo link u DOM i simuliramo klik
      document.body.appendChild(link);
      link.click();

      // Čistimo URL i uklanjamo link iz DOM-a
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
  } catch (error) {
      console.error('Greška prilikom preuzimanja datoteke:', error);
  }
  }
  return (
    <main className="min-h-[100vh] pt-[100px] p-24 space-y-10 max-md:p-5 max-md:pt-[100px]">
      <Card>
        <CardBody className="flex flex-row gap-5">
          <Image
          alt="image"
            src={"http://127.0.0.1:8000/storage/" + course?.thumbnail}
            width={100}
          />
          <div>
            <small className="text-default-500">12 Tracks</small>
            <h4 className="font-bold text-medium line-clamp-2">
              {course?.name}
            </h4>
          </div>
        </CardBody>
      </Card>
      <div className="max-w-md">
        <div className="space-y-1">
          <h4 className="text-3xl font-medium">Certificate</h4>
          <p className="text-small text-default-400">Certificate</p>
        </div>
        <Divider className="my-4" />
      </div>
      <Card>
        <CardBody>
          <Image src="/cert.png" width={500} alt="cert"></Image>
        </CardBody>
        <CardFooter>
          <Button
            variant="shadow"
            color="primary"
            className="w-full"
            onPress={handleConfetti}
          >
            Download certificate
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
