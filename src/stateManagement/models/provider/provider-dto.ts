export interface ProviderResponseDto {
	id: number
	documentId: string
	name: string
	description: string | null
	address: string
	email: string
	isActive: boolean
	createdAt: string
	updatedAt: string
	publishedAt: string
	website: string | null
	phone: string | null
	businessAddress: string | null
	facebookUrl: string | null
	instagramUrl: string | null
}

export interface ProviderRequestDto {
	name: string
	description: string
	email: string
	phone: string
	address: string
	website?: string
	facebookUrl?: string
	instagramUrl?: string
}