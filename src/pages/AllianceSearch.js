import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectBreadcrumbs } from "state/slices/uiSlice";
import { replaceBreadcrumbs } from "state/slices/uiSlice";
import AllianceSearchForm from "components/AllianceSearchForm";
import AllianceSearchResults from "components/AlllianceSearchResults";
import { ALLIANCE_SEARCH, HOME } from "utils/BreadcrumbEntry";

let breadcrumbs = [];

const AllianceSearch = (props) => { 
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [shouldSearch, setShouldSearch] = useState( searchParams.getAll("search").length > 0 );
  const searchApiUrl = window._env.MPQDATA_API_URL + "api/rest/v3/search/alliance/";

  const dispatch = useDispatch();
  useEffect( () => {
    dispatch(replaceBreadcrumbs([HOME, ALLIANCE_SEARCH]))    
  }, []);

  useSelector( (state) => {
    console.log("selector", state);
    return state;
  });

  const searchAlliances = (searchQuery, includeFull, includePrivate) => { 
    setLoading(true);
    includeFull = (includeFull === undefined) ? false : includeFull;
    includePrivate = (includePrivate === undefined) ? false : includePrivate;
    let params = new URLSearchParams({"q": searchQuery, "includeFull": includeFull, "includePrivate": includePrivate});
    let url = new URL(searchApiUrl); 
    url.search = params.toString(); 
    fetch(url)
      .then(checkForError)
      .then(res => res.json())
      .then(res => { 
        setResults(res);
        setLoading(false);
      })
      .catch(e => {
        console.log("error", e);
        setLoading(false);
        setResults([]);
        setError(e.message);
      })
    ;
  } 

  const checkForError = (res) => { 
    if (res.ok) {
      return res;
    }
    throw Error("Error querying alliances.")
  }

  const resolveBoolean = (input) => { 
      return input === 'true';
  }

  const includeFull = resolveBoolean( searchParams.get("fullAlliances") );
  const includePrivate = resolveBoolean( searchParams.get("privateAlliances") );

  if (searchParams.get("search") && shouldSearch) { 
    setShouldSearch(false); 
    searchAlliances(searchParams.get("search"), includeFull, includePrivate);    
  }

  return (
    <main>
      <h1>Alliance Search</h1>
      <AllianceSearchForm query={searchParams.getAll("search")} fullAlliances={includeFull} privateAlliances={includePrivate}/>
      <AllianceSearchResults results={results} loading={loading} error={error}/>
    </main>
  );
}
export default AllianceSearch;