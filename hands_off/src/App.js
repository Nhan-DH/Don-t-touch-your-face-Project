
import './App.css';
import React, { useRef, useEffect, useState } from "react";
import { initNotifications, notify } from "@mycv/f8-notification";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import { Howl } from "howler";
import soundURL from "./assets/sound.mp3";
const alertSound = new Howl({
  src: [soundURL]
});

const NOT_TOUCHED_LABEL = "not_touched";
const TOUCHED_LABEL = "touched";
const trainingTime = 50;
function App() {
  const webcamRef = useRef();
  const classifierRef = useRef();
  const mobilenetRef = useRef();
  const isRunningRef = useRef(false);
  const wasTouchedRef = useRef(false);

  const [isTouched, setIsTouched] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
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
    initNotifications({ cooldown: 3000 });
  }
  useEffect(() => {
    init();

    return () => {
      isRunningRef.current = false;
      alertSound.stop();
      setIsRunning(false);
      const stream = webcamRef.current?.srcObject;
      if (stream?.getTracks) {
        stream.getTracks().forEach((track) => track.stop());
      }
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
  const run = async () => {
    if (!mobilenetRef.current || !classifierRef.current || !webcamRef.current) {
      console.log("Model/chclassifier/webcam chua san sang");
      return;
    }
    const classExampleCount = classifierRef.current.getClassExampleCount();
    if (!classExampleCount[NOT_TOUCHED_LABEL] || !classExampleCount[TOUCHED_LABEL]) {
      console.log("Can train du ca 2 nhan truoc khi Run");
      return;
    }
    if (isRunningRef.current) {
      console.log("Dang run roi");
      return;
    }

    isRunningRef.current = true;
    setIsRunning(true);
    while (isRunningRef.current) {
      const embedding = mobilenetRef.current.infer(webcamRef.current, true);
      const result = await classifierRef.current.predictClass(embedding);
      embedding.dispose();

      const touchedNow = result.label === TOUCHED_LABEL && result.confidences[result.label] > 0.8;
      if (touchedNow && !wasTouchedRef.current) {
        console.log("Touched");
        alertSound.play();
        notify("Don't touch your face!", { body: "You just touched your face!" });
      }

      if (!touchedNow) {
        console.log("Not touched");
        alertSound.stop();
      }

      wasTouchedRef.current = touchedNow;
      setIsTouched(touchedNow);
      await sleep(200);
    }

    setIsTouched(false);
    wasTouchedRef.current = false;
    setIsRunning(false);
  }
  const stopRun = () => {
    isRunningRef.current = false;
    alertSound.stop();
  }
  const sleep = (ms = 100) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const setupWebcam = async () => {
    return new Promise((resolve, reject) => {
      const webcamElement = webcamRef.current;
      if (navigator.mediaDevices?.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            webcamElement.srcObject = stream;
            webcamElement.addEventListener("loadeddata", () => resolve(), false);
          })
          .catch(reject);
        return;
      }

      const navigatorAny = navigator;
      navigator.getUserMedia = navigator.getUserMedia ||
        navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
        navigatorAny.msGetUserMedia;
      if (!navigator.getUserMedia) {
        reject(new Error("getUserMedia is not supported"));
        return;
      }

      navigator.getUserMedia({ video: true },
        (stream) => {
          webcamElement.srcObject = stream;
          webcamElement.addEventListener("loadeddata", () => resolve(), false);
        },
        (error) => reject(error));
    })
  };


  return (
    <div className={`main ${isTouched ? "touched" : ""}`}>

      <h1 style={{ fontSize: "40px" }}>Hands off App</h1>
      <video
        ref={webcamRef}
        className="video"
        autoPlay
      />
      <div className="control">
        <button className="btn" onClick={() => train(NOT_TOUCHED_LABEL)}>Train 1</button>
        <button className="btn" onClick={() => train(TOUCHED_LABEL)}>Train 2</button>
        <button className="btn" onClick={() => { run() }}>Run</button>
        <button className="btn" onClick={stopRun} disabled={!isRunning}>Stop</button>
      </div>



    </div>
  );
}

export default App;
