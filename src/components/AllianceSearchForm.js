import { useDispatch, useSelector } from 'react-redux';
import { replaceSearchName, replaceIncludeFull, replaceIncludePrivate, startAllianceSearch } from 'state/slices/searchSlice';

const AllianceSearchForm = () => {
  const { name, includeFull, includePrivate }  = useSelector((state) => state.search.alliance);
  const dispatch = useDispatch();

  const handleCheckbox = (event, stateUpdater) => {
    dispatch(stateUpdater(event.target.checked));
  }

  const executeSearch = (event) => { 
    event.preventDefault(); 
    dispatch(startAllianceSearch(true));
  }

  return (
    <section>
      <form className="allianceSearchForm" onSubmit={ executeSearch }>
        <fieldset>
          <input
            type="text"
            name="search"
            className='headerSearchInput'
            placeholder='Search Alliances'
            style={{ width: "350px" }}
            onChange={e => dispatch(replaceSearchName(e.target.value))}
            value={name}
          />

          <input id="privateAlliances" type="checkbox" name="privateAlliances" checked={includePrivate} onChange={e => handleCheckbox(e, replaceIncludePrivate)} value="true" />
          <label htmlFor="privateAlliances">Include Private Alliances</label>

          <input id="fullAlliances" type="checkbox" name="fullAlliances" checked={includeFull} onChange={e => handleCheckbox(e, replaceIncludeFull)} value="true" />
          <label htmlFor="fullAlliances">Include Full Alliances</label>
        </fieldset>

        <fieldset className="submit">
          <input type="submit" className="btn btn-sm" value="Search Alliances" />
        </fieldset>
      </form>
    </section>
  );

}
export default AllianceSearchForm; 