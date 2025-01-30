
// libs
import {createBrowserRouter, Navigate} from "react-router-dom";

// components
import Callback from "src/components/callback/Callback.component";
import {AuthGuard} from "src/components/guards";

// pages
import Layout from "src/pages/layout/Layout.component";
import Logout from "src/pages/logout/Logout.page";
import Landing from "src/pages/landing/Landing.page";
import {ColorPalette} from "src/pages/developer-tools.jsx";
import Search from "src/pages/search/Search.page.jsx";


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
  // dev design config
  {
    id: "dev-colors",
    index: true,
    path: "/dev/colors",
    element: <ColorPalette />
  },

  // config for page layout of header/body/etc
  {
    id: "application",
    path: "/app",
    element: <AuthGuard><Layout /></AuthGuard>,
    children: [
      // pages with header
      {
        id: "home",
        index: true,
        path: "",
        element: <Search />,
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
