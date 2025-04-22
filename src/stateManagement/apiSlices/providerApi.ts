import { createProviderMutation, getProviderByUserIdQuery, updateProviderMutation } from "../queries/providerQueries";
import apiSlice from "./apiSlice";

export const providerApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
		getProviderByUserId: build.query(getProviderByUserIdQuery),
		createProvider: build.mutation(createProviderMutation),
		updateProvider: build.mutation(updateProviderMutation),
	}),
});

export const {
	useGetProviderByUserIdQuery,
	useLazyGetProviderByUserIdQuery,
	useCreateProviderMutation,
	useUpdateProviderMutation
} = providerApi;