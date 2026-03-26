
import './App.css';
import React, { useRef, useEffect } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import { Howl } from "howler";
import soundURL from "./assets/sound.mp3";
// const alertSound = new Howl({
//   src: [soundURL]
// });
// alertSound.play();
function App() {
  const webcamRef = useRef();
  const init = async () => {
    console.log("init....");
    await setupWebcam();
  }
  useEffect(() => {
    init();

    return () => {
    }
  }, []);

  const setupWebcam = async () => {
    return new Promise((resolve, reject) => {
      const webcamElement = webcamRef.current;
      const navigatorAny = navigator;
      navigator.getUserMedia = navigator.getUserMedia ||
        navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
        navigatorAny.msGetUserMedia;
      if (navigator.getUserMedia) {
        navigator.getUserMedia({ video: true },
          stream => {
            webcamElement.srcObject = stream;
            webcamElement.addEventListener("loadeddata", () => resolve(), false);
          },
          error => reject());
      } else {
        reject();
      }
    })
  };


  return (
    <div className="main">

      <h1 style={{ fontSize: "40px" }}>Hands off App</h1>
      <video
        ref={webcamRef}
        className="video"
        autoPlay
      />
      <div className="control">
        <button>Train 1</button>
        <button>Train 2</button>
        <button>Run</button>
      </div>



    </div>
  );
}

export default App;
