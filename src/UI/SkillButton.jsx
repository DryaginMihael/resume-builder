import React from 'react';

// Компонент для отдельной кнопки
function SkillButton({ name, className }) {
  return (
    <button className={`${className} bg-gray-100 text-gray-700 text-sm font-semibold py-2 px-4 rounded inline-flex items-center mr-2 mb-2 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-150`}>
      {name}
      {/* <span className="ml-1">+</span> */}
    </button>
  );
}

export default SkillButton;
