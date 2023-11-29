import React, { useState } from "react";
import { ResumeForm } from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";

/**
 * @author
 * @function BuilderPage
 **/

export const BuilderPage = (props) => {
    const [pdfDoc, setPdfDoc] = useState('');

    const onDocChanged = (doc) => setPdfDoc(doc);

    return <div className="BuilderPage flex h-full">
        <ResumeForm onDocChanged={onDocChanged}/>
        <ResumePreview doc={pdfDoc}/>
    </div>;
};
