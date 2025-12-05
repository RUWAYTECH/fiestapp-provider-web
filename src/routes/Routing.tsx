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
import Restricted from "@/components/ui/restricted/Restricted";
import { UserRole } from "@/stateManagement/models/user/userDto";
/* import Restricted from "@/components/ui/restricted/Restricted";
import permissions from "@/core/constants/permissionRulesConstants";
import Inventory from "@/pages/inventory/Inventory"; */

const NotFound = lazy(() => import("@/pages/NotFound"));
const NotAuthorized = lazy(() => import("@/pages/NotAuthorized"));
const Quotes = lazy(() => import("@/pages/quotes/quotes"));
const Register = lazy(() => import("@/pages/register/register"));
const RegisterProvider = lazy(() => import("@/pages/update-provider/update-provider"));
const Profile = lazy(() => import("@/pages/profile/profile"));
const Services = lazy(() => import("@/pages/services/services"));
const Categories = lazy(() => import("@/pages/categories/categories"));

export const Routing = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Navigate to={paths.DASHBOARD} />} />
			<Route path="*" element={<NotFound />} />
			<Route path={paths.LOGIN} element={<Login />} />
			<Route path={paths.REGISTER} element={<Register />} />
			<Route path={paths.RESET} element={<ResetPassword />} />
			<Route path={paths.FORGOT} element={<ForgotPassword />} />


			<Route element={<AuthGuard redirectTo={paths.LOGIN} />}>
				<Route path={paths.NOT_AUTHORIZED} element={<NotAuthorized />} />

				<Route path={paths.UPDATE_PROVIDER} element={<RegisterProvider />} />
				<Route path={paths.QUOTES} element={<Quotes />} />
				<Route path={paths.DASHBOARD} element={<Dashboard />} />
				<Route path={paths.PROFILE} element={<Profile />} />
				<Route path={paths.SERVICES} element={<Services />} />
				<Route path={paths.CATEGORIES} element={
					<Restricted allowedTo={UserRole.ADMIN} fallback={<NotAuthorized />}>
						<Categories />
					</Restricted>
				} />
				<Route
          path={paths.CATEGORIES}
          element={
            <Restricted
              allowedTo={UserRole.ADMIN}
              fallback={<NotAuthorized/>}
            >
              <Categories />
            </Restricted>
          }
        />
			</Route>
		</>
	)
);
