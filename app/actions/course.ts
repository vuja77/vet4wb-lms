import { Config } from "@/Config";
import axios from "axios";
import { cookies } from 'next/headers'
 

async function createCourse(formData: FormData) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  try {
    const res = await axios.post(
      Config.API_URL+"/courses",
      formData,
      {
        headers: {
          Authorization:
          "Bearer "+token?.value,
        },
      }
    );
    console.log(res.data);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function getCourse(id: number) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
 
  
  try {
    const res = await axios.get(Config.API_URL+"/course/" + id, {
      headers: {
        Authorization:
        "Bearer "+token?.value,
      },
    });
    console.log(res.data);
    return res.data[0];
  } catch (err) {
    console.log(err);
  }
}
export async function getCourseNotAuth(id: number) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  console.log(token)
  try {
    const res = await axios.get(Config.API_URL+"/course-info/" + id, {
      
    });
    console.log(res.data);
    return res.data[0];
  } catch (err) {
    console.log(err);
  }
}
export async function getMineCourse() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  try {
    const res = await axios.get(Config.API_URL+"/mine-courses/", {
      headers: {
        Authorization:
        "Bearer "+token?.value,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllCourse() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  try {
    const res = await axios.get(process.env.API_URL+"/courses/", {
     
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}