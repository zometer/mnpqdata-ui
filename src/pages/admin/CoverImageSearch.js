import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "components/Loading";
import checkForResponseError from "utils/checkForResponseError";

function CoverImageSearch() {
  const { coverId } = useParams();
  const [cover, setCover] = useState({});
  const [error, setError] = useState();
  const [shouldSearchCover, setShouldSearchCover] = useState(true);
  const [shouldSearchImages, setShouldSearchImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [series, setSeries] = useState("");
  const [year, setYear] = useState("");
  const [issue, setIssue] = useState("");
  const [remoteApi, setRemoteApi] = useState("MARVEL");
  const [issueId, setIssueId] = useState();
  const [coverImages, setCoverImages] = useState([]);
  const navigate = useNavigate();

  const coverApiUrl = window._env.MPQDATA_API_URL + "api/rest/v1/covers/" + coverId;
  const searchApiUrl = window._env.MPQDATA_API_URL + "api/rest/v1/covers/images/search";

  const fetchCover = () => {
    setLoading(true);
    setShouldSearchCover(false);
    console.log("cover lookup", coverApiUrl);
    fetch(coverApiUrl)
      .then(checkForResponseError)
      .then(res => res.json())
      .then(res => {
        setCover(res);
        updateForm(res.series, res.seriesStartYear, res.issue);
        setLoading(false);
        setShouldSearchCover(false);
        setShouldSearchImages(true);
        //searchCoverImages(res);
      })
      .catch(e => {
        console.log("error", e);
        setLoading(false);
        setCover({});
        setError(e.message);
        setShouldSearchCover(false);
      })
      ;
  }

  const searchCoverImages = () => {
    setShouldSearchImages(false);
    const data = {"series":series, "seriesStartYear": year, "issue": issue, "remoteApi": remoteApi, "issueId": issueId};
    console.log("data", data);
    console.log("searchApiUrl", searchApiUrl);
    setLoading(true);
    fetch(searchApiUrl,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
      .then(checkForResponseError)
      .then(res => res.json())
      .then(res => {
        setCoverImages(res);
        console.log("coverImages", coverImages);
        setLoading(false);
      })
      .catch(e => {
        console.log("error", e);
        setLoading(false);
        setError(e.message);
      })
  }

  const applyCoverImage = (cover, image) => {
    let newCover = {
      ...cover,
      imageUrlMedium: image.imageUrlMedium,
      imageUrlLarge: image.imageUrlLarge,
      imageUrlSmall: image.imageUrlSmall
    }

    newCover[image.remoteApi.toLowerCase() + "IssueId"] = image.issueId;
    newCover.complete = true;

    console.log("applyCoverImage", newCover);
    const updateUrl = window._env.MPQDATA_API_URL + "api/rest/v1/covers/" + newCover.characterCoverId;
    fetch(updateUrl,
      {
        method: "PUT",
        body: JSON.stringify(newCover),
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
      .then(checkForResponseError)
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        navigate("/admin/covers/unprocessed");
      })
      .catch(e => {
        console.log("error", e);
        setLoading(false);
        setError(e.message);
      })

  }

  const updateForm = (series, year, issue) => { 
    setSeries(series); 
    setYear(year);
    setIssue(issue);
  }

  if (shouldSearchCover) {
    fetchCover();
  }

  if (shouldSearchImages) { 
    searchCoverImages();
  }

  return (
    <main>
      <h1>Select Cover Image: {cover.mpqCharacterId}</h1>

      <section>
        <form className="coverImageSearchForm" onSubmit={e => e.preventDefault}>
          <fieldset className="issueFields">
            <input
              type="text"
              id="seriesName"
              name="seriesName"
              placeholder='Series Name'
              onChange={e => setSeries(e.target.value)}
              value={series}
            />

            <input
              type="text"
              name="seriesYear"
              id="seriesYear"
              style={{ width: "6ex" }}
              onChange={e => setYear(e.target.value)}
              value={year}
            />

            <input
              type="text"
              name="issue"
              id="issue"
              style={{ width: "6ex" }}
              onChange={e => setIssue(e.target.value)}
              value={issue}
            />

          </fieldset>

          <fieldset className="issueIdFields">
            <select className="form-select form-select-sm" onChange={e => setRemoteApi(e.target.value)} value={remoteApi}>
              <option>Select an API to query by Issue Id</option>
              <option value="MARVEL">Marvel API</option>
              <option value="GCD">GCD API</option>
            </select>

            <input
              type="text"
              name="issueId"
              id="issueId"
              style={{ width: "20ex" }}
              onChange={e => setIssueId(e.target.value)}
              placeholder={`${remoteApi} API Issue Id`}
            />
          </fieldset>

          <fieldset className="submit">
            <input type="submit" className="btn btn-sm" value="Search Cover Images" />
          </fieldset>
        </form>
      </section>

      { loading && <Loading /> }

      {error &&
        <section className="content">
          <p>{error.message}</p>
        </section>
      }

      { coverImages.length > 0 && 
        <section className="content comment">
        {coverImages.map((image, index) =>
          <div className="coverCard" key={index} onClick={() => applyCoverImage(cover, image)}>
            <img src={image.imageUrlMedium} referrerPolicy="no-referrer" alt={`${image.remoteApi}: ${image.issueId}`}/>
            <p>{image.remoteApi}</p>
          </div>
        )}
      </section>
    }
    </main>
  )
}

export default CoverImageSearch;