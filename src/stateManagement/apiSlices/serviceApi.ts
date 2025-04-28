import { createServiceMutation, customCreateServiceMutation, getMyServicesQuery, getServiceByIdQuery, customUpdateServiceMutation, deleteServiceMutation, changeStateServiceMutation } from "../queries/serviceQueries";
import apiSlice from "./apiSlice";

export const serviceApi = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getMyServices: build.query(getMyServicesQuery),
		createService: build.mutation(createServiceMutation),
		customCreateService: build.mutation(customCreateServiceMutation),
		getServiceById: build.query(getServiceByIdQuery),
		customUpdateService: build.mutation(customUpdateServiceMutation),
		deleteService: build.mutation(deleteServiceMutation),
		changeStateService: build.mutation(changeStateServiceMutation),
	}),

});

export const {
	useGetMyServicesQuery,
	useLazyGetMyServicesQuery,
	useCreateServiceMutation,
	useCustomCreateServiceMutation,
	useGetServiceByIdQuery,
	useLazyGetServiceByIdQuery,
	useCustomUpdateServiceMutation,
	useDeleteServiceMutation,
	useChangeStateServiceMutation,
} = serviceApi;
