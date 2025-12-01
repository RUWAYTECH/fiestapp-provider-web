import { endpoints as ep } from "../../core/constants";
import { ApiResponse } from "../models/api-response-dto";
import { UploadFileResponseDto } from "../models/upload/upload-file-dto";

export const uploadMutation = {
	query: (data: FormData) => {
		const path = ep.uploadFile.upload;
		return {
			url: path,
			data,
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};
	},
	transformResponse: (response: ApiResponse<UploadFileResponseDto[]>) => response,
};
