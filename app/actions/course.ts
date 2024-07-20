import axios from "axios";
import { cookies } from "next/headers";
import toast from "react-hot-toast";

async function createCourse(formData: FormData) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const res = await axios.post(process.env.API_URL + "/courses", formData, {
      headers: {
        Authorization: "Bearer " + token?.value,
      },
    });
    console.log(res.data);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function startCourse(formData: FormData) {
  "use server";
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const res = await axios.post(
      process.env.API_URL + "/course-taker",
      formData,
      {
        headers: {
          Authorization: "Bearer " + token?.value,
        },
      }
    );

    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
}

export async function getCourse(id: number) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const lang = cookieStore.get("lang");

  try {
    const res = await axios.get(
      process.env.API_URL +
        "/course/" +
        id +
        "?lang=" +
        (lang?.value === "me" ? "hr" : lang?.value),
      {
        headers: {
          Authorization: "Bearer " + token?.value,
        },
      }
    );
    console.log(res);
    return res.data[0];
  } catch (err) {
    console.log(err);
  }
}
export async function getCourseNotAuth(id: number) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const lang = cookieStore.get("lang");

  console.log(token);
  try {
    const res = await axios.get(
      process.env.API_URL +
        "/course-info/" +
        id +
        "/" +
        (lang?.value === "me" ? "hr" : lang?.value),
      {}
    );
    console.log(res.data);
    return res.data[0];
  } catch (err) {
    console.log(err);
  }
}

export async function getVideo(id: number) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const lang = cookieStore.get("lang");

  console.log(token);
  try {
    const res = await axios.get(
      process.env.API_URL +
        "/course-videos/" +
        id +
        "/" +
        (lang ? lang?.value : "gb"),

      {}
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    return err.data;
  }
}

export async function getMineCourse() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const res = await axios.get(process.env.API_URL + "/mine-courses", {
      headers: {
        Authorization: "Bearer " + token?.value,
      },
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getMineCert() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const res = await axios.get(process.env.API_URL + "/mine-cert/", {
      headers: {
        Authorization: "Bearer " + token?.value,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
export async function getAllCourse() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  var lang = cookieStore.get("lang")?.value
    ? cookieStore.get("lang")
    : { value: "gb" };

  try {
    const res = await axios.get(
      process.env.API_URL +
        "/courses/" +
        (lang?.value === "me" ? "hr" : lang?.value),
      {}
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getMineFiles() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const res = await axios.get(process.env.API_URL + "/my-files", {
      headers: {
        Authorization: "Bearer " + token?.value,
      },
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
