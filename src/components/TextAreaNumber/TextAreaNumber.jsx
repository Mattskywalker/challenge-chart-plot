import React, { useContext } from "react";
import { ChartContext } from "../../contexts/chartContext";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

import "./TextAreaNumber.css";

export default function TextAreaNumber() {
    const { saveEvent } = useContext(ChartContext);

    function handleChange(viewUpdate) {
        const { doc } = viewUpdate.state;
        const listEvents = doc.toJSON();
        saveEvent(listEvents);
    }

    return (
        <div className="OverFlow">
            <CodeMirror
                onChange={(event, viewUpdate) => handleChange(viewUpdate)}
                className="CodeMirror"
                theme={"dark"}
                extensions={[json({})]}
                height="100%"
            ></CodeMirror>
        </div>
    );
}
