import Image from "next/image";

export default function Loading() {
  return <div className="fixed w-full h-full bg-white dark:bg-black flex justify-center z-50 items-center">
    <Image className="animate-bounce" src={"/logo.png"} alt="logo" width={100} height={100}></Image>
  </div>;
}
