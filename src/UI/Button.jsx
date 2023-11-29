import React from "react";

function Button({ text, onClick }) {
    return <button
        onClick={onClick}
        className="bg-blue-500 text-white p-2 rounded ml-2 mb-1"
    >
        {text}
    </button>;
}

export default Button;
