export enum RequestStatus {
	REQUESTED = 'REQUESTED',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED',
	CANCELLED = 'CANCELLED'
}

export const statusLabel: Record<RequestStatus, string> = {
	[RequestStatus.REQUESTED]: 'Solicitado',
	[RequestStatus.IN_PROGRESS]: 'En Progreso',
	[RequestStatus.COMPLETED]: 'Completado',
	[RequestStatus.CANCELLED]: 'Cancelado'
};
