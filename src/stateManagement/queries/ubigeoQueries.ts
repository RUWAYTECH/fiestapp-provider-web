import { ApiResponseDto } from "../models/api-response-dto";
import { endpoints as ep } from "../../core/constants";
import { UbigeoResponseDto } from "../models/ubigeo/ubigeo-dto";

export const getUbigeosQuery = {
	query: () => {
		const path = ep.ubigeo.getUbigeos + '?pagination[page]=1&pagination[pageSize]=2000';
		return {
			url: path,
			method: "GET",
		};
	},
	keepUnusedDataFor: 0,
	transformResponse: (response: ApiResponseDto<{ data: UbigeoResponseDto[] }>) => response.data,
};