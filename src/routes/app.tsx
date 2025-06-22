import { Navigate, RouteObject } from "react-router-dom";
import RouteType from "@/types/route-type";

import NotFound from "./not-found";
import Dashboard from "@/pages/auth/dashboard";
import Login from "@/pages/guest/login";
// import Register from "@/pages/guest/register";
import ForgotPassword from "@/pages/guest/forgot-password";
import ResetPassword from "@/pages/guest/reset-password";
import { AuthUser } from "@/store/auth";
import Settings from "@/pages/auth/setting";
import VerifyEmail from "@/pages/auth/verify-email";
import SetPassword from "@/pages/guest/set-password";
import ListVehicle from "@/pages/auth/vehicle";
import CreateVehicle from "@/pages/auth/vehicle/create";
import ListVehicleType from "@/pages/auth/vehicle/Type";
import CreateVehicleType from "@/pages/auth/vehicle/Type/create";
import ListOwner from "@/pages/auth/owner";
import CreateOwner from "@/pages/auth/owner/create";
import CreateDriver from "@/pages/auth/driver/create";
import ListDriver from "@/pages/auth/driver";
import ListEnforcer from "@/pages/auth/enforcer";
import CreateEnforcer from "@/pages/auth/enforcer/create";
import ListSupervisor from "@/pages/auth/supervisor";
import CreateSupervisor from "@/pages/auth/supervisor/create";
import EditOwner from "@/pages/auth/owner/edit";
import EditDriver from "@/pages/auth/driver/edit";
import EditVehicleType from "@/pages/auth/vehicle/Type/edit";
import EditVehicle from "@/pages/auth/vehicle/edit";
import EditEnforcer from "@/pages/auth/enforcer/edit";
import EditSupervisor from "@/pages/auth/supervisor/edit";

const Auth = AuthUser();

const guest_routes: RouteType[] = [
    {path: '/login', element: <Login/>},
    // {path: '/register', element: <Register/>},
    // {path: '/realtor/register', element: <Register registerAs="realtor"/>},
    {path: '/forgot-password', element: <ForgotPassword/>},
    {path: '/reset-password', element: <ResetPassword/>},
    {path: '/set-password', element: <SetPassword/>},
];

const auth_routes: RouteType[] = [
    {path: '/', element: <Dashboard/>},
    {path: '/verify-email', element: <VerifyEmail/>},
   
    { path: '/vehicles', element: <ListVehicle /> },
    { path: '/vehicles/create', element: <CreateVehicle /> },
    { path: '/vehicles/:uuid/show', element: <EditVehicle /> },
    
    { path: '/vehicle/type', element: <ListVehicleType /> },
    { path: '/vehicle/type/create', element: <CreateVehicleType /> },
    { path: '/vehicle/type/:uuid/show', element: <EditVehicleType /> },
    
    { path: '/owners', element: <ListOwner /> },
    { path: '/owners/create', element: <CreateOwner /> },
    { path: '/owners/:uuid/show', element: <EditOwner /> },
    
    { path: '/drivers', element: <ListDriver /> },
    { path: '/drivers/create', element: <CreateDriver /> },
    { path: '/drivers/:uuid/show', element: <EditDriver /> },
    
    { path: '/enforcers', element: <ListEnforcer /> },
    { path: '/enforcers/create', element: <CreateEnforcer /> },
    { path: '/enforcers/:uuid/show', element: <EditEnforcer /> },
    
    { path: '/supervisors', element: <ListSupervisor /> },
    { path: '/supervisors/create', element: <CreateSupervisor /> },
    { path: '/supervisors/:uuid/show', element: <EditSupervisor /> },
    
    { path: '/settings', element: <Settings /> },
    //profile 
];


const authMiddleware = (route:any) => {
    if ( ! Auth  ) return <Navigate to="/login" />

    if ( route.path === '/verify-email' && Auth.email_verified ) return <Navigate to="/" />

    if ( route.path === '/verify-email' && ! Auth.email_verified ) return route.element

    if ( ! Auth.email_verified ) return <Navigate to="/verify-email" />



    return route.element;
}

const middleware = () => {
    const isAuthenticated = Auth;
    //guest routes
    const GuestRoutes = guest_routes.map((route) => ({
      path: route.path,
      element: ! isAuthenticated ? route.element : <Navigate to="/" />
    }));

    //auth routes
    const AuthRoutes = auth_routes.map((route) => ({
        path: route.path,
        element: authMiddleware(route),
      }));

      return [...GuestRoutes,...AuthRoutes, { path: '*', element: <NotFound/> }];
  }

const AppRoutes : RouteObject[] = middleware();

export default AppRoutes
