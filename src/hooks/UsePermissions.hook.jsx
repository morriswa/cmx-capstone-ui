import useRestClient from "./RestClient.hook";
import {useQuery} from "@tanstack/react-query";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";


function UsePermissions() {

  const [res, setRes] = useState({
    permissions: [],
    isLoading: true,
  })

  const auth0 = useAuth0();
  const client = useRestClient();
  const query = useQuery({
    queryKey: ['permissions'],
    queryFn: async () => (await client.getPermissions()).json()
  });

  useEffect(() => {
    async function poll() {
      if (
        auth0.isLoading
        ||!auth0.isAuthenticated
        ||query.isLoading
        ||query.isError
      ) {
        setRes({
          permissions: [],
          isLoading: true,
        })
      } else {
        setRes({
          permissions: [...query.data],
          isLoading: false,
        })
      }
    }

    poll().then()
  }, [auth0.isLoading, auth0.isAuthenticated, query.isLoading, query.isError, query.data])

  return res;
}

export default UsePermissions;
