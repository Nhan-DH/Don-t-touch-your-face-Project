import React from "react";

function StatusPanel({ statusText }) {
    return (
        <section className="panel status-panel">
            <h2>System Status</h2>
            <p className="status-text">{statusText}</p>
        </section>
    );
}

export default StatusPanel;
