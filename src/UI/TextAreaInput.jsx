import React, { useEffect, useState } from "react";

function TextAreaInput({ label, placeholder, type, value, onChange, rows }) {
    const [inputValue, setInputValue] = useState(value ?? "");

    useEffect(() => {
        setInputValue(value);
    }, [value])

    return (
        <div className="my-2 shrink-0">
            {label && (
                <label
                    className="block text-gray-400 text-sm font-bold mb-2"
                    htmlFor={label}
                >
                    {label}
                </label>
            )}
            <textarea
                className="shadow w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-100"
                id={label}
                type={type ?? "text"}
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => {
                    const newValue = e.target.value;
                    setInputValue(newValue);
                    onChange(newValue);
                }}
                rows={rows || 10}
            />
        </div>
    );
}

export default TextAreaInput;
