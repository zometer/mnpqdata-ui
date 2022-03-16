
const AbilityLevels = ({abilities}) => { 
  let displayAbilities = []; 
  abilities
    .filter( a => ! Boolean(a.abilitySet))
    .forEach(a => {
      displayAbilities.push(a);    
    })
  ;

  return (
    <div className="abilities right"> 
      { displayAbilities.map( (ability, index) => 
        <span key={index} className={`abilityLevel ${ability.color}`}>{ability.level}</span> 
      )}
    </div>
  );
}

export default AbilityLevels;