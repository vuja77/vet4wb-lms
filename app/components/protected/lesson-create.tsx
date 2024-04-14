"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";

import { CardBody, Card } from "@nextui-org/react";
import { PlusIcon } from "../icons/PlusIcon";
import { useCallback } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Config } from "@/Config";
import toast, { Toaster } from "react-hot-toast";
export default function CreateLesson({id}:{id:number}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState("");
  function handleSubmit() {
    const formData = new FormData();
    //@ts-ignore
    formData.append("name", name);
    //@ts-ignore

    formData.append("course_id", id);
    console.log(formData);
    axios
      .post(Config.API_URL + "/lesson", formData, {
        headers: {
          Authorization:
            "Bearer 2|H9UIhAFbwPQhBOTgHJNDo4ugsWeXe9gZCEqWtIcvd449f31a",
        },
      })
      .then((res) => {
        console.log(res);
        toast.custom((t) => (
          <Card className="inset-x-0 backdrop-blur-md p-2 rounded-full data-[menu-open=true]:backdrop-blur-lg backdrop-saturate-150 bg-background/20">
            <CardBody>
              <p>👏, Lesson created successfuly</p>
            </CardBody>
          </Card>
        ));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add new<PlusIcon></PlusIcon>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create course
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  placeholder="Enter lesson name"
                  variant="bordered"
                  onChange={(e) => setName(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => handleSubmit()}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
