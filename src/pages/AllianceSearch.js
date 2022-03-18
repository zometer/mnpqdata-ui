import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gql, useQuery } from "@apollo/client";
import { replaceBreadcrumbs } from "state/slices/uiSlice";
import AllianceSearchForm from "components/AllianceSearchForm";
import AllianceSearchResults from "components/AlllianceSearchResults";
import { ALLIANCE_SEARCH, HOME } from "utils/BreadcrumbEntry";
import { startAllianceSearch } from "state/slices/searchSlice";

const SEARCH_QUERY = gql`
query searchAlliances($name: String!) {
	alliances: searchAlliances(
		name: $name
		includeFull: true
		includePrivate: true
	) {
		allianceName
		allianceType
		allianceSize
		allianceMaxSize
	}
}
`;

const AllianceSearch = (props) => { 
  const {name, includeFull, includePrivate, startSearch} = useSelector((state) => state.search.alliance); 
  const dispatch = useDispatch();
  const {loading, error, data} = useQuery(SEARCH_QUERY, {
    variables: { name }, 
    skip: ! startSearch
  });

  useEffect( () => {
    dispatch(replaceBreadcrumbs([HOME, ALLIANCE_SEARCH]));
    dispatch(startAllianceSearch(false));
  }, [dispatch]);

  const errMsg = data?.errors?.[0]?.message || error?.message || undefined;
  const results = data?.alliances || []; 

  return (
    <main>
      <h1>Alliance Search</h1>
      <AllianceSearchForm />
      <AllianceSearchResults results={results} loading={loading} error={errMsg}/>
    </main>
  );
}

export default AllianceSearch;
