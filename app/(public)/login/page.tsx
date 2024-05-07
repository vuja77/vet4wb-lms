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

export default function App() {
  const [selected, setSelected] = React.useState<string | number>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  async function login() {
    await axios
      .post(Config.API_URL + "/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("data", JSON.stringify(res.data.data));
        setCookie("token", res.data.data.token);
        setCookie("user", res.data.data);
        if (res.data.data.user.role_id === 2) {
          router.push("/admin/dashboard");
        } else if (res.data.data.user.role_id === 1) {
          router.push("dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const [lang, setLang] = useState(getCookie("lang"));
  let [langague, setLangague] = useState()
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
        <Card className="w-[340px] h-[450px]">
          <CardBody className="overflow-hidden  space-y-5 pt-5">
            <h1 className="text-center font-bold text-2xl ">{
            //@ts-ignore
            langague && langague.login}</h1>
            <Tabs
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="login" title="Login">
                <form className="flex flex-col gap-4">
                  <Input
                    isRequired
                    label="Email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                  <Input
                    isRequired
                    label="Password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                  <p className="text-center text-small">
                    Need to create an account?{" "}
                    <Link size="sm" onPress={() => setSelected("sign-up")}>
                    {//@ts-ignore
                    langague && langague.signup}
                    </Link>
                  </p>
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary" onClick={() => login()}>

      
                    {//@ts-ignore
                    langague && langague.login}
                    </Button>
                  </div>
                </form>
              </Tab>
              <Tab key="sign-up" title="Sign up">
                <form className="flex flex-col gap-4 h-[300px]">
                  <Input
                    isRequired
                    label="Name"
                    placeholder="Enter your name"
                    type="password"
                  />
                  <Input
                    isRequired
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Input
                    isRequired
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                  />
                  <p className="text-center text-small">
                    Already have an account?{" "}
                    <Link size="sm" onPress={() => setSelected("login")}>
                    {//@ts-ignore
                    langague && langague.login}
                      
                    </Link>
                  </p>
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary">
                    {//@ts-ignore
                    langague && langague.signup}

                    </Button>
                  </div>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
