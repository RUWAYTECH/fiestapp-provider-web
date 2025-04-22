import { ApiResponseDto } from "../models/api-response-dto";
import { CategoryResponseDto } from "../models/category/category-dto";
import { endpoints as ep } from "../../core/constants";

export const getCategoriesQuery = {
	query: () => {
		const path = ep.category.getCategories;
		return {
			url: path,
			method: "GET",
		};
	},
	keepUnusedDataFor: 0,
	transformResponse: (response: ApiResponseDto<{ data: CategoryResponseDto[] }>) => response.data,
};
