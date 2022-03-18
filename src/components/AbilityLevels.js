
const AbilityLevels = ({abilityLevels, className}) => { 
  return (
    <div className={`abilityLevels ${className}`}> 
      { abilityLevels.map( (ability, index) => 
        <span key={index} className={`abilityLevel ${ability.color}`}>{ability.level}</span> 
      )}
    </div>
  );
}

export default AbilityLevels;