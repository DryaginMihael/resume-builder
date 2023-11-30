import React from "react";

function Heading({ text, className }) {
    return <h3 className={`${className} text-xl font-semibold text-black my-3`}>{text}</h3>;
}

export default Heading;
