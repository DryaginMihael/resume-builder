import React from 'react';
import SkillButton from '../UI/SkillButton'; 

function SkillsList({skills}) {
  return (
    <div className="flex flex-wrap">
      {skills?.map(skill => (
        <SkillButton key={skill} name={skill} />
      ))}
    </div>
  );
}

export default SkillsList;
