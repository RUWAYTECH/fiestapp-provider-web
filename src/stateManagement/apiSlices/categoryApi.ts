import { getCategoriesQuery } from "../queries/categoryQueries";
import apiSlice from "./apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getCategories: build.query(getCategoriesQuery),
	}),
});

export const { useGetCategoriesQuery, useLazyGetCategoriesQuery } = categoryApi;