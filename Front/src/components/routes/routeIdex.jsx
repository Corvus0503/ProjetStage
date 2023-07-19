import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../pages/login/authProvider";
import { ProtectedRoute } from "./protectedRoute";

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
                    element: <div>Home Page</div>
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
          element: <div>Home Page</div>,
        },
        {
          path: "/login",
          element: <div>Login</div>,
        },
    ];
    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForAuthentificateOnly : []),
        ...routesForNotAuthenticatedOnly,
    ])

    return <RouterProvider router={router}/>

}

export default Routes