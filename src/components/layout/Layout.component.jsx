import './Layout.component.scss';
import {Navigate, Outlet, useNavigation} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import PageLoader from "src/components/page-loader/PageLoader.component";
import {DEFAULT_LOGOUT} from "src/config/auth0.config";


function SidebarMenu() {

  const auth0 = useAuth0();

  async function handleLogout() {
    await auth0.logout(DEFAULT_LOGOUT)
  }

  // TODO potentially flex this, need to extern variables...
  return (<div className={"flex-col justify-content-space-between p-1 alternate-surface-background-color"} style={{width: "20vw", maxWidth: "500px"}}>
    {/* Float top menu items*/}
    <div className={"flex-col gap-1"}>
      <h3>Application Name</h3>
      <button className={"App-button secondary-outline"}>Menu item 1</button>
      <button className={"App-button secondary-outline"}>Menu item 2</button>
      <button className={"App-button"}>Menu item 3</button>
    </div>

    {/* Float bottom menu items*/}
    <div className={"flex-col"}>
      <button className={"App-button"} onClick={handleLogout}>Logout</button>
    </div>
  </div>)
}

function Layout() {

  const {state} = useNavigation();
  const auth0 = useAuth0();

  if (auth0.isLoading) {
    return (<></>)
  }

  if (!auth0.isAuthenticated) return <Navigate to={"/"}/>

  return (
    <div className={"flex-row hfill wfill"}>
      <SidebarMenu />
      <div className={"flex-col hfill wfill scroll-y"}>
        {state === 'loading' ?
          <PageLoader />
          :
          <Outlet />
        }
      </div>
    </div>
  )
}


export default Layout;
