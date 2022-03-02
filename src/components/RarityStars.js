import { StarIcon as StartIconOutline } from "@heroicons/react/outline";
import { StarIcon as StartIconSolid } from "@heroicons/react/solid";

const RarityStars = ({rarity, size, className}) => { 
  const maxStars = 5; 
  const stars = [];
  for (let i=0; i<maxStars; i++) { 
    let star = i < rarity ? StartIconSolid : StartIconOutline;
    stars.push(<span key={i} className="star">{star()}</span>);
  }
  return (
    <div className={className}>
      {stars}
    </div>
  );

}; 

export default RarityStars;