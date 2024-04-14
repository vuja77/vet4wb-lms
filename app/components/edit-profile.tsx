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
  Card,
  CardBody,
} from "@nextui-org/react";
import axios from "axios";
import { Config } from "@/Config";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";

export default function EditProfile({data} : {data:any}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  //@ts-ignore
  const [name, setName] = useState(JSON.parse(localStorage.getItem("data")).user.name);
  const [previewImage, setPreviewImage] = useState(Config.STORAGE_URL+"/"+data.photo);

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
  //@ts-ignore

  const token = JSON.parse(localStorage.getItem("data"));
  function update() {
    const formData = new FormData();
    //@ts-ignore
    formData.append("cover_photo", photo);
    formData.append("name", name);
    console.log(formData);
    axios
      .post(Config.API_URL + "/update-profile", formData, {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      })
      .then((res) => {
        console.log(res);
        toast.custom((t) => (
          <Card className="inset-x-0 backdrop-blur-md p-2 rounded-full data-[menu-open=true]:backdrop-blur-lg backdrop-saturate-150 bg-background/20">
            <CardBody>
              <p>👏, Blog created successfuly</p>
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
      <Button
        onPress={onOpen}
        color="primary"
        variant="shadow"
        className="w-full"
      >
        Edit Profile
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Profile
              </ModalHeader>
              <ModalBody className="flex flex-col items-center">
                <div
                  {...getRootProps()}
                  className="border-border aspect-square  border-dashed border-content3 border-2 h-[150px] w-[150px] flex items-center justify-center text-center text-content4 rounded-full"
                >
                  <input {...getInputProps()} />
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="aspect-square rounded-full"
                    />
                  ) : (
                    <p className="text-small">Drag n drop your image here, or click to select image</p>
                  )}
                </div>
                <Input
                  autoFocus
                  label="Name"
                  defaultValue={data.name}
                  placeholder="Enter your email"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={update}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
