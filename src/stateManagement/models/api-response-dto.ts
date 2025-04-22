export type ApiResponseDto<T> = T

export interface PaginationDto {
	page: number
	pageSize: number
	total: number
}