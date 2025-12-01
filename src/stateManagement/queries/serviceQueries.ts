import { endpoints as ep } from "../../core/constants";
import { ApiResponse, PaginatedApiResponse } from "../models/api-response-dto";
import { ServiceRequestDto, ServiceResponseDto } from "../models/service/service-dto";

export const getMyServicesQuery = {
	query: ({ page, pageSize }: { page: number; pageSize: number }) => {
		const path = ep.service.getAll;
		return {
			url: path,
			method: "GET",
			data: {
				page: page,
				pageSize: pageSize,
			},
		};
	},
	keepUnusedDataFor: 0,
	transformResponse: (response: PaginatedApiResponse<ServiceResponseDto[]>) => response,
	providesTags: (result?: PaginatedApiResponse<ServiceResponseDto[]>) => {
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
			url: ep.service.create,
			method: "POST",
			data: data,
		};
	},
	invalidatesTags: [{ type: "Service" as "Service", id: "SERVICE_LIST" }],
};

export const customCreateServiceMutation = {
	query: (data: ServiceRequestDto) => {
		return {
			url: ep.service.create,
			method: "POST",
			data: data,
		};
	},
	invalidatesTags: [{ type: "Service" as "Service", id: "SERVICE_LIST" }],
};

export const getServiceByIdQuery = {
	query: (id: string) => {
		const path = ep.service.getById.replace(":id", id.toString());
		return {
			url: path,
			method: "GET",
		};
	},
	keepUnusedDataFor: 0,
	transformResponse: (response: ApiResponse<ServiceResponseDto>) => response,
	providesTags: (result?: ApiResponse<ServiceResponseDto>) => {
		return result ? [{ type: "Service" as "Service", id: result.data.id }] : [];
	},
};

export const customUpdateServiceMutation = {
	query: ({ id, data }: { id: string; data: ServiceRequestDto }) => {
		const path = ep.service.update.replace(":id", id.toString());
		return {
			url: path,
			method: "PUT",
			data: data,
		};
	},
	invalidatesTags: [{ type: "Service" as "Service", id: "SERVICE_LIST" }],
};

export const deleteServiceMutation = {
	query: (id: string) => {
		const path = ep.service.delete.replace(":id", id.toString());
		return {
			url: path,
			method: "DELETE",
		};
	},
	invalidatesTags: [{ type: "Service" as "Service", id: "SERVICE_LIST" }],
};

export const changeStateServiceMutation = {
	query: (id: string) => {
		const path = ep.service.changeStatus.replace(":id", id.toString());
		return {
			url: path,
			method: "PATCH",
		};
	},
	invalidatesTags: [{ type: "Service" as "Service", id: "SERVICE_LIST" }],
};