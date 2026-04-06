import React from "react";

function VideoPanel({ webcamRef, isTouched }) {
    return (
        <section className="panel video-panel">
            <div className="panel-title-row">
                <h2>Live Camera</h2>
                <span className={`dot ${isTouched ? "dot-danger" : "dot-safe"}`} />
            </div>
            <video ref={webcamRef} className="video" autoPlay playsInline muted />
            <p className="panel-note">
                Keep your face centered and use stable lighting for better predictions.
            </p>
        </section>
    );
}

export default VideoPanel;
