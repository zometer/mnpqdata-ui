import { useParams } from "react-router-dom";
import checkForResponseError from "utils/checkForResponseError";
import Loading from "components/Loading";
import { useCallback, useEffect, useState } from "react";
import { allianceBreadcrumb, HOME, rosterBreadcrumb } from "utils/BreadcrumbEntry";
import { useDispatch } from "react-redux";
import { replaceBreadcrumbs } from "state/slices/uiSlice";
import RosterCard from "components/RosterCard";
import RosterFilterForm from "components/RosterFilterForm";
import ErrorSection from "components/ErrorSection";

const Roster = () => { 
  let initialFilters = { 
    rarities: [1,2,3,4,5], 
    championStatuses: ["championed", "unchampioned"],
    sortProperty: "displayLevel", 
    sortAscending: false,
    text:""
  }
  let { name } = useParams();
  const [player, setPlayer] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState( initialFilters )
  const [sortProperty, setSortProperty] = useState("level");
  const [error, setError] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState([HOME, rosterBreadcrumb(name)]);

  const rosterApiUrl = window._env.MPQDATA_API_URL + `api/rest/v3/roster/${name}/`;

  const fetchPlayer = useCallback (() => { 
    fetch(rosterApiUrl)
      .then(checkForResponseError)
      .then(res => res.json())
      .then(res => {
        setPlayer(res);
        setLoading(false);
        // setBreadcrumbs([HOME, allianceBreadcrumb(res.allianceName), rosterBreadcrumb(name)]);
      })
      .catch(e => {
        console.log("error", e);
        setLoading(false);
        setPlayer({});
        setError(e.message);
      })
    ;
  }, [name, rosterApiUrl]);

  const dispatch = useDispatch();
  dispatch(replaceBreadcrumbs(breadcrumbs));
  useEffect( () => {
    fetchPlayer();
  }, [fetchPlayer])
  const updateRosterFilters = (filters) => { 
    console.log("filters", filters);
    setFilters(filters);
  }

  console.log("roster.filter", filters);
  let characters = Object.keys(player).length === 0 ? [] : player.characters;
  characters = characters
    .filter( c => filters.rarities.includes(c.rarity))
    .filter( c => filters.championStatuses.includes( c.champion ? "championed" : "unchampioned" ) )
    .filter( c => 
      (filters.text === undefined || filters.text.trim() === "") || 
      (c.name.toLowerCase().indexOf(filters.text.toLowerCase()) >= 0) || 
      (c.subtitle.toLowerCase().indexOf(filters.text.toLowerCase()) >= 0) 
    )
    .sort( (a,b) => 
      filters.sortAscending ? 
        a[filters.sortProperty] > b[filters.sortProperty] : 
        a[filters.sortProperty] < b[filters.sortProperty]
    )
  ;

  return (
    <main>
      <h1>Roster: {name}</h1>

      <RosterFilterForm filterCallback={updateRosterFilters}/>

      { loading && <Loading/> }

      { error && <ErrorSection message={error} />}

      { characters.length > 0 && 
        <section className="content">
          {characters.map( (character, index) => 
            <RosterCard key={index} character={character} />
          )}
        </section>
      }

    </main>
  );
}

export default Roster;