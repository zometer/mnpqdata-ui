import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gql, useQuery } from "@apollo/client";
import { replaceAllianceName, replaceBreadcrumbs } from "state/slices/uiSlice";
import { ALLIANCE_SEARCH, HOME, allianceBreadcrumb } from "utils/BreadcrumbEntry";
import Loading from 'components/Loading';

const ALLIANCE_QUERY = gql`
query allianceByName($name: String!) {
	alliance: allianceByName(name: $name) { 
		allianceName
		allianceType, 
		allianceSize,
		allianceMaxSize, 
		members { 
			playerName
			allianceRole
		}
	}
}`;

const AllianceMembers = () => { 
  const {name} = useParams();
  const {loading, error, data} = useQuery(ALLIANCE_QUERY, { variables: {name} });
  const dispatch = useDispatch(); 

  const members = data?.alliance?.members || []; 
  const errMsg = data?.errors?.[0]?.message || error?.message || undefined; 

  useEffect( () => {
    dispatch(replaceBreadcrumbs([HOME, ALLIANCE_SEARCH, allianceBreadcrumb(name)]));
    dispatch(replaceAllianceName(name));
  }, [dispatch, name]);

  return (
    <main>
      <h1>Alliance: {name}</h1>

      { loading && <Loading/> }

      <section className="content">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Player</th>
              <th>Member Type</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
              members.map((player, index) => 
                <tr key={player.playerName}>
                  <td>
                    <Link to={"/rosters/" + encodeURIComponent(player.playerName)}>{player.playerName}</Link>
                  </td>
                  <td>{player.allianceRole}</td>
                  <td className="number" > </td>
                </tr>
              )
            }
          </tbody>
        </table>


      </section>
    </main>
  );  
}
export default AllianceMembers;