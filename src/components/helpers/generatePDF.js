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
    let posY = 20;
    const posX = 20;
    const step = 6;
    const doc = new jsPDF();

    const setHeaderFont = () => {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
    };

    const setDefaultFont = () => {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
    };

    // Add personal details
    doc.setFontSize(20);
    doc.text(
        `${personalDetails.firstName} ${personalDetails.lastName}`,
        posX,
        posY
    );

    setDefaultFont();
    doc.text(
        `${personalDetails.city}, ${personalDetails.address}`,
        posX,
        (posY += step)
    );
    doc.text(personalDetails.email, posX, (posY += step));
    doc.text(`Phone: ${personalDetails.phone}`, posX, (posY += step));

    if (professionalSummary) {
        setHeaderFont();
        doc.text("Summary", posX, (posY += 10));
    
        // Add professional summary
        setDefaultFont();
        const lines = doc.splitTextToSize(professionalSummary, maxWidth);
        posY += step;
        lines.forEach((line, index) => {
            doc.text(line, posX, (posY += step * index)); // X координата фиксирована, Y координата изменяется
        });
    }

    const emplList = employmentHistory.filter((job) => job.employer && job.jobTitle);
    if (emplList.length) {
        setHeaderFont();
        doc.text("Experience", posX, (posY += 10));
    
        // Add employment history
        setDefaultFont();
        employmentHistory
            .filter((job) => job.employer && job.jobTitle)
            .forEach((job, index) => {
                doc.setFontSize(12);
                doc.text(
                    `${job.jobTitle} at ${job.employer}`,
                    posX + 5,
                    (posY += step)
                );
                doc.setFontSize(10);
                doc.text(`${job.description}`, posX + 5, (posY += step));
                posY += 5;
                // ... add more job details
            });
    }

    const eduList = education.filter((e) => e.school);
    if (eduList.length) { 
        setHeaderFont();
        doc.text("Education", posX, (posY += 10));
    
        // Add employment history
        setDefaultFont();
        eduList.forEach((edu) => {
                doc.setFontSize(12);
                doc.text(
                    `- ${edu.degree} at ${edu.school}`,
                    posX + 5,
                    (posY += step)
                );
                // doc.setFontSize(10);
                // doc.text(`${job.description}`, posX + 5, (posY += step));
                posY += 5;
                // ... add more job details
            });    
    }

    if (skills.length) {
        // Add skills
        setHeaderFont();
        doc.text("Skills:", posX, posY += 10);
        setDefaultFont();
        posY += step;
        skills.forEach((skill, index) => {
            doc.text(`* ${skill}`, posX + 5, posY + index * step);
        });
    }

    return doc;

    // Save the PDF
    // doc.save('resume.pdf');
}
