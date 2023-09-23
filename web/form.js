import { server } from "./server.js";
const form = document.querySelector("#form");
const input = document.querySelector("#url");
const content = document.querySelector("#content");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  content.classList.add("placeholder");

  console.log("Data sent");
  const videoURL = input.value;
  console.log("URL retrieved" + videoURL);

  if (!videoURL.includes("shorts")) {
    return (content.textContent =
      "This video is not a YouTube Shorts. Choose another.");
  }

  const [_, videoParams] = videoURL.split("/shorts/");
  const [videoID] = videoParams.split("?si");
  console.log(videoID);

  content.textContent = "Obtaining text from audio...";

  const transcription = await server.get("/summary/" + videoID);

  content.textContent = "Creating summary...";

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  });

  content.textContent = summary.data.result;
  content.classList.remove("placeholder");
});
