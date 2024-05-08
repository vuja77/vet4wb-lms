"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import { Config } from "@/Config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from "cookies-next";
import translations from "@/langs.json";
import toast from "react-hot-toast";
import LangSelect from "@/app/components/nav/lang-select";

export default function App() {
  const [selected, setSelected] = React.useState<string | number>("login");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  async function login() {
    await axios
      .post(Config.API_URL + "/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
       
        localStorage.setItem("data", JSON.stringify(res.data.data));
        setCookie("token", res.data.data.token);
        setCookie("user", res.data.data);
        router.push("/");
        console.log(res);
        toast.custom((t) => (
          <Card className="inset-x-0 backdrop-blur-md p-2 rounded-full data-[menu-open=true]:backdrop-blur-lg backdrop-saturate-150 bg-background/20">
            <CardBody>
              <p>👏, {res.data.data.user && res.data.data.user.name} Welcome</p>
            </CardBody>
          </Card>
        ));
      })
      .catch((error) => {
        console.log(error.response.data.email[0]);
        setError(error && error.response.data);
      });
  }
  const [lang, setLang] = useState(getCookie("lang"));
  let [langague, setLangague] = useState();
  useEffect(() => {
    if (lang === "gb") {
      //@ts-ignore
      setLangague(translations.gb);
    } else if (lang === "me") {
      //@ts-ignore
      setLangague(translations.me);
    } else if (lang === "sq") {
      //@ts-ignore
      setLangague(translations.al);
    }
  });

  return (
    <main className="grid grid-cols-2 min-h-[100vh] p-0 max-md:grid-cols-1">
      <Image
        src="IMG_5673.jpg"
        className="rounded-none max-md:hidden object-cover h-full"
      ></Image>
      <div className="flex justify-center items-center min-h-full">
        <div className="absolute top-0 right-0 m-10">
          <LangSelect></LangSelect>
        </div>
        <Card className="w-[340px] h-[450px]">
          <CardBody className="overflow-hidden  space-y-5 pt-5">
            <h1 className="text-center font-bold text-2xl ">
              {
                //@ts-ignore
                langague && langague.login
              }
            </h1>

            <form className="flex flex-col gap-4 h-[300px]">
              <Input
                isRequired
                label="Name"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
              {
                //@ts-ignore
                error.name && (
                  <p className="text-red-600 text-xs">
                    {
                      //@ts-ignore
                      error.name[0]
                    }
                  </p>
                )
              }
              {
                //@ts-ignore
                error.email ? (
                  <Input
                    isRequired
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    color="danger"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <Input
                    isRequired
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                )
              }
              {
                //@ts-ignore
                error.email && (
                  <p className="text-red-600 text-xs">
                    {
                      //@ts-ignore
                      error.email[0]
                    }
                  </p>
                )
              }
              <Input
                isRequired
                label="Password"
                placeholder="Enter your password"
                type="password"
                color={
                  //@ts-ignore
                  error.password ? "danger" : "default"
                }
                onChange={(e) => setPassword(e.target.value)}
              />

              {
                //@ts-ignore
                error.password && (
                  <p className="text-red-600 text-xs">
                    {
                      //@ts-ignore
                      error.password[0]
                    }
                  </p>
                )
              }

              <p className="text-center text-small">
                Already have an account?{" "}
                <Link size="sm" onPress={() => router.push("login")}>
                  {
                    //@ts-ignore
                    langague && langague.login
                  }
                </Link>
              </p>
              <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" onPress={() => login()}>
                  {
                    //@ts-ignore
                    langague && langague.signup
                  }
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
