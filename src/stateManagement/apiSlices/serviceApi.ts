import { createServiceMutation, customCreateServiceMutation, getMyServicesQuery } from "../queries/serviceQueries";
import apiSlice from "./apiSlice";

export const serviceApi = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getMyServices: build.query(getMyServicesQuery),
		createService: build.mutation(createServiceMutation),
		customCreateService: build.mutation(customCreateServiceMutation),
	}),

});

export const {
	useGetMyServicesQuery,
	useLazyGetMyServicesQuery,
	useCreateServiceMutation,
	useCustomCreateServiceMutation,
} = serviceApi;
