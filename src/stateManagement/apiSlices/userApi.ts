import apiSlice from "./apiSlice";
import {
	loginMutation,
	googleLoginMutation,
	registerMutation,
	forgotPasswordMutation,
	resetPasswordMutation,
	changePasswordMutation,
} from "../queries/userQueries";
import { getAccountMenuQuery, profileQuery, syncProviderMutation } from "../queries/accountQueries";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAccountMenu:build.query(getAccountMenuQuery),
		profile: build.query(profileQuery),
		syncProvider: build.mutation(syncProviderMutation),

    login: build.mutation(loginMutation),
		googleLogin: build.mutation(googleLoginMutation),
		register: build.mutation(registerMutation),
		forgotPassword: build.mutation(forgotPasswordMutation),
		resetPassword: build.mutation(resetPasswordMutation),
		changePassword: build.mutation(changePasswordMutation),
  }),
});

export const {
  useGetAccountMenuQuery,
	useProfileQuery,
	useLazyProfileQuery,
	useSyncProviderMutation,

  useLoginMutation,
	useGoogleLoginMutation,
	useRegisterMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
	useChangePasswordMutation,
} = userApi;

export default userApi;
