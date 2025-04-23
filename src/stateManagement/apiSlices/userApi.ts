import apiSlice from "./apiSlice";
import {
  loginMutation,
  allSelectUserQuery,
} from "../queries";
import {
  forgotPasswordMutation,
  resetPasswordMutation,
  getUserById,
  getUserByeRoleQuery,
  allSearchUserQuery,
  getUserIdQuery,
  addUserMutation,
  updateUserMutation,
  deleteUserMutation,
  allUserRolQuery,
	googleLoginQuery,
	registerMutation,
	changePasswordMutation,
} from "../queries/userQueries";
import { getAccountMenuQuery } from "../queries/accountQueries";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation(loginMutation),
		googleLogin: build.query(googleLoginQuery),
		register: build.mutation(registerMutation),
    forgotPassword: build.mutation(forgotPasswordMutation),
    resetPassword: build.mutation(resetPasswordMutation),
		changePassword: build.mutation(changePasswordMutation),
    allSelectUser: build.query(allSelectUserQuery),
    getUserByeRole: build.query(getUserByeRoleQuery),
    allSearchUser: build.query(allSearchUserQuery),
    userById: build.query(getUserById),
    getUserIdQuery: build.query(getUserIdQuery),
    addUser: build.mutation(addUserMutation),
    updateUser: build.mutation(updateUserMutation),
    deleteUser: build.mutation(deleteUserMutation),
    allUserRol: build.query(allUserRolQuery),

    getAccountMenu:build.query(getAccountMenuQuery),
  }),
});

export const {
  useLoginMutation,
	useLazyGoogleLoginQuery,
	useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
	useChangePasswordMutation,
  useAllSelectUserQuery,
  useGetUserByeRoleQuery,
  useLazyGetUserByeRoleQuery,
  useLazyUserByIdQuery,
  useAllSearchUserQuery,
  useUserByIdQuery,
  useGetUserIdQueryQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAllUserRolQuery,

  useGetAccountMenuQuery,
} = userApi;

export default userApi;
