
const BreadcrumbEntry = (name, href) => ({name, href})

export default BreadcrumbEntry ; 
export const HOME = BreadcrumbEntry("Home", "/"); 
export const DASHBOARD = BreadcrumbEntry("Dashboard", "/dashboard"); 
export const ALLIANCE = BreadcrumbEntry("Alliance", "/alliances"); 
export const ALLIANCE_SEARCH = BreadcrumbEntry("Alliance Search", "/search/alliances"); 
export const ROSTER = BreadcrumbEntry("Roster", "/roster"); 

export const allianceBreadcrumb = (allianceName) => (BreadcrumbEntry(allianceName, `/alliances/${allianceName}`));
export const rosterBreadcrumb = (rosterName) => BreadcrumbEntry(rosterName, `/rosters/${rosterName}`);
export const rosterCharBreadcrumb = (rosterName, instanceId) => BreadcrumbEntry(rosterName, `/rosters/${rosterName}/${instanceId}`);
