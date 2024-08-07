import React from "react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { getMineFiles } from "@/app/actions/course";
import { getLang } from "@/utils/lang";
import AddFiles from "@/app/components/add-files";
import AddFilesS from "@/app/components/add-files-s";
export default async function App() {
  const files = await getMineFiles();
  let language = getLang();

  function extractHrefFromString(str: string) {
    // Regular expression to find href attributes within <a> tags
    const hrefRegex = /<a[^>]*href=['"]([^'"]*)['"][^>]*>/gi;
    const hrefs: string[] = [];
    let match;

    // Iterate through all matches of the regular expression
    while ((match = hrefRegex.exec(str)) !== null) {
      hrefs.push(match[1]);
    }
    return hrefs;
  }

  // Vrati niz href vrednosti

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
          <CardHeader className=" dark:bg-white/10 grid grid-cols-3 bg-black/10  rounded-lg ">
            <p className="col-span-1 text-left w-1/2 text-xs">
              Number of deliverables (as in application)
            </p>
            <p className="col-span-1 text-center  text-xs">
              Title of deliverable (as in application)
            </p>
            {/* <p className="col-span-1 w-1/2 text-center text-xs">
              File- Documents
            </p> */}
            <p className="text-right text-xs w-full">actions</p>
          </CardHeader>
          <CardBody className="gap-5">
            {files
              .filter((e: any) => e.type === "D")
              .map((file: any, index: number) => {
                return (
                  <>
                    <div className="w-full   items-center gap-12 grid grid-cols-3  justify-between">
                      <p>{`${file.type}.${index + 1}.`}</p>
                      <div
                        className="col-span-1  text-left"
                        dangerouslySetInnerHTML={{
                          __html: file && file.description,
                        }}
                      ></div>
                      {/* 
                      <p className="col-span-2">{file.display_name}</p> */}
                      <div className="text-end flex justify-end items-center">
                        {file.file_name ? (
                          <a
                            target="_blank"
                            className=""
                            href={
                              file.file_name.split(".")[1] === "docx"
                                ? "https://docs.google.com/gview?url=" +
                                  "https://moodle.edu4wb.com/storage/" +
                                  file.file_name +
                                  "&embeded=true"
                                : "https://moodle.edu4wb.com/storage/" +
                                  file.file_name
                            }
                          >
                            <Button color="primary">Open</Button>
                          </a>
                        ) : (
                          <a
                            target="_blank"
                            className=""
                            //@ts-ignore
                            href={extractHrefFromString(file.description)}
                          >
                            <Button color="primary">Open</Button>
                          </a>
                        )}
                        {/* <a
                        className=""
                        download
                        target="_blank"
                        href={
                          "https://moodle.edu4wb.com/storage/" + file.file_name
                        }
                      >
                        <Button color="primary" isIconOnly>
                          <Download />
                        </Button>
                      </a> */}
                      </div>
                    </div>
                    <hr className="w-[90%] self-center  dark:border-white/10"></hr>
                  </>
                );
              })}
          </CardBody>
        </Card>
      </div>
      <div className="w-full mt-12">
        <div className="space-y-1 flex justify-between">
          <div className="space-y-1">
            {/* <h4 className="text-3xl font-medium">Files - S</h4> */}
            <br />
          </div>
          <AddFilesS></AddFilesS>
        </div>
        <Divider className="my-4" />
      </div>
      <div className=" max-sm:w-full justify-items-center gap-5 max-lg:grid-cols-2 max-[600px]:grid-cols-1 min-w-full">
        <Card className="max-md:col-span-4 min-w-full flex-1 h-full flex flex-col p-2">
          <CardHeader className="flex justify-between dark:bg-white/10 grid grid-cols-3 bg-black/10  rounded-lg ">
            <p className="col-span-1 text-left w-1/2 text-xs">
              Number of supporting document
            </p>
            <p className="col-span-1 text-center  text-xs">
              Title of supporting document
            </p>
            <p className="text-right w-1/2 text-xs w-full">actions</p>
          </CardHeader>
          <CardBody className="gap-5">
            {files
              .filter((e: any) => e.type === "S")
              .map((file: any, index: number) => {
                return (
                  <>
                    <div className="w-full   items-center gap-12 grid grid-cols-3  justify-between">
                      <p>{`${file.type}.${index + 1}.`}</p>
                      <div
                        className="col-span-1  text-left"
                        dangerouslySetInnerHTML={{
                          __html: file && file.description,
                        }}
                      ></div>
                      <div className="text-end flex justify-end items-center">
                        {file.file_name ? (
                          <a
                            target="_blank"
                            className=""
                            href={
                              file.file_name.split(".")[1] === "docx"
                                ? "https://docs.google.com/gview?url=" +
                                  "https://moodle.edu4wb.com/storage/" +
                                  file.file_name +
                                  "&embeded=true"
                                : "https://moodle.edu4wb.com/storage/" +
                                  file.file_name
                            }
                          >
                            <Button color="primary">Open</Button>
                          </a>
                        ) : (
                          <a
                            target="_blank"
                            className=""
                            //@ts-ignore
                            href={extractHrefFromString(file.description)}
                          >
                            <Button color="primary">Open</Button>
                          </a>
                        )}

                        {/* <a
                        className=""
                        download
                        target="_blank"
                        href={
                          "https://moodle.edu4wb.com/storage/" + file.file_name
                        }
                      >
                        <Button color="primary" isIconOnly>
                          <Download />
                        </Button>
                      </a> */}
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
