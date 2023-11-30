import React, { useState } from "react";
import TextInput from "../UI/TextInput";
import TextAreaInput from "../UI/TextAreaInput";

function OrganizationForm({ onChange, entity, fields }) {
    const [_, setEntity] = useState(entity);

    const handleChange = ({ value, name }) => {
        setEntity((prevDetails) => {
            const newEntity = {
                ...prevDetails,
                [name]: value,
            };
            onChange(newEntity);
            return newEntity;
        });
    };

    return (
        <div className="space-y-4 bg-white p-4 rounded shadow mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field) => (
                    <TextInput
                        key={field.name}
                        {...field}
                        onChange={(value) =>
                            handleChange({
                                value,
                                name: field.name,
                            })
                        }
                    />
                ))}
            </div>
            <TextAreaInput
                placeholder="Description"
                onChange={(value) =>
                    handleChange({
                        value,
                        name: "description",
                    })
                }
                rows={5}
            />
        </div>
    );
}

export default OrganizationForm;
