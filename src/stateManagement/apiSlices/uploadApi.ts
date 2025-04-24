import { uploadMutation } from "../queries/uploadQueries";
import apiSlice from "./apiSlice";

export const ubigeoApi = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		upload: build.mutation(uploadMutation),
	}),
});

export const { useUploadMutation } = ubigeoApi;