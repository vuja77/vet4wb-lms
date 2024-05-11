import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ImageSlider() {
  const images = [
    "IMG_5673.jpg",
    "1713126423.webp",
    "1713126470.jpg",
    "1713126456.webp",
    "1713126443.jpg",
  ];
  const [activeImage, setIamage] = useState("IMG_5673.jpg");
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
    <div className="min-h-[100vh]  col-span-1 max-md:fixed">
      {slides.map((slide, index) => (
        <>
          {index === currentSlide && (
            <motion.div animate={{ x: [-100, 0] }}>
              <Image
                src={slide.url}
                className={
                  index === currentSlide
                    ? "rounded-none max-md:brightness-50 filter  object-cover min-h-[100vh] "
                    : "hidden"
                }
              ></Image>
            </motion.div>
          )}
        </>
      ))}
    </div>
  );
}
