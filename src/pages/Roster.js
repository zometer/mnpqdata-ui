import { useParams } from "react-router-dom";
import checkForResponseError from "utils/checkForResponseError";
import Loading from "components/Loading";
import { useCallback, useEffect, useState } from "react";
import { allianceBreadcrumb, HOME, rosterBreadcrumb } from "utils/BreadcrumbEntry";
import { useDispatch } from "react-redux";
import { replaceBreadcrumbs } from "state/slices/uiSlice";
import RosterCard from "components/RosterCard";

const Roster = () => { 
  let { name } = useParams();
  const [player, setPlayer] = useState({});
  const [loading, setLoading] = useState(true);
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
        setBreadcrumbs([HOME, allianceBreadcrumb(res.allianceName), rosterBreadcrumb(name)]);
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

  return (
    <main>
      <h1>Roster: {name}</h1>

      { loading && <Loading/> }

      { Object.keys(player).length > 0 && 
        <section className="content">
          {player.characters.map( (character, index) => 
            <RosterCard key={index} character={character} />
          )}
        </section>
      }

    </main>
  );
}

export default Roster;