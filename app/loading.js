import Image from "next/image";

export default function Loading() {
  return <div className="fixed w-full h-full bg-white flex justify-center items-center">
    <Image className="animate-bounce" src={"/logo.png"} alt="logo" width={100} height={100}></Image>
  </div>;
}
