import { endpoints as ep } from "../../core/constants";
import { ApiResponseDto, PaginationDto } from "../models/api-response-dto";
import { ServiceRequestDto, ServiceResponseDto } from "../models/service/service-dto";

export const getMyServicesQuery = {
	query: ({ page, pageSize }: { page: number; pageSize: number }) => {
		const path = ep.service.getMyServices.replace(":page", page.toString()).replace(":pageSize", pageSize.toString());
		return {
			url: path,
			method: "GET",
		};
	},
	keepUnusedDataFor: 0,
	transformResponse: (response: ApiResponseDto<{ data: ServiceResponseDto[], meta: { pagination: PaginationDto } }>) => response,
	providesTags: (result?: ApiResponseDto<{ data: ServiceResponseDto[] }>) => {
		return result?.data
			? [
				...result.data.map(({ id }) => ({ type: "Service" as "Service", id })),
				{ type: "Service" as "Service", id: "SERVICE_LIST" },
			]
			: [{ type: "Service" as "Service", id: "SERVICE_LIST" }];
	},
};

export const createServiceMutation = {
	query: (data: ServiceRequestDto) => {
		return {
			url: ep.service.createService,
			method: "POST",
			data: { data },
		};
	},
	invalidatesTags: [{ type: "Service" as "Service", id: "SERVICE_LIST" }],
};

export const customCreateServiceMutation = {
	query: (data: ServiceRequestDto) => {
		return {
			url: ep.service.customCreateService,
			method: "POST",
			data: { data },
		};
	},
	invalidatesTags: [{ type: "Service" as "Service", id: "SERVICE_LIST" }],
};