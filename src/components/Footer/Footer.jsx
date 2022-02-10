import React, { useContext } from "react";
import { ChartContext } from "../../contexts/chartContext";

import "./Footer.css";

export default function Footer() {
    const { runChart } = useContext(ChartContext);

    return (
        <div className="Footer">
            <button
                className="GenerateButton"
                onClick={() => {
                    runChart();
                }}
            >
                GENERATE CHART
            </button>
        </div>
    );
}
