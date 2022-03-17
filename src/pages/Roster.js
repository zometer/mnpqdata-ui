import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gql, useQuery } from '@apollo/client';
import { allianceBreadcrumb, HOME, rosterBreadcrumb } from "utils/BreadcrumbEntry";
import { replaceBreadcrumbs } from "state/slices/uiSlice";
import ErrorSection from "components/ErrorSection";
import Loading from "components/Loading";
import RosterCard from "components/RosterCard";
import RosterFilterForm from "components/RosterFilterForm";

const QUERY = gql`
query playerWithRosterByName ($name: String!) {
	player: playerByName(name: $name) { 
		playerName
		allianceName
		allianceRole
		roster { 
			instanceId
			mpqCharacterKey
			name
			subtitle
			rarity
      displayLevel
			champion
			imageUrlMedium
			abilityLevels { 
				ordinalPosition
			  color
				level
			}
		}
	}
}  
`;

const Roster = () => { 
  let { name } = useParams();
  const filter = useSelector( (state) => state.ui.roster.filter );
  const allianceName = useSelector( (state) => state.ui.allianceName );
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(QUERY, { variables: {name} });
  const player = (data && data.player) ? data.player : {}; 
  console.log( {loading, error, data}); 

  // Breadcrumbs
  useEffect( () => { 
    const breadcrumbs = (allianceName) ? 
      [HOME, allianceBreadcrumb(allianceName), rosterBreadcrumb(name)] : 
      [HOME, rosterBreadcrumb(name)]
    ;
    dispatch(replaceBreadcrumbs( breadcrumbs));
  }, [dispatch, allianceName, name]);

  let characters = Object.keys(player).length === 0 ? [] : player.roster;
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

  const errMsg = data?.errors?.[0]?.message || error?.message || undefined;

  return (
    <main>
      <h1>Roster: {name}</h1>

      <RosterFilterForm />

      { loading && <Loading/> }

      { errMsg && <ErrorSection message={errMsg} />}

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
