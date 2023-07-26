import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../pages/login/authProvider";
import { ProtectedRoute } from "./protectedRoute";
import Login from "../pages/login/login";
import Dashboard from "../pages/Dashboard/dashboard"

const Routes = () => {
    const {token} = useAuth()

    const routesForPublic = [
        {
          path: "/service",
          element: <div>Service Page</div>,
        },
        {
          path: "/about-us",
          element: <div>About Us</div>,
        },
    ]
    const routesForAuthentificateOnly =[
        {
            path: "/",
            element: <ProtectedRoute/>,
            children: [
                {
                    path: "/",
                    element: <Dashboard/>
                },
                {
                    path: "/profile",
                    element: <div>User Profile</div>,
                },
                {
                    path: "/logout",
                    element: <div>Logout</div>,
                },
            ]
        }
    ]
    const routesForNotAuthenticatedOnly = [
        {
          path: "/",
          element: <Login/>,
        },
        {
          path: "/login",
          element: <Login/>,
        },
    ];
    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...(token ? routesForAuthentificateOnly : [] ),
        ]);

    return <RouterProvider router={router}/>

}

export default Routes