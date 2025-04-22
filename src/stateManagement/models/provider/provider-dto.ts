export interface ProviderResponseDto {

}

export interface ProviderRequestDto {
	name: string
	description: string
	category: string | number
	email: string
	phone: string
	address: string
	website?: string
	facebook?: string
	instagram?: string
}