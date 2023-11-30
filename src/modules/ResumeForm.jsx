import React, { useCallback, useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';
import generatePDF from "../components/helpers/generatePDF";
import TextInput from "../UI/TextInput";
import { DEFAULT_JOB, PERSONAL_DETAILS } from "./consts/formConsts";
import Heading from "../UI/Heading";
import SkillsList from "../components/SkillsList";
import TextAreaInput from "../UI/TextAreaInput";
import Button from "../UI/Button";
import OrganizationForm from "../components/OrganizationForm";
import debounce from "../helpers/debounce";
import { GENERATE_TIMEOUT } from "../consts";
import { EDU_FIELDS, JOB_FIELDS } from "../components/consts/organization";

export default function ResumeForm({ onDocChanged }) {
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
    const [employmentHistory, setEmploymentHistory] = useState([
        {
            key: Date.now() + "",
            ...DEFAULT_JOB,
        },
    ]);
    const [education, setEducation] = useState([]);
    const [newSkill, setNewSkill] = useState("");
    const [skills, setSkills] = useState([]);

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

    const [debouncedSaveDoc] = useDebounce(saveDoc, GENERATE_TIMEOUT);

    useEffect(() => {
        // debouncedSaveDoc();
    }, [
        // personalDetails,
        // professionalSummary,
        // employmentHistory,
        // education,
        // skills,
        debouncedSaveDoc
    ]);

    // Handlers to update state
    const handlePersonalDetailsChange = (data) => {
        const { name, value } = data;
        setPersonalDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Function to add new employment and education fields
    const addEmployment = () => {
        setEmploymentHistory([
            ...employmentHistory,
            {
                key: Date.now() + "",
                DEFAULT_JOB,
            },
        ]);
    };

    const handleEmploymentChange = (job) => {
        setEmploymentHistory(
            employmentHistory.map((el) => {
                return el.key === job.key ? job : el;
            })
        );
    };

    const addEducation = () => {
        setEducation([
            ...education,
            { institution: "", degree: "", startDate: "", endDate: "" },
        ]);
    };

    const handleEducationChange = (edu) => {
        setEducation(
            education.map((el) => {
                return el.key === edu.key ? edu : el;
            })
        );
    };

    const addSkill = () => {
        if (newSkill) {
            setSkills([...skills, newSkill]);
            setNewSkill("");
        }
    };

    return (
        <div className="ResumeForm w-1/2 overflow-auto h-full p-12 bg-white shadow-md">
            <Heading text={"Personal details"} />
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-8">
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
            </div>

            <div className="mb-4">
                <Heading text={"Professional Summary"} />
                <span className="text-gray-500 text-sm">
                    Write 2-4 short & energetic sentences to interest the
                    reader! Mention your role, experience & most importantly -
                    your biggest achievements, best qualities and skills.
                </span>
                <TextAreaInput
                    placeholder={
                        "e.g. Passionate science teacher with 8+ years of experience and a track record of ..."
                    }
                    onChange={setProfessionalSummary}
                />
            </div>

            <div className="mb-4">
                <Heading text={"Employment History"} />
                {employmentHistory.map((job) => (
                    <OrganizationForm
                        key={job.key}
                        fields={JOB_FIELDS}
                        entity={job}
                        onChange={handleEmploymentChange}
                    />
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
                {education.map((edu) => (
                    <OrganizationForm
                        key={edu.key}
                        fields={EDU_FIELDS}
                        entity={edu}
                        onChange={handleEducationChange}
                    />
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
                <SkillsList skills={skills} />
                <div className="md:w-1/2 flex items-center">
                    <TextInput
                        onChange={setNewSkill}
                        value={newSkill}
                        placeholder={"Type new skill"}
                    />
                    <Button onClick={addSkill} text={"Add Skill"} />
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
