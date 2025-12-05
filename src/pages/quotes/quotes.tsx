import React, { useEffect, useState } from "react";
import {
	Box,
	Card,
	Typography,
	Tabs,
	Tab,
	Divider,
	Pagination,
} from "@mui/material";
import RenderTabs from "./components/render-tabs";
import { useLazyGetRequestMyServicesQuery } from "@/stateManagement/apiSlices/requestServiceApi";
import { RequestStatus } from "@/core/constants/requestStatus";


const Quotes = () => {
	const [tabIndex, setTabIndex] = useState(0);
	const [pagination, setPagination] = useState({ page: 1, pageSize: 10 })
	const [getQuotes, { data: res, isFetching:isLoading }] = useLazyGetRequestMyServicesQuery();

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setTabIndex(newValue);
	}

	useEffect(() => {
		getQuotes({ ...pagination, status: tabIndex === 0 ? undefined : tabIndex === 1 ? RequestStatus.REQUESTED : RequestStatus.IN_PROGRESS }).unwrap()
	}, [pagination, tabIndex])

	const totalPages = (total: number, pageSize: number) => {
		if (total === 0) return 1
		return Math.ceil(total / pageSize)
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

				<RenderTabs
					loading={isLoading}
					data={res?.data || []}
				/>
				{!isLoading && (
					<Pagination count={totalPages(res?.pageOptions.totalRows ?? 0, pagination.pageSize)} page={pagination.page} onChange={(_e, page) => setPagination({ ...pagination, page })} color="primary" sx={{ mt: 2 }} variant="outlined" shape="rounded" />
				)}
			</Card>
		</Box>
	);
};

export default Quotes;
