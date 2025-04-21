import {
  Navigate,
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import { lazy } from "react";
import { paths } from "../core/constants";
import AuthGuard from "./Guards/Auth.guard";
import Dashboard from "@/pages/dashboard/Dashboard";
import Login from "@/pages/login/Login";
import ForgotPassword from "@/pages/forgotPassword/ForgotPassword";
import ResetPassword from "@/pages/resetPassword/ResetPassword";
import User from "@/pages/registerUser/User";
import Restricted from "@/components/ui/restricted/Restricted";
import permissions from "@/core/constants/permissionRulesConstants";
import Inventory from "@/pages/inventory/Inventory";
import Quotes from "@/pages/quotes/quotes";
import Register from "@/pages/register/register";

const NotFound = lazy(() => import("@/pages/NotFound"));
const NotAuthorized = lazy(() => import("@/pages/NotAuthorized"));

export const Routing = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to={paths.DASHBOARD} />} />
      <Route path="*" element={<NotFound />} />
      <Route path={paths.LOGIN} element={<Login />} />
			<Route path={paths.REGISTER} element={<Register />} />
      <Route path={paths.RESET} element={<ResetPassword />} />
      <Route path={paths.FORGOT} element={<ForgotPassword />} />

			<Route path={paths.QUOTES} element={<Quotes />} />

      <Route element={<AuthGuard redirectTo={paths.LOGIN} />}>
        <Route path={paths.NOT_AUTHORIZED} element={<NotAuthorized />} />

        <Route path={paths.DASHBOARD} element={<Dashboard />} />
        <Route path={paths.USER} element={<User />} />
        <Route
          path={paths.INVENTORY}
          element={
            <Restricted
              allowedTo={permissions.INVENTORY_READ}
              fallback={<NotAuthorized/>}
            >
              <Inventory />
            </Restricted>
          }
        />
      </Route>
    </>
  )
);
