import { Link } from "react-router-dom";

function SiteNavLink({href, icon, text}) { 
  return (
    <Link className="siteNavLink" to={href}>
      <span className="siteNavLinkIcon">
        {icon()}
      </span>
      {text}
    </Link>
  );
}
export default SiteNavLink;