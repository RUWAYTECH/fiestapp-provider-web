import { PaginatedApiResponse } from "../models/api-response-dto";
import { endpoints as ep } from "../../core/constants";
import { UbigeoResponseDto } from "../models/ubigeo/ubigeo-dto";

export const getUbigeosQuery = {
	query: () => {
		const path = ep.ubigeo.getUbigeos;
		return {
			url: path,
			method: "GET",
		};
	},
	keepUnusedDataFor: 5 * 60,
	transformResponse: (response: PaginatedApiResponse<UbigeoResponseDto[]>) => response.data,
};