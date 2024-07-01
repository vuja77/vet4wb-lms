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
export async function lastUsers() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
    try {
      const res = await axios.get(Config.API_URL+"/last-users");
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
}
export async function getReports() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
    try {
      const res = await axios.get(Config.API_URL+"/reports");
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
}
export async function countCourse() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
    try {
      const res = await axios.get(Config.API_URL+"/count-course-user");
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
}