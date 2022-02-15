
const AllianceSearchResults = ({results, loading}) => { 
  console.log("results", results);

  if (loading) { 
      return <section className="content"> <p>Loading...</p></section>
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
                  <a href={"/alliance/" + encodeURIComponent(result.allianceName)}>{result.allianceName}</a>
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