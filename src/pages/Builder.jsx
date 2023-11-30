import React, { useState } from "react";
import ResumeForm from "../modules/ResumeForm";
import ResumePreview from "../modules/ResumePreview";

/**
 * @author
 * @function BuilderPage
 **/

export const BuilderPage = (props) => {
    const [pdfDoc, setPdfDoc] = useState("");

    const onDocChanged = (doc) => setPdfDoc(doc);

    return (
        <div className="BuilderPage flex h-full">
            <ResumeForm onDocChanged={onDocChanged} />
            <ResumePreview doc={pdfDoc} />
        </div>
    );
};
