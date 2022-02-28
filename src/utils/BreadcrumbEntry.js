
const BreadcrumbEntry = (name, href) => ({name, href})

export default BreadcrumbEntry ; 
export const HOME = BreadcrumbEntry("Home", "/"); 
export const DASHBOARD = BreadcrumbEntry("Dashboard", "/dashboard"); 
export const ALLIANCE = BreadcrumbEntry("Alliance", "/alliance"); 
export const ALLIANCE_SEARCH = BreadcrumbEntry("Alliance Search", "/search/alliance"); 
export const ROSTER = BreadcrumbEntry("Roster", "/roster"); 

export const allianceBreadcrumb = (allianceName) => (BreadcrumbEntry(allianceName, `/alliance/${allianceName}`));
export const rosterBreadcrumb = (rosterName) => BreadcrumbEntry(rosterName, `/roster/${rosterName}`);
export const rosterCharBreadcrumb = (rosterName, instanceId) => BreadcrumbEntry(rosterName, `/roster/${rosterName}/${instanceId}`);
