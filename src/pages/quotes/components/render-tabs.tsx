import React, { useEffect, useState } from "react";
import {
	Box,
	Card,
	Typography,
	Button,
	Divider,
	TextField,
	IconButton,
	Grid,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles"
import { RequestServiceResponseDto } from "@/stateManagement/models/request-service/request-service-dto";
import { formatDateddMMyyyy } from "@/utils/format/formatDates";

interface TabsProps {
	handleSubmitRegister: (data: any) => void;
	loading: boolean;
	data: RequestServiceResponseDto[];
	isEditing: boolean;
	isDetail?: boolean;
	handleClose?: () => void;
}

const RenderTabs: React.FC <TabsProps> = ({ handleSubmitRegister,handleClose, isEditing = false, loading ,data}) => {
	const theme = useTheme()

	const [openQuoteId, setOpenQuoteId] = useState<number | null>(null)
	const [formState, setFormState] = useState<{ [key: number]: { budget: string; details: string } }>({})
	const [quantities, setQuantities] = useState<{ [key: number]: number }>({})


	const isEditable = (status: string) => status === "Solicitado" || status === "En proceso"

	const toggleResponder = (id: number) => {
		setOpenQuoteId((prev) => (prev === id ? null : id))
	};

	const handleChangeItemBudget = (itemId: number, value: string) => {
		setFormState((prev) => ({
			...prev,
			[itemId]: {
				...prev[itemId],
				budget: value,
			},
		}))
	}

	const handleChangeItemDetails = (itemId: number, value: string) => {
		setFormState((prev) => ({
			...prev,
			[itemId]: {
				...prev[itemId],
				details: value,
			},
		}))
	}

	useEffect(() => {
		if (data) {
			const initialQuantities: { [key: number]: number } = {};
			data.forEach((quote) => {
				quote.requestServiceDetails.forEach((item) => {
					initialQuantities[item.id] = item.quantity;
				})
			})
			setQuantities(initialQuantities)
		}
	}, [data])

	const handleSendRequest = (itemId: number) => {
		const itemData = formState[itemId]
		const quantity = quantities[itemId] || 1

		const payload = {
			...itemData,
			quantity,
		}

		console.log("Enviando solicitud para item", itemId, payload)
	}


	const handleAddQuantity = (itemId: number) => {
		console.log("handleAddQuantity", itemId)
		setQuantities((prev) => ({
			...prev,
			[itemId]: Math.floor((prev[itemId] || 1) + 1),
		}))
	}

	const handleRemoveQuantity = (itemId: number) => {
		setQuantities((prev) => {
			const newValue = Math.max(1, (prev[itemId] || 1) - 1)
			return { ...prev, [itemId]: newValue }
		})
	}

	return (
		<Box>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				{data.map((quote) => (
					<Card
						key={quote.id}
						variant="outlined"
						sx={{
							p: 2,
							borderLeft: `8px solid ${theme.palette.secondary.main}`,
							borderRadius: 2,
							boxShadow: 1,
						}}
					>
						<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1, flexWrap: "wrap", gap: 1 }}>
							<Typography variant="caption" color="text.secondary">
								Recibida: {quote.updatedAt ? formatDateddMMyyyy(quote.updatedAt) : ''}
							</Typography>
							<Typography
								variant="body2"
								sx={{
									color: quote.entityStatus === "Solicitado" ? theme.palette.success.main : theme.palette.error.main,
									fontWeight: "bold",
								}}
							>
								{quote.entityStatus}
							</Typography>
						</Box>
						<Typography variant="h6" sx={{ fontWeight: "bold" }}>
							{quote.message}
						</Typography>
						{/* <Typography>Cliente: {quote.client}</Typography> */}
						<Typography>Fecha del evento: {quote.registerDate ? formatDateddMMyyyy(quote.registerDate) : ''}</Typography>
						<Typography>Servicio: {quote.requestServiceDetails.map((item) => item.service.name).join(", ")}</Typography>
						<Typography>Presupuesto: S/ {quote.approximateBudget.toFixed(2)}</Typography>
						<Typography>Personas: {quote.numberInvite}</Typography>

						<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
							{openQuoteId === quote.id ? (
								<Button
								variant="outlined"
								color="secondary"
								onClick={() => toggleResponder(quote.id)}
							>
								Cancelar
							</Button>
							) : (
								<Button
								variant="outlined"
								sx={{
									color: quote.entityStatus === "Solicitado" ? "#fff" : theme.palette.primary.main,
									backgroundColor: quote.entityStatus === "Solicitado" ? theme.palette.primary.main : "transparent",
									borderColor: theme.palette.primary.main,
									"&:hover": {
										backgroundColor: quote.entityStatus === "Solicitado" ? theme.palette.primary.dark : theme.palette.secondary.light,
									},
								}}
								onClick={() => toggleResponder(quote.id)}
							>
								{quote.entityStatus === "Solicitado" ? "Responder" : "Ver Detalles"}
							</Button>
						)}
						</Box>

						{openQuoteId === quote.id && (
							<>
								<Divider sx={{ mt: 2, mb: 2 }} />
								<Typography
									variant="subtitle1"
									sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}
								>
									Información del Evento
								</Typography>

								{quote.requestServiceDetails.map((item) => (
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
												<img src={item.service.description} alt={item?.service?.name} width={60} height={60} style={{ borderRadius: 8 }} />
												<Box>
													<Typography>{item?.service?.name}</Typography>
													<Typography color="text.secondary">S/ {item.priceFinal.toFixed(2)}</Typography>
												</Box>
											</Box>
										</Grid>

										<Grid item xs={12} md={6}>
											<TextField
												label="Presupuesto final*"
												fullWidth
												size="small"
												placeholder="Ej: 2000.00"
												sx={{ mb: 2 }}
												disabled={!isEditable(quote.entityStatus)}
												value={formState[item.id]?.budget || ""}
												onChange={(e) => handleChangeItemBudget(item.id, e.target.value)}
											/>
											<TextField
												label="Detalles Adicionales"
												fullWidth
												multiline
												rows={3}
												placeholder="Describa aquí cualquier detalle adicional..."
												sx={{ mb: 2 }}
												disabled={!isEditable(quote.entityStatus)}
												value={formState[item.id]?.details || ""}
												onChange={(e) => handleChangeItemDetails(item.id, e.target.value)}
											/>
										</Grid>
									</Grid>
								))}

								{isEditable(quote.entityStatus) && (
									<Button
										variant="contained"
										color="primary"
									>
										Enviar cotizacion
									</Button>
								)}
							</>
						)}
					</Card>
				))}
			</Box>
		</Box>
	);
};

export default RenderTabs;