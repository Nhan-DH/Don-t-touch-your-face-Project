import React from "react";

const steps = [
    "Allow the browser to use your camera when you open the app.",
    "Click Train: Not Touched while your face is in a normal state.",
    "Click Train: Touched when you place your hand on your face.",
    "Click Run to start live monitoring.",
    "Click Stop to stop monitoring whenever you need to.",
];

function UsageGuide() {
    return (
        <section className="panel usage-panel">
            <h2>How to Use</h2>
            <ol className="usage-list">
                {steps.map((step) => (
                    <li key={step} className="usage-item">
                        {step}
                    </li>
                ))}
            </ol>
            <p className="panel-note">
                Tip: stand in a well-lit place and keep your face centered in the frame for more stable results.
            </p>
        </section>
    );
}

export default UsageGuide;
