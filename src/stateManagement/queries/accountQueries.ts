import { endpoints as ep } from "../../core/constants";
/* import menu from "../../stateManagement/models/dataMock/menuWeb.json"; */
import { ApiResponse } from "../models/api-response-dto";
import { ProviderRequestDto, ProviderResponseDto } from "../models/provider/provider-dto";
import { User } from "../models/user/userDto";
export const getAccountMenuQuery = {
	query: (data: any) => {
		return {
			url: ep.account.menu.replace(':profileId', data.profileId),
			data,
			method: "GET",
		};
	},
	/* transformResponse: (response: any) => menu */
}

export const profileQuery = {
	query: () => {
		return {
			url: ep.account.profile,
			method: "GET",
		};
	},
	keepUnusedDataFor: 0,
	transformResponse: (response: ApiResponse<User & { provider: ProviderResponseDto | null }>) => response,
};

export const syncProviderMutation = {
	query: (data: ProviderRequestDto) => {
		return {
			url: ep.account.syncProvider,
			data,
			method: "POST",
		};
	},
	transformResponse: (response: ApiResponse<null>) => response,
}