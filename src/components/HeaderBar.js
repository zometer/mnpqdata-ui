import logo from 'images/mpqdata-logo-800.png';
import HeaderSearchForm from './HeaderSearchForm';

const HeaderBar = () => { 
  return (
    <header className='appHeader'>
      <div className='logo'>
        <img src={logo} alt="logo"/>
      </div>
      <HeaderSearchForm />
    </header>    
  ); 
}

export default HeaderBar;