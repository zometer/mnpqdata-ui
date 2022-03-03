import { useSelector } from 'react-redux';
import { selectBreadcrumbs } from 'state/slices/uiSlice';


const Breadcrumbs = () => { 
  const items = useSelector((state) => state.ui.breadcrumbs);

  const itemElements = items ? 
      items.map( (item, index) => {
        if (index === items.length - 1) { 
          return <li className="breadcrumb-item active" aria-current="page" key={index}>{item.name}</li>
        } else { 
          return <li className="breadcrumb-item" key={index}><a href={item.href}>{item.name}</a></li>
        }
      })
    : (<></>);
  ;

  return (
    <nav className="breadcrumbs" aria-label="breadcrumb">
      <ol className='breadcrumb'>
        {itemElements}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;