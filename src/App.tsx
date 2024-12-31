import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Works from './components/works/Works';
import TeamsLayout from './components/teams/index';
import Contacts from './components/contacts/Contacts';
import TeamDetail from './components/teams/awareness-team/TeamDetail';
import TeamList from './components/teams/TeamList';
import NoMatch from './components/nomatch/NoMatch';
import Layout from './components/layout/Layout';
import './components/home/styles.css'
import "./App.css"



function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Works />} />
          <Route path="team" element={<TeamsLayout />}>
            <Route index element={<TeamList />} />
            <Route path=":teamName" element={<TeamDetail />} />
          </Route>
          <Route path="contact" element={<Contacts />} />
          <Route path="*" element={<NoMatch />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
