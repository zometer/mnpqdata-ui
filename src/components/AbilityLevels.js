
const AbilityLevels = ({abilities}) => { 
  let colors = [];
  let displayAbilities = []; 
  abilities
    .filter( a => ! Boolean(a.abilitySet))
    .forEach(a => {
      console.log("displayAbility", a);
      displayAbilities.push(a);    
    })
  ;

  return (
    <div className="abilities right"> 
      { displayAbilities.map( (ability, index) => 
        <span className={`abilityLevel ${ability.color}`}>{ability.abilityLevel}</span> 
      )}
    </div>
  );
}

export default AbilityLevels;