# Hands Off

This React application uses a webcam and TensorFlow.js to detect face-touching behavior in real time. The goal of the project is to help users reduce the habit of touching their face, which can contribute to lowering the risk of spreading germs through the hands, especially in disease-prevention contexts.
## 🔗 Live Demo
https://don-t-touch-your-face-project.vercel.app/
## Project Goals

- Track live video from the browser camera.
- Quickly train two basic labels: `not_touched` and `touched`.
- Predict in real time whether the user is touching their face.
- Play sound and show notifications when face-touching is detected.
- Provide a clear interface with usage instructions for new users.

## What the App Can Do

### 1. Access the live camera

The app requests webcam access from the browser and displays the user's camera feed on screen.

### 2. Train data directly in the browser

The app uses MobileNet as the feature extractor and a KNN Classifier to distinguish two states:

- `not_touched`: not touching the face
- `touched`: touching the face

Users can press the training buttons for each label to collect samples while using the app.

### 3. Run real-time prediction

After both classes have been trained, the user presses `Run` to begin live monitoring. If the system detects `touched` with sufficient confidence, the app will:

- play an alert sound,
- send a browser notification,
- update the UI to indicate that face-touching is happening.

### 4. Stop alerting immediately when the hand is removed

When the user removes their hand from the face, the sound stops immediately and the state returns to normal.

### 5. The UI is split into components

The interface has been broken into separate components for easier maintenance:

- `AppHeader`
- `VideoPanel`
- `ControlPanel`
- `UsageGuide`
- `StatusPanel`

## How This Project Helps with Disease Prevention

Touching the face is one of the behaviors that increases the risk of transferring bacteria or viruses from the hands to the eyes, nose, or mouth. This app does not replace official health measures, but it can serve as a behavioral reminder that helps users become more aware of unconscious face-touching.

In environments that require stronger hygiene and prevention measures, such as:

- classrooms,
- offices,
- research labs,
- public areas,

the app can be used as a tool to support personal behavior awareness.

## Technologies Used

- React
- TensorFlow.js
- `@tensorflow-models/mobilenet`
- `@tensorflow-models/knn-classifier`
- Howler.js
- Browser Notifications

## Main Structure

```text
src/
  App.js
  App.css
  index.css
  components/
    AppHeader.jsx
    VideoPanel.jsx
    ControlPanel.jsx
    StatusPanel.jsx
    UsageGuide.jsx
```

## How to Run Locally

### Requirements

- Node.js and npm installed
- A browser that supports webcam access
- Camera permission enabled when prompted

### Install

```bash
npm install
```

### Start Development Mode

```bash
npm start
```

Open the browser at:

```text
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

The `build/` folder will be generated and can be deployed to static hosting.

## How to Use

1. Open the app and allow browser camera access.
2. Place your face in the center of the frame.
3. Click `Train: Not Touched` while you are not touching your face.
4. Click `Train: Touched` when you place your hand on your face.
5. Click `Run` to start monitoring.
6. When the app detects face-touching, it will alert you with sound and notifications.
7. Click `Stop` to stop monitoring.

## Tips for Better Training

- Stand in a well-lit place.
- Keep the camera stable.
- Collect enough samples for both labels.
- Avoid training too quickly or using too many different face angles within the same label.
- If predictions are unstable, retrain with cleaner examples.



## Current Limitations

- The model is trained directly in the browser and is not persistently saved after refreshing the page.
- Results depend on lighting, camera angle, and camera quality.
- This is a behavioral support tool, not a medical device.

## Future Improvements

- Save the trained model in browser storage.
- Add a confidence bar for predictions.
- Allow alert sound to be toggled on or off.
- Improve the mobile layout further.
- Add multilingual support for the UI and instructions.

## Project Message

The ultimate goal of the app is to help users recognize and reduce face-touching behavior, contributing to better hygiene habits and supporting disease prevention at both the personal and community level.
