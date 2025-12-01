import { CategoryResponseDto } from "../models/category/category-dto";
import { endpoints as ep } from "../../core/constants";
import { ApiResponse } from "../models/api-response-dto";

export const getCategoriesQuery = {
	query: () => {
		const path = ep.category.getCategories;
		return {
			url: path,
			method: "GET",
		};
	},
	keepUnusedDataFor: 0,
	transformResponse: (response: ApiResponse<CategoryResponseDto[]>) => response.data,
};
