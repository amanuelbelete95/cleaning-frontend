import Home from './components/home/Home';
import Works from './components/works/Works';
import Contacts from './components/contacts/Contacts';
import Teams from './components/teams/Teams';
import NoMatch from './components/nomatch/NoMatch';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TeamDetail from './components/teams/awareness-team/TeamDetail';
import Layout from './components/Layout';
import './App.css';



function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home />}/>           
        <Route path='work' element={<Works />}>
            <Route index element={<TeamDetail/>} />
        </Route>  
        <Route  path='team'   element={<Teams />} />
        <Route  path='contact'  element={<Contacts />} />
        <Route  path="team/:teamId/detail"   element={<TeamDetail/>} />  
        <Route path='*'  element={<NoMatch />} />
      </Route>
    </Routes> 
  </BrowserRouter> 

  );
}

export default App;
