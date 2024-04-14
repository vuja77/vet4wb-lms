import axios from "axios";
import { cookies } from 'next/headers'
 

async function createCourse(formData: FormData) {

  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/courses",
      formData,
      {
        headers: {
          Authorization:
            "Bearer 1|i6PiKw3L9CjOKbhUoZ97CRT7mUrVyoBaVxpKBVEW58c98ef3",
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
  const lang = cookieStore.get('lang')
  console.log(lang)
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/course/" + id, {
      headers: {
        Authorization:
          "Bearer 1|i6PiKw3L9CjOKbhUoZ97CRT7mUrVyoBaVxpKBVEW58c98ef3",
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
  const lang = cookieStore.get('lang')
  console.log(lang)
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/course-info/" + id, {
      
    });
    console.log(res.data);
    return res.data[0];
  } catch (err) {
    console.log(err);
  }
}
export async function getMineCourse() {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/mine-courses/", {
      headers: {
        Authorization:
          "Bearer 1|i6PiKw3L9CjOKbhUoZ97CRT7mUrVyoBaVxpKBVEW58c98ef3",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllCourse() {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/course/", {
      headers: {
        Authorization:
          "Bearer 1|i6PiKw3L9CjOKbhUoZ97CRT7mUrVyoBaVxpKBVEW58c98ef3",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}