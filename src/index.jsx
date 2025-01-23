import React from 'react';
import ReactDOM from 'react-dom/client';
import 'src/index.scss';
import reportWebVitals from 'src/reportWebVitals';
import {RouterProvider} from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react";
import auth0Config from "src/config/auth0.config";
import router from "src/config/routes.config";
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserHistory } from 'history';


// bind to root html element
const root = ReactDOM.createRoot(
    document.getElementById('root')
);

// create client to use with tanstack query
const queryClient = new QueryClient()

export const history = createBrowserHistory({
  basename: import.meta.env.PUBLIC_URL + import.meta.env.VITE_APP_BASENAME,
});

// render react app
root.render(
    <React.StrictMode>
        {/* provide auth0 */}
        <Auth0Provider {...auth0Config}>
            {/* provide react-query */}
            <QueryClientProvider client={queryClient}>
                {/* provide router, loads in application pages */}
                <RouterProvider router={router} history={history}/>
            </QueryClientProvider>
        </Auth0Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


