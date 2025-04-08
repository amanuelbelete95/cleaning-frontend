import {
    createBrowserRouter,
  } from "react-router-dom";
  import Layout from "./components/layout/Layout";
  import Home from "./components/home/Home";
  import EventsList, { loader as eventLoader } from "./components/events/EventsList";
  import EventDetail from "./components/events/EventDetail";
  import Contacts from "./components/contacts/Contacts";
  import TeamsLayout from "./components/teams/index";
  import TeamList from "./components/teams/TeamList";
  import TeamDetail from "./components/teams/awareness-team/TeamDetail";
  import NoMatch from "./components/nomatch/NoMatch";
  import EventNew from "./components/events/EventNew";
  
  export const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "events",
          children: [
            { index: true, element: <EventsList />, loader: eventLoader },
            {path: "new", element: <EventNew/>},
            { path: "detail/:id", element: <EventDetail /> },
          ],
        },
        {
          path: "teams",
          element: <TeamsLayout />,
          children: [
            { index: true, element: <TeamList /> },
            { path: ":teamName", element: <TeamDetail /> },
          ],
        },
        { path: "contact", element: <Contacts /> },
        { path: "*", element: <NoMatch /> },
      ],
    },
  ]);
  