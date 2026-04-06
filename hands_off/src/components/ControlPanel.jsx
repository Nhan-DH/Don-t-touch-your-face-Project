import React from "react";

function ControlPanel({ isRunning, onTrainSafe, onTrainTouch, onRun, onStop }) {
    return (
        <section className="panel control-panel">
            <h2>Training Controls</h2>
            <p className="panel-note">
                Capture enough samples for each class, then start monitoring.
            </p>
            <div className="control-grid">
                <button className="btn btn-secondary" onClick={onTrainSafe}>
                    Train: Not Touched
                </button>
                <button className="btn btn-warning" onClick={onTrainTouch}>
                    Train: Touched
                </button>
                <button className="btn btn-primary" onClick={onRun} disabled={isRunning}>
                    Run
                </button>
                <button className="btn btn-danger" onClick={onStop} disabled={!isRunning}>
                    Stop
                </button>
            </div>
        </section>
    );
}

export default ControlPanel;
