import HeaderBar from 'components/HeaderBar';
import SiteNav from 'components/SiteNav';
import AllianceHome from 'pages/AllianceHome';
import AllianceSearch from 'pages/AllianceSearch';
import AllianceMemebers from 'pages/AlllianceMembers';
import UnprocessedCovers from 'pages/admin/UnprecessedCovers';
import CoverImageSearch from 'pages/admin/CoverImageSearch';
import NotFound from 'pages/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Provider } from 'react-redux';
import store from 'state/store';
import Breadcrumbs from 'components/Breadcrumbs';
import Roster from 'pages/Roster';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <HeaderBar />
        <SiteNav />
        <Breadcrumbs/>
        <BrowserRouter>
          <Routes>
            <Route path="/admin/covers/unprocessed" element={<UnprocessedCovers />} />
            <Route path="/admin/covers/:coverId/images" element={<CoverImageSearch />} />
            <Route path="/alliance/" element={<AllianceHome />} />
            <Route path="/alliance/:name" element={<AllianceMemebers />} />            
            <Route path="/roster/:name" element={<Roster />} />
            <Route path="/search/">
              <Route path="alliance" element={<AllianceSearch />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
