
function SiteNavLink(props) { 
  return (
    <a className="siteNavLink" href={props.href}> 
      <span className="siteNavLinkIcon">
        {props.icon()}
      </span>
      {props.text}
    </a>
  );
}
export default SiteNavLink;