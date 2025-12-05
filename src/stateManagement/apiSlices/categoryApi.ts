import apiSlice from './apiSlice';
import { getAll, getById, create, update, remove } from '../queries/categoryQueries';

export const categoryApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		getAllCategory: build.query(getAll),
		getByIdCategory: build.query(getById),
		createCategory: build.mutation(create),
		updateCategory: build.mutation(update),
		removeCategory: build.mutation(remove)
	})
});

export const {
	useGetAllCategoryQuery,
	useLazyGetAllCategoryQuery,
	useGetByIdCategoryQuery,
	useLazyGetByIdCategoryQuery,
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useRemoveCategoryMutation
} = categoryApi;
