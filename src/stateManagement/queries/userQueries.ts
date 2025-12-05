import { endpoints as ep } from "../../core/constants";
import { ApiResponse } from "../models/api-response-dto";
import { LoginResponseDto, LoginWithEmailDto } from "../models/auth/login";
import { RegisterRequestDto } from "../models/auth/register";

export const loginMutation = {
  query: (data: LoginWithEmailDto) => {
    return {
      url: ep.auth.login,
      data,
      method: "POST",
    };
  },
  transformResponse: (response: ApiResponse<LoginResponseDto>) => response,
};

export const googleLoginMutation = {
	query: (token: string) => {
		return {
			url: ep.auth.oauthSignin,
			data: {
				token,
				provider: 'GOOGLE'
			},
			method: "POST",
		};
	},
	transformResponse: (response: ApiResponse<LoginResponseDto>) => response,
};

export const registerMutation = {
	query: (data: RegisterRequestDto) => {
		return {
			url: ep.auth.register,
			data,
			method: "POST",
		};
	},
	transformResponse: (response: ApiResponse<LoginResponseDto>) => response
};

export const forgotPasswordMutation = {
	query: (email: string) => {
		return {
			url: ep.auth.forgotPassword,
			data: { email },
			method: "POST",
		};
	},
	transformResponse: (response: ApiResponse<null>) => response,
};

export const resetPasswordMutation = {
	query: (data: { token: string; newPassword: string }) => {
		return {
			url: ep.auth.resetPassword,
			data,
			method: "POST",
		};
	},
	transformResponse: (response: ApiResponse<null>) => response,
};

export const changePasswordMutation = {
	query: (data: { currentPassword: string; newPassword: string }) => {
		return {
			url: ep.auth.changePassword,
			data,
			method: "POST",
		};
	},
	transformResponse: (response: ApiResponse<null>) => response,
};