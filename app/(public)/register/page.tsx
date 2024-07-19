"use client";
import React, { useEffect, useState } from "react";
import {
  Input,
  Link,
  Button,
  Card,
  CardBody,
  Image,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Config } from "@/Config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import translations from "@/langs.json";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { MoveLeft, MoveRight } from "lucide-react";
import ImageSlider from "@/app/components/image-slider";
export default function App() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [otherschool, setotherSchool] = useState("");
  const [phone, setPhone] = useState("");
  const [social, SetSocial] = useState("");
  const [country, setCountry] = useState("");
  const [othercountry, setOtherCountry] = useState("");
  const [password, setPassword] = useState("");
  const [langauth, setLangauth] = useState("");

  const router = useRouter();
  async function login() {
    await axios
      .post(
        Config.API_URL + "/register",
        {
          name: name,
          email: email,
          school: school === "other" ? otherschool : school,
          phone: phone,
          language: langauth,
          social: social,
          country: country === "other" ? othercountry : country,
          password: password,
        },
        {
          headers: {
            referrerPolicy: "unsafe_url",
          },
        }
      )
      .then((res) => {
        // localStorage.setItem("data", JSON.stringify(res.data.data));
        // localStorage.setItem("user", JSON.stringify(res.data.data.user));

        // setCookie("token", res.data.data.token);
        // setCookie("user", res.data.data);
        // setCookie("lang", res.data.data.user.language);

        router.push("/login");
        console.log(res);
        toast.custom((t) => (
          <Card className="inset-x-0 backdrop-blur-md p-2 rounded-full data-[menu-open=true]:backdrop-blur-lg backdrop-saturate-150 bg-background/20">
            <CardBody>
              <p>Verify your mail</p>
            </CardBody>
          </Card>
        ));
      })
      .catch((error) => {
        setError(error && error.response.data);
      });
  }
  useEffect(() => {
    console.log(error);
    //@ts-ignore
    if (error.name || error.email || error.password) {
      setStep(1);
    } else {
    }
  }, [error]);
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
    } else {
      //@ts-ignore
      setLangague(translations.gb);
    }
  });
  const [step, setStep] = useState(1);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { url: "IMG_5673.jpg", caption: "Slika 1" },
    { url: "1713126423.webp", caption: "Slika 2" },
    { url: "viber_slika_2024-05-11_13-34-39-081.jpg", caption: "Slika 3" },
    { url: "1713126470.jpg", caption: "Slika 3" },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval); // Očisti interval prije nego što se komponenta unmounta
  }, [currentSlide, slides.length]);

  return (
    <>
      <main className="grid grid-cols-2 h-[100vh] p-0 max-md:grid-cols-1 overflow-hidden">
        <ImageSlider></ImageSlider>
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
          <Card className="w-[340px]">
            <CardBody className="overflow-hidden  space-y-5 pt-5">
              <h1 className="text-center font-bold text-2xl ">
                {
                  //@ts-ignore
                  langague && langague.signup
                }
              </h1>

              <form className="flex flex-col gap-4 min-h-[290px]">
                {step === 1 ? (
                  <motion.div
                    animate={{
                      x: [300, 0],
                    }}
                    initial={false}
                    className="flex flex-col gap-4 "
                  >
                    <Input
                      isRequired
                      label="Name"
                      defaultValue={name}
                      placeholder="Enter your name"
                      color={
                        //@ts-ignore
                        error.name ? "danger" : "default"
                      }
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
                    <Input
                      isRequired
                      label="Email"
                      defaultValue={email}
                      placeholder="Enter your email"
                      type="email"
                      name="email"
                      id="email"
                      alt="email"
                      color={
                        //@ts-ignore
                        error.email ? "danger" : "default"
                      }
                      onChange={(e) => setEmail(e.target.value)}
                    />

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
                      defaultValue={password}
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
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{
                      x: [-300, 0],
                    }}
                    className="flex flex-col gap-4  "
                  >
                    <Input
                      isRequired
                      label="Password"
                      className="hidden"
                      placeholder="Enter your password"
                      type="password"
                      defaultValue={password}
                      color={
                        //@ts-ignore
                        error.password ? "danger" : "default"
                      }
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                      isRequired
                      label="Password"
                      className="hidden"
                      placeholder="Enter your password"
                      type="password"
                      defaultValue={password}
                      color={
                        //@ts-ignore
                        error.password ? "danger" : "default"
                      }
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                      isRequired
                      label="Password"
                      className="hidden"
                      placeholder="Enter your password"
                      type="password"
                      defaultValue={password}
                      color={
                        //@ts-ignore
                        error.password ? "danger" : "default"
                      }
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                      isRequired
                      label="Phone number"
                      defaultValue={phone}
                      placeholder="Enter your number"
                      type="text"
                      color={
                        //@ts-ignore
                        error.phone ? "danger" : "default"
                      }
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {
                      //@ts-ignore
                      error.phone && (
                        <p className="text-red-600 text-xs">
                          {
                            //@ts-ignore
                            error.phone[0]
                          }
                        </p>
                      )
                    }
                    <Input
                      label="Social network"
                      placeholder="Enter your social link"
                      type="text"
                      name="social"
                      defaultValue={social}
                      id="social"
                      alt="social"
                      color={
                        //@ts-ignore
                        error.social ? "danger" : "default"
                      }
                      onChange={(e) => SetSocial(e.target.value)}
                    />
                    {
                      //@ts-ignore
                      error.social && (
                        <p className="text-red-600 text-xs">
                          {
                            //@ts-ignore
                            error.social[0]
                          }
                        </p>
                      )
                    }
                    <Select
                      placeholder="Select Contry"
                      onChange={(e) => setCountry(e.target.value)}
                      color={
                        //@ts-ignore
                        error.country ? "danger" : "default"
                      }
                    >
                      <SelectItem key={"Montenegro"}>Montengro</SelectItem>
                      <SelectItem key={"Bosna i Hercegovina"}>
                        Bosna i Hercegovina
                      </SelectItem>
                      <SelectItem key={"Albanian"}>Albanian</SelectItem>
                      <SelectItem key={"Kosovo"}>Kosovo</SelectItem>
                      <SelectItem key={"other"}>Other</SelectItem>
                    </Select>
                    {country === "other" && (
                      <Input
                        isRequired
                        label="country"
                        placeholder="Enter your country"
                        type="text"
                        color={
                          //@ts-ignore
                          error.country ? "danger" : "default"
                        }
                        onChange={(e) => setOtherCountry(e.target.value)}
                      />
                    )}
                    <Select
                      placeholder="Select Langague"
                      onChange={(e) => setLangauth(e.target.value)}
                      color={
                        //@ts-ignore
                        error.language ? "danger" : "default"
                      }
                    >
                      <SelectItem key={"me"}>Montengrin - Bosnian</SelectItem>
                      <SelectItem key={"sq"}>Albanian</SelectItem>
                      <SelectItem key={"gb"}>English</SelectItem>
                    </Select>
                    <Select
                      placeholder="Select Scholl"
                      onChange={(e) => setSchool(e.target.value)}
                      color={
                        //@ts-ignore
                        error.school ? "danger" : "default"
                      }
                      defaultSelectedKeys={school}
                    >
                      <SelectItem key={"Etš “Vaso Aligrudić“"} value={"other"}>
                        Etš “Vaso Aligrudić“
                      </SelectItem>
                      <SelectItem key={"Rifat Gojota"} value={"other"}>
                        Rifat Gojota
                      </SelectItem>
                      <SelectItem
                        key={
                          "High school of Metalworking crafts Country: Bosnia and Herzegovina"
                        }
                        value={"other"}
                      >
                        High school of Metalworking crafts Country: Bosnia and
                        Herzegovina
                      </SelectItem>
                      <SelectItem key={"Alternative Pro"} value={"other"}>
                        Alternative Pro
                      </SelectItem>
                      <SelectItem
                        key={"Shkolla e Mesme Teknologjike “Hysen Çela”"}
                        value={"other"}
                      >
                        Shkolla e Mesme Teknologjike “Hysen Çela”
                      </SelectItem>
                      <SelectItem
                        key={"“Hamdi Bushati” Technological High School"}
                        value={"other"}
                      >
                        “Hamdi Bushati” Technological High School
                      </SelectItem>
                      <SelectItem key={"other"} value={"other"}>
                        Other
                      </SelectItem>
                    </Select>
                    {school === "other" && (
                      <Input
                        isRequired
                        label="School"
                        placeholder="Enter your school"
                        type="text"
                        color={
                          //@ts-ignore
                          error.school ? "danger" : "default"
                        }
                        onChange={(e) => setotherSchool(e.target.value)}
                      />
                    )}
                  </motion.div>
                )}
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
                  {step === 1 ? (
                    <>
                      <Button
                        fullWidth
                        color="primary"
                        onPress={() => setStep(2)}
                      >
                        {
                          //@ts-ignore
                          "Next"
                        }
                        <MoveRight size={30} />
                      </Button>
                    </>
                  ) : (
                    <div className="flex w-full gap-5">
                      <Button
                        fullWidth
                        color="primary"
                        onPress={() => setStep(1)}
                      >
                        <MoveLeft size={20} />
                        Back
                      </Button>
                      <Button fullWidth color="primary" onPress={() => login()}>
                        {
                          //@ts-ignore
                          langague && langague.signup
                        }
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            </CardBody>
            <div className="flex flex-row gap-3 p-4">
              <p className="font-medium">Instruction:</p>
              <a
                href="EDU4WB Instruction-EN.pdf"
                target="_blank"
                className="underline text-primary"
                rel="noopener noreferrer"
              >
                ENG
              </a>
              <a
                href="EDU4WB Instruction-ALB.pdf"
                target="_blank"
                className="underline text-primary"
                rel="noopener noreferrer"
              >
                ALB
              </a>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}
