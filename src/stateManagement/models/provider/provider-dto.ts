export interface ProviderCommonDto {
	name: string;
	description: string;
	picture: string;
	address: string;
	email: string;
	website: string;
	phone: string;
	facebook: string;
	instagram: string;
	status: boolean;
}


export interface ProviderResponseDto extends ProviderCommonDto {
	id: number
}

export interface ProviderRequestDto extends ProviderCommonDto {}