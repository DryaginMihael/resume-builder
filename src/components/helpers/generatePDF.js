import jsPDF from "jspdf";

const maxWidth = 180; // Максимальная ширина строки в мм

// Function to generate and download the resume as a PDF
export default function generatePDF({
    personalDetails,
    professionalSummary,
    employmentHistory,
    education,
    skills,
}) {
    const doc = new jsPDF();

    // Add personal details
    doc.setFontSize(16);
    doc.text(
        `${personalDetails.firstName} ${personalDetails.lastName}`,
        20,
        30
    );
    doc.setFontSize(12);
    doc.text(personalDetails.email, 20, 40);
    doc.text(personalDetails.phone, 20, 50);
    doc.text(personalDetails.address, 20, 60);

    // Add professional summary
    const lines = doc.splitTextToSize(professionalSummary, maxWidth);
    lines.forEach((line, index) => {
        doc.text(line, 20, 70 + 10 * index); // X координата фиксирована, Y координата изменяется
    });
    

    // Add employment history
    employmentHistory.forEach((job, index) => {
        doc.text(`${job.jobTitle} at ${job.employer}`, 20, 80 + index * 10);
        // ... add more job details
    });

    // Add education
    education.forEach((edu, index) => {
        doc.text(`${edu.degree} - ${edu.institution}`, 20, 100 + index * 10);
        // ... add more education details
    });

    // Add skills
    doc.text("Skills:", 20, 120);
    skills.forEach((skill, index) => {
        doc.text(skill, 25, 130 + index * 10);
    });

    return doc;

    // Save the PDF
    // doc.save('resume.pdf');
}
