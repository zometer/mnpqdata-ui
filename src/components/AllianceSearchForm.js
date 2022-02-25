import { useState } from "react";


const AllianceSearchForm = ({ query, privateAlliances, fullAlliances }) => {
  const [searchQuery, setSearchQuery] = useState(query);
  const [includePrivate, setIncludePrivate] = useState(privateAlliances);
  const [includeFull, setIncludeFull] = useState(fullAlliances);

  const handleCheckbox = (event, stateUpdater) => {
    stateUpdater(event.target.checked);
  }

  return (
    <section>
      <form className="allianceSearchForm">
        <fieldset>
          <input
            type="text"
            name="search"
            className='headerSearchInput'
            placeholder='Search Alliances'
            style={{ width: "350px" }}
            onChange={e => setSearchQuery(e.target.value)}
            value={searchQuery}
          />

          <input id="privateAlliances" type="checkbox" name="privateAlliances" checked={includePrivate} onChange={e => handleCheckbox(e, setIncludePrivate)} value="true" />
          <label htmlFor="privateAlliances">Include Private Alliances</label>

          <input id="fullAlliances" type="checkbox" name="fullAlliances" checked={includeFull} onChange={e => handleCheckbox(e, setIncludeFull)} value="true" />
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