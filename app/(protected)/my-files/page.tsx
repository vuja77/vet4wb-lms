import React from "react";
import { Button, Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { getMineCourse, getMineFiles } from "@/app/actions/course";
import { getLang } from "@/utils/lang";
import AddFiles from "@/app/components/add-files";
export default async function App() {
  const files = await getMineFiles();
  let language = getLang();
  return (
    <main className="min-h-[100vh] pt-[100px] w-full p-12 max-sm:p-2 max-sm:pt-24 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:w-full">
      <div className="w-full">
        <div className="space-y-1 flex justify-between">
          <div className="space-y-1">
            <h4 className="text-3xl font-medium">My Files</h4>
          </div>
          <AddFiles></AddFiles>
        </div>
        <Divider className="my-4" />
      </div>
      <div className=" max-sm:w-full justify-items-center gap-5 max-lg:grid-cols-2 max-[600px]:grid-cols-1 min-w-full">
        <Card className="max-md:col-span-4 min-w-full flex-1 h-full flex flex-col p-2">
          <CardHeader className="flex justify-between dark:bg-white/10 bg-black/10  rounded-lg ">
            <p>id</p>
            <p>name</p>
            <p>description</p>
            <p className="text-center">actions</p>
          </CardHeader>
          <CardBody className="gap-5">
            {files.map((file: any, index: number) => {
              return (
                <>
                  <div className="w-full   items-center gap-12 grid grid-cols-6  justify-between">
                    <p>{index + 1}</p>
                    <p className="col-span-2">{file.display_name}</p>
                    <p className=" col-span-2  ">{file.description}</p>
                    <div className="text-end">
                      <a
                        target="_blank"
                        className=""
                        href={
                          "https://docs.google.com/gview?url=" +
                          "https://moodle.edu4wb.com/storage/" +
                          file.file_name +
                          "&embeded=true"
                        }
                      >
                        <Button color="primary">Open</Button>
                      </a>
                    </div>
                  </div>
                  <hr className="w-[90%] self-center  dark:border-white/10"></hr>
                </>
              );
            })}
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
