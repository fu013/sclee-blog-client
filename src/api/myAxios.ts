import axios from "axios";

const myAxios = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL as string,
});

export { myAxios };
