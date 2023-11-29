import React, { useState } from "react";
import generatePDF from "./helpers/generatePDF";
import TextInput from "../UI/TextInput";
import { PERSONAL_DETAILS } from "./consts/formConsts";
import Heading from "../UI/Heading";
import SkillsList from "./SkillsList";
import TextAreaInput from "../UI/TextAreaInput";
import Button from "../UI/Button";

export function ResumeForm({ onDocChanged }) {
    // State to store user input
    const [personalDetails, setPersonalDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        // ... other personal details
    });

    const [professionalSummary, setProfessionalSummary] = useState("");
    const [employmentHistory, setEmploymentHistory] = useState([]);
    const [education, setEducation] = useState([]);
    const [newSkill, setNewSkill] = useState("");
    const [skills, setSkills] = useState([]);

    // Handlers to update state
    const handlePersonalDetailsChange = (data) => {
        const { name, value } = data;
        setPersonalDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // ... handlers for professional summary, employment history, education, skills

    // Function to add new employment and education fields
    const addEmployment = () => {
        setEmploymentHistory([
            ...employmentHistory,
            {
                jobTitle: "",
                employer: "",
                startDate: "",
                endDate: "",
                description: "",
            },
        ]);
    };

    const addEducation = () => {
        setEducation([
            ...education,
            { institution: "", degree: "", startDate: "", endDate: "" },
        ]);
    };

    const addSkill = () => {
        if (newSkill) {
            setSkills([...skills, newSkill]);
            setNewSkill("");
        }
    };

    const saveDoc = () => {
        const doc = generatePDF({
            personalDetails,
            professionalSummary,
            employmentHistory,
            education,
            skills,
        });
        onDocChanged(doc);
    };

    return (
        <div className="ResumeForm w-1/2 overflow-auto h-full p-12 bg-white shadow-md">
            <Heading text={"Personal details"} />
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Details Inputs */}
                {PERSONAL_DETAILS.map((cfg) => (
                    <TextInput
                        key={cfg.name}
                        {...cfg}
                        onChange={(value) =>
                            handlePersonalDetailsChange({
                                name: cfg.name,
                                value,
                            })
                        }
                    />
                ))}

                {/* ... other personal details inputs */}
            </div>

            <div className="mb-4">
                <Heading text={"Professional Summary"} />
                <span className="text-gray-500 text-sm">
                    Write 2-4 short & energetic sentences to interest the
                    reader! Mention your role, experience & most importantly -
                    your biggest achievements, best qualities and skills.
                </span>
                {/* Professional Summary */}
                <TextAreaInput
                    placeholder={
                        "e.g. Passionate science teacher with 8+ years of experience and a track record of ..."
                    }
                    onChange={setProfessionalSummary}
                />
            </div>

            <div className="mb-4">
                <Heading text={"Employment History"} />
                {/* Employment History */}
                {/* Map through employmentHistory state to create inputs for each job */}
                {employmentHistory.map((job, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Job Title"
                            className="p-2 border border-gray-300 rounded mb-2"
                        />
                        {/* ... other job inputs */}
                    </div>
                ))}
                <button
                    onClick={addEmployment}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Add Employment
                </button>
            </div>

            <div className="mb-4">
                <Heading text={"Education"} />
                {/* Education */}
                {/* Map through education state to create inputs for each education entry */}
                {education.map((edu, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Institution"
                            className="p-2 border border-gray-300 rounded mb-2"
                        />
                        {/* ... other education inputs */}
                    </div>
                ))}
                <button
                    onClick={addEducation}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Add Education
                </button>
            </div>

            <div className="mb-4">
                <Heading text={"Skills"} />
                {/* Skills */}
                <SkillsList skills={skills} />
                <div className="md:w-1/2 flex items-center">
                    <TextInput onChange={setNewSkill} value={newSkill} placeholder={'Type new skill'}/>
                    <Button onClick={addSkill} text={'Add Skill'}/>
                </div>
            </div>

            <button
                onClick={saveDoc}
                className="bg-green-500 text-white p-2 rounded"
            >
                Save changes
            </button>
        </div>
    );
}
