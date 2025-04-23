import { ServiceResponseDto } from "../service/service-dto";

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
  id: number;
  documentId: string;
  message: string;
  totalPrice: number;
  registerDate: string;
  entityStatus: 'Solicitado' | 'En proceso' | 'Atendido';
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  numberInvite: number;
  approximateBudget: number;
  totalPriceFinal: number | null;
  requestServiceDetails: RequestServiceDetailResponseDto[];
}