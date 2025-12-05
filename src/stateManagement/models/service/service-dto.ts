import { ProviderResponseDto } from "../provider/provider-dto"
import { UbigeoResponseDto } from "../ubigeo/ubigeo-dto";

export interface ServiceResponseDto {
	id: string;
	name: string;
	description: string;
	priceMin: number;
	priceMax: number;
	duration?: number;
	status: boolean;
	score: number;
	categoryId: string;
	provider: ProviderResponseDto;
	images: string[];
	ubigeos: UbigeoResponseDto[];
}

export interface ServiceRequestDto {
	name: string;
	description: string;
	priceMin: number;
	priceMax: number;
	duration?: number;
	status: boolean;
	categoryId: string;
	ubigeoIds: string[];
	imageUrls: string[];
}
