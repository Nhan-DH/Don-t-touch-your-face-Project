import React from "react";

function AppHeader({ isTouched, isRunning }) {
    return (
        <header className="app-header">
            <p className="eyebrow">Real-time Face Touch Detector</p>
            <h1>Hands Off</h1>
            <p className="subtitle">
                Train two classes from webcam samples and run live prediction with instant alert.
            </p>
            <div className="badge-row">
                <span className={`badge ${isRunning ? "badge-running" : "badge-idle"}`}>
                    {isRunning ? "Monitoring" : "Idle"}
                </span>
                <span className={`badge ${isTouched ? "badge-danger" : "badge-safe"}`}>
                    {isTouched ? "Touch detected" : "Safe"}
                </span>
            </div>
        </header>
    );
}

export default AppHeader;
