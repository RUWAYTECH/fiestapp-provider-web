import React, { useState } from "react";
import {
	Box,
	Card,
	Typography,
	Tabs,
	Tab,
	Divider,
} from "@mui/material";
import RenderTabs from "./components/render-tabs";

const quoteData = [
	{
		id: 1,
		receivedDate: "14 Abril, 2025",
		title: "Evento de Cumpleaños",
		client: "Laura Martínez",
		eventDate: "25 Mayo, 2025",
		service: "Paquete Básico de Catering",
		people: 35,
		status: "Pendiente",
		items: [
			{
				id: 101,
				name: "Los gustitos infantiles",
				price: 2500,
				quantity: 1,
				image: "https://via.placeholder.com/60",
			},
			{
				id: 102,
				name: "El Rincón Festivo",
				price: 1500,
				quantity: 1,
				image: "https://via.placeholder.com/60",
			},
		],
	},
	{
		id: 2,
		receivedDate: "10 Abril, 2025",
		title: "Fiesta Corporativa",
		client: "Carlos Rodríguez",
		eventDate: "15 Mayo, 2025",
		service: "Paquete Premium de Catering",
		people: 75,
		status: "Respondida",
		items: [
			{
				id: 201,
				name: "Los gustitos infantiles",
				price: 2500,
				quantity: 1,
				image: "https://via.placeholder.com/60",
			},
			{
				id: 202,
				name: "El Rincón Festivo",
				price: 1500,
				quantity: 1,
				image: "https://via.placeholder.com/60",
			},
		],
	},
];

const quoteDataPending = [
	{
		id: 1,
		receivedDate: "14 Abril, 2025",
		title: "Evento de Cumpleaños",
		client: "Laura Martínez",
		eventDate: "25 Mayo, 2025",
		service: "Paquete Básico de Catering",
		people: 35,
		status: "Pendiente",
		items: [
			{
				id: 101,
				name: "Los gustitos infantiles",
				price: 2500,
				quantity: 1,
				image: "https://via.placeholder.com/60",
			},
			{
				id: 102,
				name: "El Rincón Festivo",
				price: 1500,
				quantity: 1,
				image: "https://via.placeholder.com/60",
			},
		],
	},
];
const quoteDataResponsed = [
	{
		id: 2,
		receivedDate: "10 Abril, 2025",
		title: "Fiesta Corporativa",
		client: "Carlos Rodríguez",
		eventDate: "15 Mayo, 2025",
		service: "Paquete Premium de Catering",
		people: 75,
		status: "Respondida",
		items: [
			{
				id: 201,
				name: "Los gustitos infantiles",
				price: 2500,
				quantity: 1,
				image: "https://via.placeholder.com/60",
			},
			{
				id: 202,
				name: "El Rincón Festivo",
				price: 1500,
				quantity: 1,
				image: "https://via.placeholder.com/60",
			},
		],
	},
];


const Quotes: React.FC = () => {
	const [tabIndex, setTabIndex] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabIndex(newValue);
	}

	return (
		<Box sx={{ p: { xs: 2, md: 4 } }}>
			<Card sx={{ p: { xs: 2, md: 3 } }}>
				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", sm: "row" },
						justifyContent: "space-between",
						alignItems: { xs: "flex-start", sm: "center" },
						rowGap: 1,
						mb: 2,
					}}
				>
					<Typography variant="h6">Cotizaciones</Typography>

					<Box
						sx={{
							width: "100%",
							display: "flex",
							justifyContent: { xs: "flex-start", sm: "flex-end" },
							overflowX: "auto",
						}}
					>
						<Tabs
							value={tabIndex}
							onChange={handleChange}
							textColor="secondary"
							indicatorColor="secondary"
							variant="scrollable"
							scrollButtons="auto"
						>
							<Tab label="Todas" />
							<Tab label="Pendientes" />
							<Tab label="Respondidas" />
						</Tabs>
					</Box>
				</Box>

				<Divider sx={{ mb: 2 }} />

				{tabIndex === 0 && (
					<RenderTabs
						handleSubmitRegister={() => { }}
						handleClose={() => { }}
						isEditing={false}
						loading={false}
						data={quoteData}
					/>
				)}
				{tabIndex === 1 && (
					<RenderTabs
						handleSubmitRegister={() => { }}
						handleClose={() => { }}
						isEditing={false}
						loading={false}
						data={quoteDataPending}
					/>
				)}
				{tabIndex === 2 && (
					<RenderTabs
						handleSubmitRegister={() => { }}
						handleClose={() => { }}
						isEditing={false}
						loading={false}
						data={quoteDataResponsed}
					/>
				)}
			</Card>
		</Box>
	);
};

export default Quotes;
