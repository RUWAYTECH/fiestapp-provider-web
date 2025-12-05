import { getUbigeosQuery } from "../queries/ubigeoQueries";
import apiSlice from "./apiSlice";

export const ubigeoApi = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getUbigeos: build.query(getUbigeosQuery),
	}),
});

export const { useGetUbigeosQuery, useLazyGetUbigeosQuery } = ubigeoApi;