import AbilityLevels from "./AbilityLevels";
import RarityStars from "./RarityStars";

const RosterCard = ({character}) => { 
  return (
    <div className="card" key={character.instanceId} 
      style={{backgroundImage: `url("${character.imageUrlMedium}")`,}}
    >
      <section className="cardCharInfo">
        <div className="name left">{character.name}</div>
        <AbilityLevels abilities={character.abilities} />
        <RarityStars rarity={character.rarity} className="rarity left" />
        <div className="level right">Level: {character.displayLevel}</div>
        <div className="subtitle left">{character.subtitle}</div>
        <div className="champion right"> {character.champion && 'CHAMPION'} </div>
      </section>
    </div>
  ); 
}; 

export default RosterCard; 