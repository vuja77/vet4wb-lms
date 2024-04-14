"use client";
import React, { useEffect, useState } from "react";
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
export default function AddUsers({ id, data }: { id: any, data: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log("alo");
  const [user, setUser] = useState("");
  useEffect(() => {
    console.log(data);

  })
  function handleSubmit() {
    const formData = new FormData();
    console.log(user);
    //@ts-ignore
    formData.append("user_id", user);
    formData.append("course_id", id);
    console.log(formData);
    axios
      .post(Config.API_URL + "/course-taker", formData, {
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
              <p>👏, User added successfuly</p>
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
                Add users
              </ModalHeader>
              <ModalBody>
                <Select
                  label="User"
                  placeholder="Select an user"
                  className="max-w-full"
                  variant="bordered"
                  onChange={(e) => setUser(e.target.value)}
                >
                  {data &&
                    data.map((e: any, index: number) => {
                      return (
                        <SelectItem value={e.id} key={e.id}>
                          {e.name}
                        </SelectItem>
                      );
                    })}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => handleSubmit()}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
