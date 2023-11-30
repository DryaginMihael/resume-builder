import React from "react";

function Button({ text, onClick, className }) {
    return <button
        onClick={onClick}
        className={`${className} bg-blue-500 text-white p-2 rounded ml-2 mb-1`}
    >
        {text}
    </button>;
}

export default Button;
