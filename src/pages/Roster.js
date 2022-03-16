import { useParams } from "react-router-dom";
import checkForResponseError from "utils/checkForResponseError";
import Loading from "components/Loading";
import { useCallback, useEffect, useState } from "react";
import { allianceBreadcrumb, HOME, rosterBreadcrumb } from "utils/BreadcrumbEntry";
import { useDispatch, useSelector } from "react-redux";
import { replaceAllianceName, replaceBreadcrumbs } from "state/slices/uiSlice";
import RosterCard from "components/RosterCard";
import RosterFilterForm from "components/RosterFilterForm";
import ErrorSection from "components/ErrorSection";

const Roster = () => { 
  let { name } = useParams();
  const [player, setPlayer] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const filter = useSelector( (state) => state.ui.roster.filter );
  const allianceName = useSelector( (state) => state.ui.allianceName );
  const dispatch = useDispatch();
  const rosterApiUrl = window._env.MPQDATA_API_URL + `api/rest/v1/rosters/${name}`;

  const fetchPlayer = useCallback (() => { 
    fetch(rosterApiUrl)
      .then(checkForResponseError)
      .then(res => res.json())
      .then(res => {
        setPlayer(res);
        setLoading(false);
        dispatch(replaceAllianceName(res.allianceName));
      })
      .catch(e => {
        console.log("error", e);
        setLoading(false);
        setPlayer({});
        setError(e.message);
      })
    ;
  }, [dispatch, rosterApiUrl]);

  useEffect( () => {
    fetchPlayer();
    console.log("fetching"); 
  }, [fetchPlayer])

  // Breadcrumbs
  useEffect( () => { 
    const breadcrumbs = (allianceName) ? 
      [HOME, allianceBreadcrumb(allianceName), rosterBreadcrumb(name)] : 
      [HOME, rosterBreadcrumb(name)]
    ;
    dispatch(replaceBreadcrumbs( breadcrumbs));
  }, [dispatch, allianceName, name]);

  let characters = Object.keys(player).length === 0 ? [] : player.characters;
  characters = characters
    .filter( c => filter.rarities.includes(c.rarity))
    .filter( c => filter.championStatuses.includes( c.champion ? "championed" : "unchampioned" ) )
    .filter( c => 
      (filter.text === undefined || filter.text.trim() === "") || 
      (c.name.toLowerCase().indexOf(filter.text.toLowerCase()) >= 0) || 
      (c.subtitle.toLowerCase().indexOf(filter.text.toLowerCase()) >= 0) 
    )
    .sort( (a,b) => 
    filter.sortAscending ? 
        a[filter.sortProperty] > b[filter.sortProperty] : 
        a[filter.sortProperty] < b[filter.sortProperty]
    )
  ;

  return (
    <main>
      <h1>Roster: {name}</h1>

      <RosterFilterForm />

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