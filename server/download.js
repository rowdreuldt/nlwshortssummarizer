import ypdl from "ytdl-core";
import fs from "fs";
import ytdl from "ytdl-core";
import { error } from "console";

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoId;
    console.log("downloading..." + videoId);
    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000;
        if (seconds > 60) {
          throw new Error("The duration of this video is > 60 seconds");
        }
      })
      .on("end", () => {
        console.log("Donwload complete.");
        resolve();
      })
      .on("error", (error) => {
        console.log("Donwload NOT sucessful. Because of error " + error);
        reject(error);
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"));
  });
