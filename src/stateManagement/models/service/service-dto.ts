import { ProviderResponseDto } from "../provider/provider-dto"

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
}
