import { endpoints } from '@/core/constants';
import { CategoryGetAllReqDto, CategoryRequestDto, CategoryResponseDto } from '../models/category/category-dto';
import { ApiResponse, PaginatedApiResponse } from '../models/api-response-dto';

export const getAll = {
	query: (query?: CategoryGetAllReqDto) => {
		const urlParams = new URLSearchParams();
		if (query?.page) urlParams.append('page', query.page.toString());
		if (query?.pageSize) urlParams.append('pageSize', query.pageSize.toString());
		if (query?.search) urlParams.append('search', query.search);

		return {
			url: endpoints.category.getAll + `?${urlParams.toString()}`,
			method: 'GET'
		};
	},
	transformResponse: (response: PaginatedApiResponse<CategoryResponseDto[]>) => response,
	providesTags: (_result: PaginatedApiResponse<CategoryResponseDto[]> | undefined) => {
		return [{ type: 'Category' as const, id: 'LIST' }];
	}
};

export const getById = {
	query: (id: string) => {
		return {
			url: endpoints.category.getById.replace(':id', id),
			method: 'GET'
		};
	},
	transformResponse: (response: ApiResponse<CategoryResponseDto>) => response
};

export const create = {
	query: (body: CategoryRequestDto) => {
		return {
			url: endpoints.category.create,
			method: 'POST',
			data: body
		};
	},
	transformResponse: (response: ApiResponse<null>) => response,
	invalidatesTags: [{ type: 'Category' as const }]
};

export const update = {
	query: (data: { id: string; body: CategoryRequestDto }) => {
		return {
			url: endpoints.category.update.replace(':id', data.id),
			method: 'PUT',
			data: data.body
		};
	},
	transformResponse: (response: ApiResponse<null>) => response,
	invalidatesTags: [{ type: 'Category' as const }]
};

export const remove = {
	query: (id: string) => {
		return {
			url: endpoints.category.delete.replace(':id', id),
			method: 'DELETE'
		};
	},
	transformResponse: (response: ApiResponse<null>) => response,
	invalidatesTags: [{ type: 'Category' as const }]
};
