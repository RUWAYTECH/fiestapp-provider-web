import { CategoryResponseDto } from "../category/category-dto"
import { ProviderResponseDto } from "../provider/provider-dto"
import { UbigeoResponseDto } from "../ubigeo/ubigeo-dto"
import { UploadFileResponseDto } from "../upload/upload-file-dto"

export interface ServiceResponseDto {
	id: number
	documentId: string
	name: string
	description: string
	priceMin: number
	priceMax: number
	score: number
	createdAt: string
	updatedAt: string
	publishedAt: string
	locale: string | null
	provider: ProviderResponseDto
	state: boolean | null
	category?: CategoryResponseDto
	ubigeoServices?: {
		id: number
		ubigeo: UbigeoResponseDto
	}[]
	fileImage?: UploadFileResponseDto[]
}

export interface ServiceRequestDto {
	name: string
	description: string
	priceMin: number
	priceMax: number
	score: number
	category: string
	ubigeos: number[]
	fileImage: string[]
	state?: boolean | null
}
