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

interface TabsProps {
	handleSubmitRegister: (data: any) => void;
	loading: boolean;
	data: any;
	isEditing: boolean;
	isDetail?: boolean;
	handleClose?: () => void;
}

const RenderTabs: React.FC <TabsProps> = ({ handleSubmitRegister,handleClose, isEditing = false, loading ,data}) => {
	const theme = useTheme()

	const [openQuoteId, setOpenQuoteId] = useState<number | null>(null)
	const [formState, setFormState] = useState<{ [key: number]: { budget: string; details: string } }>({})
	const [quantities, setQuantities] = useState<{ [key: number]: number }>({})

	
	const isEditable = (status: string) => status === "Pendiente"

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
				quote.items.forEach((item) => {
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
								Recibida: {quote.receivedDate}
							</Typography>
							<Typography
								variant="body2"
								sx={{
									color: quote.status === "Pendiente" ? theme.palette.success.main : theme.palette.error.main,
									fontWeight: "bold",
								}}
							>
								{quote.status}
							</Typography>
						</Box>
						<Typography variant="h6" sx={{ fontWeight: "bold" }}>
							{quote.title}
						</Typography>
						<Typography>Cliente: {quote.client}</Typography>
						<Typography>Fecha del evento: {quote.eventDate}</Typography>
						<Typography>Servicio: {quote.service}</Typography>
						<Typography>Personas: {quote.people}</Typography>

						<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
							<Button
								variant="outlined"
								sx={{
									color: quote.status === "Pendiente" ? "#fff" : theme.palette.primary.main,
									backgroundColor: quote.status === "Pendiente" ? theme.palette.primary.main : "transparent",
									borderColor: theme.palette.primary.main,
									"&:hover": {
										backgroundColor: quote.status === "Pendiente" ? theme.palette.primary.dark : theme.palette.secondary.light,
									},
								}}
								onClick={() => toggleResponder(quote.id)}
							>
								{quote.status === "Pendiente" ? "Responder" : "Ver Detalles"}
							</Button>
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

								{quote.items.map((item) => (
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
												<img src={item.image} alt={item.name} width={60} height={60} style={{ borderRadius: 8 }} />
												<Box>
													<Typography>{item.name}</Typography>
													<Typography color="text.secondary">S/ {item.price.toFixed(2)}</Typography>
												</Box>
											</Box>
											<Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
												<IconButton disabled={!isEditable(quote.status)} onClick={() => handleRemoveQuantity(item.id)}>
													<RemoveIcon />
												</IconButton>
												<Typography>{quantities[item.id]}</Typography>
												<IconButton disabled={!isEditable(quote.status)} onClick={() => handleAddQuantity(item.id)}>
													<AddIcon />
												</IconButton>
											</Box>
										</Grid>

										<Grid item xs={12} md={6}>
											<TextField
												label="Presupuesto Aproximado*"
												fullWidth
												size="small"
												placeholder="Ej: 2000.00"
												sx={{ mb: 2 }}
												disabled={!isEditable(quote.status)}
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
												disabled={!isEditable(quote.status)}
												value={formState[item.id]?.details || ""}
												onChange={(e) => handleChangeItemDetails(item.id, e.target.value)}
											/>
											{isEditable(quote.status) && (
												<Button
													variant="contained"
													fullWidth
													sx={{ backgroundColor: theme.palette.primary.main }}
													onClick={() => handleSendRequest(item.id)}
												>
													Enviar Solicitud
												</Button>
											)}
										</Grid>
									</Grid>
								))}
							</>
						)}
					</Card>
				))}
			</Box>
		</Box>
	);
};

export default RenderTabs;