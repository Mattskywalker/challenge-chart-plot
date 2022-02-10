import React, { useContext } from "react";
import { ChartContext } from "../../contexts/chartContext";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

import "./TextAreaNumber.css";

export default function TextAreaNumber() {
    const { saveEvent } = useContext(ChartContext);

    function handleChange(viewUpdate) {
        const { doc } = viewUpdate.state;
        let text = doc.text;

        if (!text) {
            const listChild = doc.children.flatMap((child) => child.text);
            saveEvent(listChild);
        } else {
            saveEvent(text);
        }
    }

    return (
        <div className="OverFlow">
            <CodeMirror
                onUpdate={(viewUpdate) => handleChange(viewUpdate)}
                className="CodeMirror"
                theme={"dark"}
                extensions={[json({})]}
                height="100%"
            ></CodeMirror>
        </div>
    );
}
