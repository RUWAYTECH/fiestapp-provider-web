import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
	Box,
	Card,
	Typography,
	Button,
	Divider,
	TextField,
	Grid,
	CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { formatDateddMMyyyy } from "@/utils/format/formatDates";
import { RequestServiceResponseDto } from "@/stateManagement/models/request-service/request-service-dto";
import { RequestStatus, statusLabel } from "@/core/constants/requestStatus";

interface QuoteCardProps {
	quote: RequestServiceResponseDto;
	updating?: boolean;
	isEditable: (status: RequestStatus) => boolean;
	onSubmit: (formData: { id: string, budget: string; comment: string; quantity: number; serviceId: string }[]) => void;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, updating, isEditable, onSubmit }) => {
	const theme = useTheme();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			requestServiceDetails: quote.items?.map((item) => ({
				id: item.id,
				name: item.service.name,
				priceMin: item.service.priceMin,
				priceMax: item.service.priceMax,
				priceFinal: item.price,
				quantity: item.quantity,
				image: item.service.images?.[0].url,
				serviceId: item.service.id,
				budget: item.price.toFixed(2),
				comment: item.comment,
			})),
		},
		disabled: !isEditable(quote.status),
	});

	const { fields } = useFieldArray({
		control,
		name: "requestServiceDetails",
	});

	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<Card
			variant="outlined"
			sx={{
				p: 2,
				borderLeft: `8px solid ${theme.palette.secondary.main}`,
				borderRadius: 2,
				boxShadow: 1,
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					mt: 1,
					flexWrap: "wrap",
					gap: 1,
				}}
			>
				<Typography variant="caption" color="text.secondary">
					Recibida: {quote.createdAt ? formatDateddMMyyyy(quote.createdAt) : ""}
				</Typography>
				<Typography
					variant="body2"
					sx={{
						color:
							quote.status === RequestStatus.REQUESTED
								? theme.palette.success.main
								: theme.palette.error.main,
						fontWeight: "bold",
					}}
				>
					{statusLabel[quote.status]}
				</Typography>
			</Box>
			<Typography variant="h6" sx={{ fontWeight: "bold" }}>
				{quote.comment}
			</Typography>
			<Typography>
				Fecha del evento: {quote.eventDate ? formatDateddMMyyyy(quote.eventDate) : ""}
			</Typography>
			<Typography>
				Servicio: {quote.items?.map((item) => item.service.name).join(", ")}
			</Typography>
			<Typography>Presupuesto inicial: S/ {quote.budgetAmount?.toFixed(2)}</Typography>
			<Typography>Precio final: S/ {quote.finalPrice?.toFixed(2)}</Typography>
			<Typography>Personas: {quote.guestQty}</Typography>
			<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
				{isOpen ? (
					<Button
						variant="outlined"
						color="secondary"
						onClick={() => setIsOpen(false)}
					>
						Cancelar
					</Button>
				) : (
					<Button
						variant="outlined"
						sx={{
							color: quote.status === RequestStatus.REQUESTED ? "#fff" : theme.palette.primary.main,
							backgroundColor: quote.status === RequestStatus.REQUESTED ? theme.palette.primary.main : "transparent",
							borderColor: theme.palette.primary.main,
							"&:hover": {
								backgroundColor: quote.status === RequestStatus.REQUESTED ? theme.palette.primary.dark : theme.palette.primary.light,
								color: "#fff",
							},
						}}
						onClick={() => setIsOpen(!isOpen)}
					>
						{quote.status === RequestStatus.REQUESTED ? "Responder" : "Ver Detalles"}
					</Button>
				)}
			</Box>
			{isOpen && (
				<>
					<Divider sx={{ mt: 2, mb: 2 }} />
					<Typography
						variant="subtitle1"
						sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}
					>
						Información del Evento
					</Typography>

					{fields.map((item, index) => (
						<Grid
							container
							spacing={2}
							key={item.id}
							sx={{
								mb: 4,
								alignItems: "flex-start",
							}}
						>
							<Grid item xs={12} md={6}>
								<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
									<img
										src={item?.image}
										alt={item?.name}
										width={90}
										height={90}
										style={{ borderRadius: 8 }}
									/>
									<Box>
										<Typography>{item?.name}</Typography>
										<Typography color="text.secondary">
											Cantidad: {item?.quantity}
										</Typography>
										<Typography color="text.secondary">
											Precio (min - max): S/ {item.priceMin} - S/ {item.priceMax}
										</Typography>
									</Box>
								</Box>
							</Grid>

							<Grid item xs={12} md={6}>
								<Controller
									name={`requestServiceDetails.${index}.budget`}
									control={control}
									rules={{ required: "El presupuesto es obligatorio" }}
									render={({ field }) => (
										<TextField
											{...field}
											label={`Presupuesto final*`}
											fullWidth
											size="small"
											placeholder="Ej: 2000.00"
											sx={{ mb: 2 }}
											error={!!errors.requestServiceDetails?.[index]?.budget}
											helperText={errors.requestServiceDetails?.[index]?.budget?.message}
										/>
									)}
								/>

								<Controller
									name={`requestServiceDetails.${index}.comment`}
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label={`Detalles Adicionales`}
											fullWidth
											multiline
											rows={3}
											placeholder="Describa aquí cualquier detalle adicional..."
											sx={{ mb: 2 }}
										/>
									)}
								/>
							</Grid>
						</Grid>
					))}
					{isEditable(quote.status) && (
						<Button
							variant="contained"
							color="primary"
							onClick={handleSubmit((data) => onSubmit(data.requestServiceDetails))}
							disabled={updating}
							startIcon={updating ? <CircularProgress size={20} /> : null}
						>
							Enviar cotización
						</Button>
					)}
				</>
			)}
		</Card>
	);
};

export default QuoteCard;