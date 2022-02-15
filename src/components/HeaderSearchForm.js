import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline'
import 'App.scss';

const HeaderSearchForm = () => { 
  const [search, setSearch] = useState();

  return (
    <form className='headerSearchBar' action="/search/alliance">
      <input 
        type="text" 
        name="search" 
        className='headerSearchInput' 
        placeholder='Search Alliances' 
        onChange={e => setSearch(e.target.value)}
        value={search}
      />
      <input type="hidden" name="privateAlliances" value="true"/>
      <input type="hidden" name="fullAlliances" value="true"/>
      <span className='inputIcon'> 
        <SearchIcon color='#AAA'/>
      </span>
    </form>
  );
}
export default HeaderSearchForm;