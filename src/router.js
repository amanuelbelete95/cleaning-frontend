import {
  createBrowserRouter,
} from "react-router-dom";
import Contacts from "./components/contacts/Contacts";
import EventDetail, { loader as eventDetailLoader } from "./components/events/EventDetail";
import EventsList, { loader as eventLoader } from "./components/events/EventsList";
import Home from "./components/home/Home";
import Layout from "./components/layout/Layout";
import NoMatch from "./components/nomatch/NoMatch";

// Admin
import AdminDashboard from "./pages/admin/AdminDashBoard";
import AdminRoute from "./pages/admin/AdminRoute";
import CreateEventsPage from "./pages/admin/CreateEventsPage";
import LoginPage from "./pages/admin/LoginPage";
import ImportSettings from "./components/settings/ImportSettings";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <LoginPage /> },

  // Admin pages,
      {
        path: "/admin",
        element: <AdminRoute />,
        children: [
          { path: "dashboard", element: <AdminDashboard />, },
          { path: "events/create", element: <CreateEventsPage /> },
          // { path: "events/edit/:id", element: <EditEventPage /> },
        ],
      },
      {
        path: "events",
        children: [
          { index: true, element: <EventsList />, loader: eventLoader },
          // { path: "new", element: <EventNew /> },
          { path: "detail/:id", element: <EventDetail />, loader: eventDetailLoader },
        ],
      },
       {
        path: "settings", element:<ImportSettings/>
       },
      { path: "contact", element: <Contacts /> },
      { path: "*", element: <NoMatch /> },
    ],
  },
]);
