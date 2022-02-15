import { ScaleLoader } from "react-spinners";
import variables from 'App.scss'
import { useState } from "react";
import { useParams } from "react-router-dom";

const AllianceMemebers = () => { 
  const [loading, setLoading] = useState(true);
  const [alliance, setAlliance] = useState({});
  const [lookupName, setLookupName] = useState();
  const {name} = useParams();
  const allianceApiUrl = window._env.MPQDATA_API_URL + "api/rest/v1/alliance/" + name;

  const lookupAlliance = () => { 
    let url = new URL(allianceApiUrl); 
    setLookupName(name);
    fetch(url)
      .then(res => res.json())
      .then(res => { 
        setAlliance(res);
        setLoading(false);
      })
    ;
  }

  if (lookupName === undefined || lookupName === null) { 
    lookupAlliance();
  }

  if (loading) { 
      return ( 
        <section className="content loading"> 
          <ScaleLoader color={variables.spinnerColor} loading={loading} />
        </section>
      );
  }

  if (Object.keys(alliance).length === 0) { 
    return (
      <section className="content"> <p> No results found.</p></section>
    );
  }

  return (
    <>
      <h1>Alliance: {name}</h1>
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
              alliance.members.map((player, index) => 
                <tr key={player.playerName}>
                  <td>
                    <a href={"/roster/" + encodeURIComponent(player.playerName)}>{player.playerName}</a>
                  </td>
                  <td>{player.allianceRole}</td>
                  <td className="number" > </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </section>
    </>
  );  
}
export default AllianceMemebers;