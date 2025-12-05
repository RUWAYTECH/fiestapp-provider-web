import { getRequestMyServicesQuery, customUpdateRequestServiceMutation } from "../queries/requestServiceQueries";
import apiSlice from "./apiSlice";

export const requestServiceApi = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getRequestMyServices: build.query(getRequestMyServicesQuery),
		customUpdateRequestService: build.mutation(customUpdateRequestServiceMutation),
	}),
});

export const { useGetRequestMyServicesQuery, useLazyGetRequestMyServicesQuery, useCustomUpdateRequestServiceMutation } = requestServiceApi;