import {useAuth0} from "@auth0/auth0-react";
import {Navigate} from "react-router-dom";
import usePermissions from "src/hooks/UsePermissions.hook";
import PageLoader from "src/components/page-loader/PageLoader.component";
import {useEffect, useState} from "react";
import useRestClient from "src/hooks/RestClient.hook";


export function PermissionGuard({required, children}) {

  const {isLoading, permissions} = usePermissions();

  if (isLoading) return <PageLoader />;

  let hasAllPermissions = true;
  for (const permission of (required ?? [])) {
    hasAllPermissions = hasAllPermissions && permissions.includes(permission);
  }

  if (!hasAllPermissions) {
    return <Navigate to={'/'} />
  } else {
    return children;
  }
}


export function AuthGuard({children}) {

  const auth = useAuth0();

  if (auth.isLoading) return <PageLoader />

  if (!auth.isAuthenticated) {
    return <Navigate to={'/'} />
  } else {
    return children;
  }
}



export function ServiceGuard({children}) {

  // state
  const [pageState, setPageState] = useState('loading');
  const [error, setError] = useState(null);

  // services
  const client = useRestClient();

  useEffect(() => {
    async function effect() {
      try {
        const res = await client.health();
        if (res.ok) {
          setPageState('ready');
        } else {
          const error = await res.json();

          setPageState('error');
          setError(error);
        }
      } catch (e) {
        // if health endpoint is inaccessible...
        if (e.message.includes('Failed to fetch')) {
          setError('Could not connect to server.... is it running?')
        } else {
          setError('unexpected application error...')
          console.error(e);
        }

        setPageState('error');
      }
    }

    effect().then()
  })

  if (pageState==='loading') {
    return <PageLoader />
  }
  else if (pageState==='error') {
    return <div className={"flex-col hfill justify-content-center align-items-center"}>
      <h1>Oops</h1>
      <h4><i>Something went wrong</i></h4>

      <br/><br/>

      <h2>{error}</h2>
    </div>
  }
  else {
    return children;
  }
}

