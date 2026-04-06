
import './App.css';
import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import { Howl } from "howler";
import soundURL from "./assets/sound.mp3";
// const alertSound = new Howl({
//   src: [soundURL]
// });
// alertSound.play();

const NOT_touched = "not_touched";
const touched = "touched";
const trainingTime = 50;
function App() {
  const webcamRef = useRef();
  const classifierRef = useRef();
  const mobilenetRef = useRef();
  const init = async () => {
    console.log("init....");
    await setupWebcam();
    console.log("webcam ready....");

    // Ensure a TensorFlow backend is available before loading models.
    await tf.setBackend("webgl").catch(() => tf.setBackend("cpu"));
    await tf.ready();


    mobilenetRef.current = await mobilenet.load();
    classifierRef.current = knnClassifier.create();
    console.log("tf backend:", tf.getBackend());
    console.log("set up done....");
    console.log("kkhong cham ten len mat va bam nut train 1....");
  }
  useEffect(() => {
    init();

    return () => {
    }
  }, []);
  const train = async label => {
    if (!mobilenetRef.current || !classifierRef.current || !webcamRef.current) {
      console.log("Model/chclassifier/webcam chua san sang");
      return;
    }

    for (let i = 0; i < trainingTime; i++) {
      console.log(`Progress ${Math.floor((i + 1) / trainingTime * 100)}%`);
      await training(label);
    }
  }
  const training = async (label) => {
    const embedding = mobilenetRef.current.infer(webcamRef.current, true);
    classifierRef.current.addExample(embedding, label);
    embedding.dispose();
    await sleep(100);
  }
  const sleep = (ms = 100) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
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
        <button className="btn" onClick={() => train(NOT_touched)}>Train 1</button>
        <button className="btn" onClick={() => train(touched)}>Train 2</button>
        <button className="btn" onClick={() => { }}>Run</button>
      </div>



    </div>
  );
}

export default App;
