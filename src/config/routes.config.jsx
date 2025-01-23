
// libs
import {createBrowserRouter} from "react-router-dom";

// components
import Callback from "src/components/callback/Callback.component";
import Layout from "src/components/layout/Layout.component";

// pages
import Home from "src/pages/home/Home.page";
import Logout from "src/pages/logout/Logout.page";


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
    id: "with-header",
    path: "",
    element: <Layout />,
    children: [
      // pages with header
      {
        id: "home",
        index: true,
        path: "",
        element: <Home />,
      },
    ],
  }
], {basename: import.meta.env.VITE_APP_BASENAME});

export default router;
