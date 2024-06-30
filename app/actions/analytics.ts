import { Config } from "@/Config";
import axios from "axios";
import { cookies } from "next/headers";

export async function countUsers() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
    try {
      const res = await axios.get(Config.API_URL+"/count-users");
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
}