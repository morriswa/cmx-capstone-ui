import React, {useEffect, useState} from 'react';
import './Layout.component.scss';
import {Outlet, useNavigate, useNavigation} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import usePermissions from "src/hooks/UsePermissions.hook";
import PageLoader from "src/components/page-loader/PageLoader.component";
import {DEFAULT_LOGOUT} from "src/config/auth0.config";


function Menu({setMenuOpen}) {

  const [token, setToken] = useState(null);

  const navigate = useNavigate();
  const auth0 = useAuth0();
  const {permissions} = usePermissions();

  useEffect(() => {
    async function effect() {

      function _isExpired(token) {
        const expiration_timestamp = token.exp;
        if (expiration_timestamp) {
          return (expiration_timestamp * 1000) < new Date().getTime();
        } else {
          throw new Error('failed to retrieve expiration time from token')
        }
      }

      async function handleLogout() {
        await auth0.logout(DEFAULT_LOGOUT)
      }

      const token = await auth0.getIdTokenClaims();

      if (!token) {
        setToken(null);
        return
      }

      const isExpired = _isExpired(token);

      if (isExpired) {
        await handleLogout();
      } else {
        setToken(token);
      }
    }

    effect().then(()=>{
      console.debug('finished token handling');
    });
  }, [auth0, auth0.getIdTokenClaims]);

  function handleNavigate(path) {
    navigate(path);
    setMenuOpen(false);
  }

  return <>
    <button className="mobile-menu-link" onClick={() => handleNavigate('')}>Home</button>
    {!auth0.isAuthenticated ?
      <button className="mobile-menu-link" onClick={() => auth0.loginWithRedirect()}>Login</button>
      :
      // auth buttons
      <>
        <button className="mobile-menu-link" onClick={() => auth0.logout(DEFAULT_LOGOUT)}>
          Logout
        </button>
      </>
    }
  </>
}


function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex-col wfill stretch">
      <button className="mobile-menu-link active" onClick={() => setMenuOpen(!menuOpen)}>
        Menu
      </button>
      {menuOpen ?
        <Menu setMenuOpen={setMenuOpen}/>
        :
        <></>
      }
    </header>
  )
}


function Layout() {

  const {state} = useNavigation();
  const auth0 = useAuth0();

  if (auth0.isLoading) {
    return (<></>)
  }

  return (
    <>
      <Header/>
      <div className="hfill scroll-y" style={{paddingBottom: '10vh'}}>
        {state === 'loading' ?
          <PageLoader />
          :
          <Outlet />
        }
      </div>
    </>
  )
}


export default Layout;
