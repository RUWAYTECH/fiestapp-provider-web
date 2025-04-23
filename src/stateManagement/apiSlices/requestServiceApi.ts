import { getRequestMyServicesQuery } from "../queries/requestServiceQueries";
import apiSlice from "./apiSlice";

export const requestServiceApi = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getRequestMyServices: build.query(getRequestMyServicesQuery),
	}),
});

export const { useGetRequestMyServicesQuery, useLazyGetRequestMyServicesQuery } = requestServiceApi;