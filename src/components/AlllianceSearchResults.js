import { ScaleLoader } from "react-spinners";
import variables from 'App.scss'
import { Link } from "react-router-dom";

const AllianceSearchResults = ({results, loading, error}) => { 

  if (loading) { 
      return ( 
        <section className="content loading"> 
          <ScaleLoader color={variables.spinnerColor} loading={loading} />
        </section>
      );
  }

  if (error) { 
    return (
      <section className="content"> 
        <div className="alert alert-danger" role="alert"> {error} </div>
      </section>
    )
  }

  if (results.length === 0) { 
    return (
        <section className="content"> <p> No results found.</p></section>
    );
  }

  return (
    <section className="content">
      <table>
        <thead>
          <tr>
            <th>Alliance Name</th>
            <th>Visibility</th>
            <th className="number">Members</th>
          </tr>
        </thead>
        <tbody>
          {
            results.map((result, index) => 
              <tr className={"row" + (index % 2)} key={result.allianceName}>
                <td>
                  <Link to={"/alliances/" + encodeURIComponent(result.allianceName)}>{result.allianceName}</Link>
                </td>
                <td>{result.allianceType}</td>
                <td className="number" >{result.allianceSize} / {result.allianceMaxSize} </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </section>
  ); 

}
export default AllianceSearchResults;