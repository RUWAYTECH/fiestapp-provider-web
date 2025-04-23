import React, { useEffect, useState } from "react";
import {
	Box,
	Card,
	Typography,
	Tabs,
	Tab,
	Divider,
} from "@mui/material";
import RenderTabs from "./components/render-tabs";
import { useLazyGetRequestMyServicesQuery } from "@/stateManagement/apiSlices/requestServiceApi";


const Quotes = () => {
	const [tabIndex, setTabIndex] = useState(0);
	const [pagination, setPagination] = useState({ page: 1, pageSize: 10 })
	const [getQuotes, { data: res, isLoading }] = useLazyGetRequestMyServicesQuery();

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabIndex(newValue);
	}

	useEffect(() => {
		getQuotes({ ...pagination, state: tabIndex === 0 ? undefined : tabIndex === 1 ? 'Solicitado' : 'En proceso' }).unwrap()
	}, [pagination, tabIndex])

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
						loading={isLoading}
						data={res?.data || []}
					/>
				)}
				{tabIndex === 1 && (
					<RenderTabs
						handleSubmitRegister={() => { }}
						handleClose={() => { }}
						isEditing={false}
						loading={isLoading}
						data={res?.data || []}
					/>
				)}
				{tabIndex === 2 && (
					<RenderTabs
						handleSubmitRegister={() => { }}
						handleClose={() => { }}
						isEditing={false}
						loading={isLoading}
						data={res?.data || []}
					/>
				)}
			</Card>
		</Box>
	);
};

export default Quotes;
