
// libs
import {createBrowserRouter, Navigate} from "react-router-dom";

// components
import Callback from "src/components/callback/Callback.component";
import Layout from "src/components/layout/Layout.component";
import {ServiceGuard} from "src/components/guards";

// pages
import Home from "src/pages/home/Home.page";
import Logout from "src/pages/logout/Logout.page";
import Landing from "src/pages/landing/Landing.page";


const router = createBrowserRouter([
  // root pages, don't include header/nav bar
  {
    id: "callback",
    index: true,
    path: "/callback",
    element: <Callback />,
  },
  {
    id: "logout",
    index: true,
    path: "/logout",
    element: <Logout />,
  },
  // config for page layout of header/body/etc
  {
    id: "application",
    path: "/app",
    element: <ServiceGuard><Layout /></ServiceGuard>,
    children: [
      // pages with header
      {
        id: "home",
        index: true,
        path: "",
        element: <Home />,
      },
    ],
  },
  // landing page
  {
    id: "landing",
    index: true,
    path: "",
    element: <Landing />
  },
  // reroute all other traffic to landing page
  {
    id: "wild",
    path: "*",
    element: <Navigate to={""} />
  }
], {basename: import.meta.env.VITE_APP_BASENAME});

export default router;
