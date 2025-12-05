export interface RequestPaymentDto {
	id: string;
	amount: number;
	method: string;
	image: string;
	transferNumber: string;
	paidAt: Date;
}
