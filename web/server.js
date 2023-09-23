import axios from "axios";

export const server = axios.create({
  baseURL: "https://nlwshortssummarizer.vercel.app/",
});
