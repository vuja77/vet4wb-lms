import translations from "@/langs.json";
import { cookies } from "next/headers";

export function getLang() {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang");
  let langague = null;

  if (lang?.value === "gb") {
    return translations.gb;
  } else if (lang?.value === "me") {
    return translations.me;
  } else if (lang?.value === "sq") {
    return translations.al;
  } else {
    return translations.gb;

  }
}
