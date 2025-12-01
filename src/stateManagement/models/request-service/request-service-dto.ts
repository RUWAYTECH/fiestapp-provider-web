import { RequestStatus } from "@/core/constants/requestStatus";
import { ProviderResponseDto } from "../provider/provider-dto";
import { ServiceResponseDto } from "../service/service-dto";
import { User } from "../user/userDto";
import { RequestPaymentDto } from "./request-payment.dto";
import { RequestItemDto } from "./request-item.dto";

export interface RequestServiceDetailResponseDto {
  id: number;
  documentId: string;
  quantity: number;
  priceFinal: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
	service: ServiceResponseDto
}

export interface RequestServiceResponseDto {
  id: string;
	guestQty: number;
	budgetAmount: number;
	eventDate: string;
	comment: string;
	user: User;
	provider: ProviderResponseDto;
	status: RequestStatus;
	finalPrice: number | null;
	createdAt: string;
	payment: RequestPaymentDto | null;
	items: RequestItemDto[];
}

export interface RequestServiceRequestDto {
  items: {
		id: string;
		priceFinal: number;
		comment: string;
	}[];
}