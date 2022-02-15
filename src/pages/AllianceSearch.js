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
    console.log(searchQuery, includePrivate, includeFull);
    let params = new URLSearchParams({"q": searchQuery, "includeFull": includeFull, "includePrivate": includePrivate});
    let url = new URL(searchApiUrl); 
    url.search = params.toString(); 
    console.log("url", url);
    fetch(url)
      .then(res => res.json())
      .then(res => { 
        setResults(res);
        setLoading(false);
      })
    ;
  } 

  const resolveBoolean = (input) => { 
      if (input === undefined || input === null) { 
          return false; 
      }
      console.log("input", input);
      return new Boolean(input).valueOf();
  }

  const includeFull = resolveBoolean( searchParams.get("fullAlliances") );
  const includePrivate = resolveBoolean( searchParams.get("privateAlliances") );

  if (searchParams.get("search") && shouldSearch) { 
    setShouldSearch(false); 
    searchAlliances(searchParams.get("search"), includeFull, includePrivate);    
  }

  console.log("search.includeFull", includeFull); 
  console.log("search.includePrivate", includePrivate); 

  return (
    <>
      <h1>Alliance Search</h1>
      <AllianceSearchForm query={searchParams.getAll("search")} fullAlliances={includeFull} privateAlliances={includePrivate}/>
      <AllianceSearchResults results={results} loading={loading}/>
    </>
  );
}
export default AllianceSearch;