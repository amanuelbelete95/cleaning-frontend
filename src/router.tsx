import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "./components/users/RegisterPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Contacts from "./components/contacts/Contacts";
import EventDetail, { loader as eventDetailLoader } from "./components/events/EventDetail";
import EventEdit from "./components/events/EventEdit";
import EventNew from "./components/events/EventNew";
import EventList from "./components/events/components/EventList";
import EventLayout from "./components/events/EventLayout";
import RoleBasedHome from "./components/home/RoleBasedHome";
import Layout from "./components/layout/Layout";
import NoMatch from "./components/nomatch/NoMatch";
import RegisterEvents from "./components/register-events/RegeisterEvents";
import UserList from "./components/users/components/UserList";
import UserDetail, { loader as userDetailLoader } from "./components/users/components/UserDetail";
import UserLogInRegisterLayout from "./components/users/components/UserLoginLayout";
import LogInPage from "./components/users/LogInPage";
import UserUpdatePage from "./components/users/components/UpdateUser"


const ROUTE_PATHS = {
  HOME: "/",
  EVENTS: "/events",
  USERS: "/users",
  REGISTER_EVENTS: "/register-events",
  CONTACT: "/contact",
  NOT_FOUND: "*",
  USER_EVENTS: "/events",
  USER_PROFILE: "/profile",
};

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.HOME,
    element:
      <ProtectedRoute redirectPath="/login">
        <Layout />,
      </ProtectedRoute >,
    children: [
      { index: true, element: <RoleBasedHome /> },
      {
        path: ROUTE_PATHS.EVENTS,
        element: <EventLayout />,
        children: [
          { index: true, element: <EventList /> },
          { path: "new", element: <EventNew /> },
          { path: ":id/edit", element: <EventEdit />, loader: eventDetailLoader },
          { path: ":id/detail", element: <EventDetail />, loader: eventDetailLoader },
        ]
      },
      {
       path: ROUTE_PATHS.USERS,
       children: [
         { index: true, element: <UserList/>},
         { path: ":id/detail", element: <UserDetail />, loader: userDetailLoader },
          { path: ":id/edit", element: <UserUpdatePage />, loader: userDetailLoader },
       ]
      },
      { path: ROUTE_PATHS.REGISTER_EVENTS, element: <RegisterEvents /> },
      { path: ROUTE_PATHS.CONTACT, element: <Contacts /> },

      { path: ROUTE_PATHS.NOT_FOUND, element: <NoMatch /> },
    ],
  },
  {
    path: "/login",
    element: <UserLogInRegisterLayout />,
    children: [
      {
        index: true, element: <LogInPage />
      },
      {
        path: "new", element: <RegisterPage />
      }
    ]
  }
]);

export { ROUTE_PATHS };