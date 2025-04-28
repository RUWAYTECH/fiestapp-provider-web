import { endpoints as ep } from "../../core/constants";
import { ApiResponseDto, PaginationDto } from "../models/api-response-dto";
import { RequestServiceRequestDto, RequestServiceResponseDto } from "../models/request-service/request-service-dto";

export const getRequestMyServicesQuery = {
	query: ({ page, pageSize, state }: { page: number; pageSize: number; state?: 'Solicitado' | 'En proceso' | 'Atendido' }) => {
		const path = ep.requestService.getRequestMyServices.replace(':page', page.toString()).replace(':pageSize', pageSize.toString());

		return {
			url: path,
			method: "GET",
			params: { ...(state ? { filters: { entityStatus: { $eq: state } } } : {}) },
		};
	},
	keepUnusedDataFor: 0,
	transformResponse: (response: ApiResponseDto<{ data: RequestServiceResponseDto[], meta: { pagination: PaginationDto} }>) => response,
	providesTags: (result?: ApiResponseDto<{ data: RequestServiceResponseDto[] }>) => {
		return result?.data
			? [
				...result.data.map(({ id }) => ({ type: "RequestService" as "RequestService", id })),
				{ type: "RequestService" as "RequestService", id: "REQUEST_SERVICE_LIST" },
			]
			: [{ type: "RequestService" as "RequestService", id: "REQUEST_SERVICE_LIST" }];
	},
}

export const customUpdateRequestServiceMutation = {
	query: (data: { id: number; data: RequestServiceRequestDto }) => {
		const path = ep.requestService.customUpdateRequestService.replace(":id", data.id.toString());
		return {
			url: path,
			method: "PUT",
			data: { data: data.data },
		};
	},
	invalidatesTags: [{ type: "RequestService" as "RequestService", id: "REQUEST_SERVICE_LIST" }],
};