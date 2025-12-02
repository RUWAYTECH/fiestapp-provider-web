export interface CategoryGetAllReqDto {
	page?: number
	pageSize?: number
	search?: string
}

export interface CategoryRequestDto {
	name: string
	description: string
	image: string | null
}

export interface CategoryResponseDto {
	id: string
	name: string
	description: string
	image: string
}