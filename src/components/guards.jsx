import {useAuth0} from "@auth0/auth0-react";
import {Navigate} from "react-router-dom";
import usePermissions from "src/hooks/UsePermissions.hook";
import PageLoader from "src/components/page-loader/PageLoader.component";


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
