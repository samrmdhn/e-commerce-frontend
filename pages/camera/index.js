import { useRef, useEffect, useState } from "react";export default function App() {
  const [condition, setCondition] = useState(false);
  const [img64, setImg64] = useState("");

  const streamVideo = () => {
    let video = document.querySelector("video");
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => (video.srcObject = stream))
      .catch((err) => console.log(err));

    setTimeout(() => {
      console.log("TES");

      var canvas = document.getElementById("canvas");
      var video = document.querySelector("video");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      const playImage = new Image();
      playImage.src = "path to image asset";
      playImage.onload = () => {
        const startX = video.videoWidth / 2 - playImage.width / 2;
        const startY = video.videoHeight / 2 - playImage.height / 2;
        canvas
          .getContext("2d")
          .drawImage(
            playImage,
            startX,
            startY,
            playImage.width,
            playImage.height
          );
        /*
        canvas.toBlob() = (blob) => {
          const img = new Image();
          img.src = window.URL.createObjectUrl(blob);
        }; */
      };
      let image_data_url = canvas.toDataURL("image/jpeg");

      // data url of the image
      console.log(image_data_url);
      setImg64(image_data_url);
      const stream = video.srcObject;
      const tracks = stream?.getTracks();

      tracks?.forEach((track) => {
        track.stop();
      });

      video.srcObject = null;
    }, 1800);
  };

  const sendPic = async () => {
    if (img64 === "") return;
    try {
      const res = await fetch("http://localhost:3001/user/picture", {
        method: "POST",
        body: JSON.stringify({
          img: img64,
        }),
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sendPic();
  }, [img64]);

  return (
    <div className="App">
      <button onClick={streamVideo}>Stream</button>

      <video autoPlay id="video" style={{ display: "none" }}></video>
      <canvas
        id="canvas"
        style={{ overflow: "auto", display: "none" }}
      ></canvas>
    </div>
  );
}
