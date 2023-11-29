import React, { useMemo, useCallback } from "react";
import resumeSceleton from "../assets/resume-sceleton.svg";

function ResumePreview({ doc }) {
    const generatePDF = useCallback(() => {
        // Сгенерируйте Blob из документа PDF
        const pdfBlob = doc.output("blob");

        // Создайте URL из Blob
        return URL.createObjectURL(pdfBlob);
    }, [doc]);

    const pdfUrl = useMemo(() => {
        return doc ? generatePDF() : null;
    }, [doc, generatePDF]);

    return (
        <div className="ResumePreview h-full w-3/5 mx-auto overflow-hidden">
            {/* Показать предпросмотр PDF, если URL доступен */}
            {pdfUrl ? (
                <iframe
                    title="PDFpreview"
                    src={pdfUrl}
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                />
            ) : (
                <img className="mx-auto my-12 diagonal-animate border border-gray-300 rounded" src={resumeSceleton} alt="resume" />
            )}
        </div>
    );
}

export default ResumePreview;
