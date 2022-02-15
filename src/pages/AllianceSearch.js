import AllianceSearchForm from "components/AllianceSearchForm";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AllianceSearchResults from "./AlllianceSearchResults";

const AllianceSearch = (props) => { 
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shouldSearch, setShouldSearch] = useState( searchParams.getAll("search").length > 0 );
  const searchApiUrl = window._env.MPQDATA_API_URL + "api/rest/v3/search/alliance/";

  const searchAlliances = (searchQuery, includeFull, includePrivate) => { 
    setLoading(true);
    includeFull = (includeFull === undefined) ? false : includeFull;
    includePrivate = (includePrivate === undefined) ? false : includePrivate;
    let params = new URLSearchParams({"q": searchQuery, "includeFull": includeFull, "includePrivate": includePrivate});
    let url = new URL(searchApiUrl); 
    url.search = params.toString(); 
    fetch(url)
      .then(res => res.json())
      .then(res => { 
        setResults(res);
        setLoading(false);
      })
    ;
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
    <>
      <h1>Alliance Search</h1>
      <AllianceSearchForm query={searchParams.getAll("search")} fullAlliances={includeFull} privateAlliances={includePrivate}/>
      <AllianceSearchResults results={results} loading={loading}/>
    </>
  );
}
export default AllianceSearch;