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
  CardBody,
  Card,
  CircularProgress,
} from "@nextui-org/react";
import { PlusIcon } from "../icons/PlusIcon";
import { useCallback } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Config } from "@/Config";
import toast, { Toaster } from "react-hot-toast";
import { Blob } from "buffer";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
export default function AddVideo({ id }: { id: number }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState("");
  const [lang, setLang] = useState("");
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState();
  const [file, setFile] = useState<Blob>();
  const [type, setType] = useState("");
  const router = useRouter();
  console.log(id);
  const { getRootProps, getInputProps } = useDropzone({
    //@ts-ignore
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      //@ts-ignore
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = () => {
        //@ts-ignore
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    },
  });

  async function handleSubmit() {
    const formData = new FormData();
    //@ts-ignore
    //@ts-ignore
    formData.append("video", file);
    //@ts-ignore
    formData.append("course_id", id);
    formData.append("display_name",name);
    formData.append("lang", lang);
    console.log(formData);
    console.log(type);
    setLoading(true);
    await axios
      .post(Config.API_URL + "/course-videos", formData, {
        headers: {
          Authorization: "Bearer " + getCookie("token"),
        }
      })
      .then((res) => {
        console.log(res);
        toast.custom((t) => (
          <Card className="inset-x-0 backdrop-blur-md p-2 rounded-full data-[menu-open=true]:backdrop-blur-lg backdrop-saturate-150 bg-background/20">
            <CardBody>
              <p>👏, Video added successfuly</p>
            </CardBody>
          </Card>
        ));
        setLoading(false)
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const notify = () => toast("Here is your toast.");
  return (
    <>
      <Button onPress={onOpen} color="primary" className="w-full">
        Add new Video<PlusIcon></PlusIcon>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create course
              </ModalHeader>
              {!loading ?
              <ModalBody>
                <Input
                  type="file"
                  name="file"
                  label="File"
                  placeholder="Select a file"
                  className="max-w-full"
                  variant="bordered"
                  //@ts-ignore
                  onChange={(e) => setFile(e.target.files[0])}
                ></Input>

                <Input
                  type="text"
                  name="video"
                  label="File"
                  placeholder="Video name"
                  className="max-w-full"
                  variant="bordered"
                  onChange={(e) => setName(e.target.value)}
                ></Input>

                <Select
                  label="Lang"
                  placeholder="Select an lang"
                  className="max-w-full"
                  variant="bordered"
                  onChange={(e) => setLang(e.target.value)}
                >
                  <SelectItem value="scorm" key="gb">
                    English
                  </SelectItem>
                  <SelectItem value="scorm" key="me">
                    Montenegrin
                  </SelectItem>
                  <SelectItem value="scorm" key="sq">
                    Albanian
                  </SelectItem>
                </Select>
              </ModalBody>: <CircularProgress aria-label="Loading..." />}
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
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
