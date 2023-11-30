import React, { useState, useMemo, useCallback } from "react";
import resumeSceleton from "../assets/resume-sceleton.svg";

function ResumePreview({ doc }) {
    const [isLoaded, setIsLoaded] = useState(false);

    const generatePDF = useCallback(() => {
        // Сгенерируйте Blob из документа PDF
        const pdfBlob = doc.output("blob");

        // Создайте URL из Blob
        return URL.createObjectURL(pdfBlob);
    }, [doc]);

    const pdfUrl = useMemo(() => {
        setIsLoaded(false);
        return doc ? generatePDF() : null;
    }, [doc, generatePDF]);

    const handleIframeLoad = () => {
        setIsLoaded(true);
    };

    return (
        <div className="ResumePreview h-full w-3/5 mx-auto overflow-hidden bg-gray-300">
            {/* Показать предпросмотр PDF, если URL доступен */}
            {pdfUrl && (
                <iframe
                    className={`${!isLoaded ?? "hidden"}`}
                    title="PDFpreview"
                    onLoad={handleIframeLoad}
                    src={pdfUrl}
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                />
            )}
            <img
                className={`${
                    isLoaded ?? "hidden"
                } mx-auto my-12 diagonal-animate border border-gray-300 rounded`}
                src={resumeSceleton}
                alt="resume"
            />
        </div>
    );
}

export default ResumePreview;
