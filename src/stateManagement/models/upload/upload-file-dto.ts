export interface UploadFileResponseDto {
	id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: any; // Si conoces la estructura de "formats", puedo ayudarte a tiparlo también.
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: Record<string, any>; // Si conoces su estructura exacta, mejor tiparlo
  createdAt: string;
  updatedAt: string;
}