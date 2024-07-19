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
  Checkbox,
} from "@nextui-org/react";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import { Config } from "@/Config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from "cookies-next";
import translations from "@/langs.json";
import LangSelect from "@/app/components/nav/lang-select";
import ImageSlider from "@/app/components/image-slider";
import { Check } from "lucide-react";

export default function App() {
  const [selected, setSelected] = React.useState<string | number>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  async function login() {
    await axios
      .post(Config.API_URL + "/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("data", JSON.stringify(res.data.data));
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        setCookie("token", res.data.data.token, { maxAge: 31536000 });
        setCookie("user", res.data.data, { maxAge: 31536000 });
        setCookie("lang", res.data.data.user.language, { maxAge: 31536000 });
        router.push("dashboard");
      })
      .catch((error) => {
        console.log(error);
        setError(error && error.response.data);
      });
  }
  const [lang, setLang] = useState(getCookie("lang"));
  let [langague, setLangague] = useState("gb");
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
    } else {
      //@ts-ignore
      setLangague(translations.gb);
    }
  });

  return (
    <main className="grid grid-cols-2 h-[100vh] p-0 max-md:grid-cols-1 overflow-hidden">
      <ImageSlider />
      <div className="flex justify-center items-center min-h-full">
        <div className="absolute top-0 right-0 m-10 flex justify-center max-sm:w-full max-sm:m-0 max-sm:pt-12">
          <Link href="/">
            <Image
              src="/logo.webp"
              className="w-20 z-60 opacity-100"
              alt="logo"
            ></Image>
          </Link>
        </div>
        <Card className="w-[340px] max-h-[450px]">
          <CardBody className="overflow-hidden  space-y-5 pt-5">
            <h1 className="text-center font-bold text-2xl ">
              {
                //@ts-ignore
                langague ? langague.login : translations.gb.login
              }
            </h1>
            <form className="flex flex-col gap-4">
              {
                //@ts-ignore
                error.email ? (
                  <Input
                    isRequired
                    //@ts-ignore

                    label={langague && langague.email}
                    placeholder="Enter your email"
                    type="email"
                    color="danger"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <Input
                    isRequired
                    //@ts-ignore

                    label={langague && langague.email}
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
                placeholder="Enter your password"
                type="password"
                //@ts-ignore
                label={langague && langague.password}
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
              <Checkbox>Remember me</Checkbox>

              <p className="text-center text-small">
                {
                  //@ts-ignore
                  langague && langague.need
                }{" "}
                <Link size="sm" href="/register">
                  {
                    //@ts-ignore
                    langague && langague.signup
                  }
                </Link>
              </p>

              {
                //@ts-ignore
                error.message && (
                  <p className="text-red-600 text-xs">
                    {
                      //@ts-ignore
                      error.message
                    }
                  </p>
                )
              }

              <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" onClick={() => login()}>
                  {
                    //@ts-ignore
                    langague && langague.login
                  }
                </Button>
              </div>
              <Link size="sm" href="/resend-email">
                <span className="text-white pr-1">
                  Didn&apos;t receive the verification email?
                </span>
                Resend.
              </Link>
            </form>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
