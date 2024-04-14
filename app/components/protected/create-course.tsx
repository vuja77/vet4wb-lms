"use client"

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
} from "@nextui-org/react";
import { PlusIcon } from "../icons/PlusIcon";
import { useCallback } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Config } from "@/Config";
import toast, { Toaster } from "react-hot-toast";
export default function CreateCourse() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState();
  const [category, setCategory] = useState("");
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

  function handleSubmit() {
    const formData = new FormData();
    //@ts-ignore
    formData.append("cover_photo", photo);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("course_type_id", category);
    console.log(formData);
    axios
      .post(Config.API_URL + "/course", formData, {
        headers: {
          Authorization:
            "Bearer 2|H9UIhAFbwPQhBOTgHJNDo4ugsWeXe9gZCEqWtIcvd449f31a",
        },
      })
      .then((res) => {
        console.log(res);
        toast.custom((t) => (
          <Card className="inset-x-0 backdrop-blur-md p-2 rounded-full data-[menu-open=true]:backdrop-blur-lg backdrop-saturate-150 bg-background/20">
            <CardBody><p>👏, Blog created successfuly</p></CardBody>
          </Card>
        ));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const notify = () => toast("Here is your toast.");
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
                <div
                  {...getRootProps()}
                  className="border-border border-dashed border-content3 border-2 rounded-lg min-h-[200px] flex items-center justify-center text-center text-content4"
                >
                  <input {...getInputProps()} />
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="rounded-lg w-full "
                    />
                  ) : (
                    <p>
                      Drag n drop your image here, or click to select image
                    </p>
                  )}
                </div>

                <Input
                  label="Course Name"
                  placeholder="Enter course name"
                  variant="bordered"
                  name="course name"
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Description"
                  placeholder="Enter course description"
                  variant="bordered"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Select
                  label="Category"
                  placeholder="Select an category"
                  className="max-w-full"
                  variant="bordered"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <SelectItem value={1} key={1}>
                    aaa
                  </SelectItem>
                </Select>
              </ModalBody>
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
