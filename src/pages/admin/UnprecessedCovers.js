import { useState } from "react";
import Loading from "components/Loading";

function UnprocessedCovers() {
  const [covers, setCovers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [shouldSearch, setShouldSearch] = useState(true);

  const searchApiUrl = window._env.MPQDATA_API_URL + "api/rest/v1/covers/unprocessed";

  const fetchUnprocessedCovers = () => {
    setLoading(true);
    setShouldSearch(false);
    console.log("image search uri", searchApiUrl);
    fetch(searchApiUrl)
      .then(checkForError)
      .then(res => res.json())
      .then(res => res.sort((e1, e2) => e1.mpqCharacterId > e2.mpqCharacterId))
      .then(res => {
        setCovers(res);
        setLoading(false);
        setShouldSearch(false);
      })
      .catch(e => {
        console.log("error", e);
        setLoading(false);
        setCovers([]);
        setError(e.message);
        setShouldSearch(false);
      })
      ;
  }

  const checkForError = (res) => {
    if (res.ok) {
      return res;
    }
    throw Error("Error fetching unprocessed covers.");
  }

  if (shouldSearch) {
    fetchUnprocessedCovers();
  }

  if (loading) {
    return <Loading heading="Unprocessed Covers" />
  }

  if (error) {
    return (<>
      <section className="content">
        <p>{error.message}</p>
      </section>
    </>)
  }

  return (
    <main>
      <h1>Unprocessed Covers</h1>

      <section className="content">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Character Id</th>
              <th>Series</th>
              <th>Series Year</th>
              <th className="number">Issue</th>
            </tr>
          </thead>
          <tbody>
            {
              covers.map((cover, index) =>
                <tr key={index}>
                  <td>
                    <a href={"/admin/covers/" + cover.characterCoverId + "/images"}>{cover.mpqCharacterId}</a>
                  </td>
                  <td>
                    <a href={"/admin/covers/" + cover.characterCoverId + "/images"}>{cover.series}</a>
                  </td>
                  <td>
                    <a href={"/admin/covers/" + cover.characterCoverId + "/images"}>{cover.seriesStartYear}</a>
                  </td>
                  <td className="number">
                    <a href={"/admin/covers/" + cover.characterCoverId + "/images"}>{cover.issue}</a>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </section>
    </main>
  )
}
export default UnprocessedCovers;
