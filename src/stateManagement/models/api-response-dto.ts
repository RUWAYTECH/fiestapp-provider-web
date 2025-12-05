export enum ResponseMessageEnum {
	SUCCESS,
	ERROR,
	WARNING,
	INFO
}

export interface ApiResponseMessage {
	type: ResponseMessageEnum;
	message: string;
}

export interface ApiResponse<T> {
	data: T;
	messages: ApiResponseMessage[];
}

export interface PaginatedApiResponse<T> extends ApiResponse<T> {
	pageOptions: {
		page: number;
		pageSize: number;
		totalPages: number;
		totalRows: number;
	};
}
