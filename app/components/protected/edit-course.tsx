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
import { getCookie } from "cookies-next";
import { Edit } from "lucide-react";
import Image from "next/image";
export default function EditCourse({data}:any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState("");
  const [sq_name, setSqName] = useState("");
  const [me_name, setMeName] = useState("");
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

  const handleSubmit = () => {
  
    const formData = new FormData();
    //@ts-ignore
    formData.append("cover_photo", photo);
    formData.append("name", name);
    formData.append("sq_name", sq_name);
    formData.append("me_name", me_name);
    formData.append("description", description);
    formData.append("course_type_id", category);

    axios
      .post(`${Config.API_URL}/update-course/${data.id}`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success('👏 Blog edited successfully');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to edit the blog');
      });
  };
  const notify = () => toast("Here is your toast.");
  return (
    <>
      <Button onPress={onOpen} color="primary">
        Edit course<Edit></Edit>
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
                    <Image
                    height={600}
                    width={600}
                      src={previewImage}
                      alt="Preview"
                      className="rounded-lg w-full "
                    />
                  ) : (
                    <Image
                    height={600}
                    width={600}
                    src={Config.STORAGE_URL+"/"+data.thumbnail}
                    alt="Preview"
                    className="rounded-lg w-full "
                  />
                  )}
                </div>

                <Input
                  label="Course Name"
                  placeholder="Enter course name"
                  variant="bordered"
                  name="course name"
                  defaultValue={data.name}
                  onChange={(e) => setName(e.target.value)}
                />
                
                <Input
                  label="Course Sq Name"
                  placeholder="Enter albanian course name"
                  variant="bordered"
                  name="course name"
                  defaultValue={data.name}
                  onChange={(e) => setSqName(e.target.value)}
                />
                 <Input
                  label="Course Me Name"
                  placeholder="Enter montenegrin course name"
                  variant="bordered"
                  name="course name"
                  defaultValue={data.name}
                  onChange={(e) => setMeName(e.target.value)}
                />
                {/* <Input
                  label="Description"
                  placeholder="Enter course description"
                  variant="bordered"
                  defaultValue={data.description}
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
                </Select> */}
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
