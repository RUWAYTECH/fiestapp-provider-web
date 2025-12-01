import { RequestStatus } from "@/core/constants/requestStatus";
import { endpoints as ep } from "../../core/constants";
import { RequestServiceRequestDto, RequestServiceResponseDto } from "../models/request-service/request-service-dto";
import { PaginatedApiResponse } from "../models/api-response-dto";

export const getRequestMyServicesQuery = {
	query: (data: { page: number; pageSize: number; status?: RequestStatus }) => {
		const path = ep.requestService.getAll;

		return {
			url: path,
			method: "GET",
			params: data,
		};
	},
	keepUnusedDataFor: 0,
	transformResponse: (response: PaginatedApiResponse<RequestServiceResponseDto[]>) => response,
	providesTags: (result?: PaginatedApiResponse<RequestServiceResponseDto[]>) => {
		return result?.data
			? [
				...result.data.map(({ id }) => ({ type: "RequestService" as "RequestService", id })),
				{ type: "RequestService" as "RequestService", id: "REQUEST_SERVICE_LIST" },
			]
			: [{ type: "RequestService" as "RequestService", id: "REQUEST_SERVICE_LIST" }];
	},
}

export const customUpdateRequestServiceMutation = {
	query: ({ data, id }: { id: string; data: RequestServiceRequestDto }) => {
		const path = ep.requestService.respondToRequest.replace(":id", id.toString());
		return {
			url: path,
			method: "PATCH",
			data: data,
		};
	},
	invalidatesTags: [{ type: "RequestService" as "RequestService", id: "REQUEST_SERVICE_LIST" }],
};