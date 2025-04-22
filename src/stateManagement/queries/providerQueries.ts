import { endpoints as ep } from "../../core/constants";
import { ApiResponseDto } from "../models/api-response-dto";
import { ProviderRequestDto, ProviderResponseDto } from "../models/provider/provider-dto";

export const getProviderByUserIdQuery = {
	query: (id: string) => {
		const path = ep.provider.getProviderByUserId.replace(":userId", id);
		return {
			url: path,
			method: "GET",
		};
	},
	keepUnusedDataFor: 0,
	transformResponse: (response: ApiResponseDto<{ data: ProviderResponseDto[] }>) => response,
	providesTags: (result?: ApiResponseDto<{ data: ProviderResponseDto[] }>) => {
		return result?.data
			? [
				...result.data.map(({ id }) => ({ type: "Provider" as "Provider", id })),
				{ type: "Provider" as "Provider", id: "PROVIDER_LIST" },
			]
			: [{ type: "Provider" as "Provider", id: "PROVIDER_LIST" }];
	},
};

export const createProviderMutation = {
	query: (data: ProviderRequestDto) => {
		const path = ep.provider.createProvider;
		return {
			url: path,
			data: { data },
			method: "POST",
		};
	},
	transformResponse: (response: ApiResponseDto<{ data: ProviderResponseDto }>) => response,
	invalidatesTags: [{ type: "Provider" as "Provider", id: "PROVIDER_LIST" }],
};

export const updateProviderMutation = {
	query: ({ id, data }: { id: string; data: ProviderRequestDto }) => {
		const path = ep.provider.updateProvider.replace(":id", id);
		return {
			url: path,
			data,
			method: "PUT",
		};
	},
	transformResponse: (response: ApiResponseDto<{ data: ProviderResponseDto  }>) => response,
	invalidatesTags: [{ type: "Provider" as "Provider", id: "PROVIDER_LIST" }],
};