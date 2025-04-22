import { createProviderMutation, getProviderByUserIdQuery, updateProviderMutation, updateProviderProfileMutation } from "../queries/providerQueries";
import apiSlice from "./apiSlice";

export const providerApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
		getProviderByUserId: build.query(getProviderByUserIdQuery),
		createProvider: build.mutation(createProviderMutation),
		updateProvider: build.mutation(updateProviderMutation),
		updateProviderProfile: build.mutation(updateProviderProfileMutation),
	}),
});

export const {
	useGetProviderByUserIdQuery,
	useLazyGetProviderByUserIdQuery,
	useCreateProviderMutation,
	useUpdateProviderMutation,
	useUpdateProviderProfileMutation,
} = providerApi;