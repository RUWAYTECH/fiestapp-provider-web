import { ServiceResponseDto } from "../service/service-dto";

export interface RequestItemDto {
	id: string;
	quantity: number;
	price: number;
	total: number;
	comment: string;
	service: ServiceResponseDto & { images: { url: string }[] };
}
