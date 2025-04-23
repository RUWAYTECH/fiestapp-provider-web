import { endpoints as ep } from "../../core/constants";
import { ApiResponseDto } from "../models/api-response-dto";
import { RequestServiceResponseDto } from "../models/request-service/request-service-dto";

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
	transformResponse: (response: ApiResponseDto<{ data: RequestServiceResponseDto[] }>) => response,
}