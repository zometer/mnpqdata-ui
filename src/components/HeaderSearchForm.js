import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SearchIcon } from '@heroicons/react/outline'
import { replaceIncludeFull, replaceIncludePrivate, replaceSearchName, startAllianceSearch } from 'state/slices/searchSlice';
import 'App.scss';
import { useNavigate } from 'react-router-dom';

const HeaderSearchForm = () => { 
  const [search, setSearch] = useState('');
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const executeSearch = (event) => { 
    event.preventDefault(); 

    dispatch(startAllianceSearch(true)); 
    dispatch(replaceSearchName(search));
    dispatch(replaceIncludeFull(true));
    dispatch(replaceIncludePrivate(true));

    setSearch('');
    navigate('/search/alliances')
  }; 

  return (
    <form className='headerSearchBar' onSubmit={ executeSearch }>
      <input 
        type="text" 
        name="search" 
        className='headerSearchInput' 
        placeholder='Search Alliances' 
        onChange={e => setSearch(e.target.value)}
        value={search}
      />
      <span className='inputIcon'> 
        <SearchIcon color='#AAA'/>
      </span>
    </form>
  );
}
export default HeaderSearchForm;