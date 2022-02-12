import logo from 'images/mpqdata-logo-800.png';
import { SearchIcon } from '@heroicons/react/outline'
import 'App.scss';

function HeaderBar() { 
  return (
    <header className='appHeader'>
      <div className='logo'>
        <img src={logo} alt="logo"/>
      </div>
      <form className='headerSearchBar'>
        <input type="text" className='headerSearchInput' placeholder='Search Alliances'/>
        <span className='inputIcon'> 
          <SearchIcon color='#AAA'/>
        </span>
      </form>
    </header>    
  ); 
}
export default HeaderBar;