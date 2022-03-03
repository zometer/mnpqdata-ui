import { useEffect, useState } from "react";
import RarityStars from "./RarityStars";

const RosterFilterForm = ({ filterCallback }) => {
  const [selectedRarities, setSelectedRarities] = useState({1:true,2:true,3:true,4:true,5:true});
  const [championStatuses, setChampionStatuses] = useState({championed: true, unchampioned: true});
  const [sortProperty, setSortProperty] = useState("displayLevel"); 
  const [sortAscending, setSortAscending] = useState(false);
  const [text, setText] = useState("");

  const rarities = [1,2,3,4,5];

  const toggleProperty = (origMap, property, value, stateSetter) => {
    let updated = {...origMap}
    updated[property] = value;
    stateSetter(updated);
  }
  const runFilterCallback = () => { 
    let selectedRarityValues = Object.keys(selectedRarities).filter( k => selectedRarities[k] ).map(k => Number(k));
    let selectedChampStatuses = Object.keys(championStatuses).filter( k => championStatuses[k] );
    let filters = {rarities: selectedRarityValues, championStatuses: selectedChampStatuses, sortProperty, sortAscending, text};
    console.log("filterCallback", championStatuses);
    filterCallback(filters);
  }

  useEffect( () => {
    runFilterCallback();
  }, [selectedRarities, championStatuses, sortProperty, sortAscending, text]);

  return (
    <section className="content rosterFilter">
      <form className="rosterFilterForm" onSubmit={(e) => e.preventDefault()}> 
        <fieldset className="filterFieldset">
          <label className="filterLabel">Filter: </label> 
          <input className="form-control textFilterInput" type="text" placeholder="Filter Text" value={text} onChange={(e) => setText(e.target.value)} />
            <div className="btn-group rarityFilter">
              <button type="button" className="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Rarity
              </button>
              <ul className="dropdown-menu">
                {rarities.map((rarity, index) =>
                  <li key={rarity}>
                    <input
                      id={`rarity${rarity}`}
                      name={`rarity${rarity}`}
                      type="checkbox"
                      className="rarityCheckbox"
                      onChange={() => toggleProperty(selectedRarities, rarity, !selectedRarities[rarity], setSelectedRarities)}
                      checked={selectedRarities[rarity]}
                    />
                    <label htmlFor={`rarity${rarity}`}>
                      <RarityStars rarity={rarity} />
                    </label>
                  </li>
                )}
              </ul>
            </div>

          <div className="btn-group championFilter">
            <button type="button" className="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Champion Status
            </button>
            <ul className="dropdown-menu">
              {Object.keys(championStatuses).map( (champStatus, index) => 
                <li key={index}>
                  <input 
                    id={`champStatus${champStatus}`} 
                    name={`champStatus${champStatus}`} 
                    type="checkbox"
                    className="champStatusCheckbox" 
                    onChange={() => toggleProperty(championStatuses, champStatus, !championStatuses[champStatus], setChampionStatuses)}
                    checked={championStatuses[champStatus]}
                  /> 
                  <label className="champStatusLabel" htmlFor={`champStatus${champStatus}`}>
                    {champStatus.charAt(0).toUpperCase() + champStatus.substring(1)}
                  </label>
                </li>
              )}
            </ul>
          </div>
        </fieldset>

        <fieldset className="sortFieldset">
          <label className="sortByLabel">Sort by:</label>
          <select className="form-select form-select-sm" name="sortProperty" value={sortProperty} onChange={(e) => setSortProperty(e.target.value)} >
            <option value="displayLevel">Level</option>
            <option value="name">Name</option>
          </select>

          <select className="form-select form-select-sm" name="sortAscending" value={sortAscending} onChange={(e) => setSortAscending(e.target.value)}>
            <option value={true}>Ascending</option>
            <option value={false}>Descending</option>
          </select>
        </fieldset>
      </form>
    </section>
  );

}
export default RosterFilterForm; 