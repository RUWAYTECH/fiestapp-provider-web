import { Box, Typography } from "@mui/material";
import { RequestServiceRequestDto, RequestServiceResponseDto } from "@/stateManagement/models/request-service/request-service-dto";
import QuoteCard from "./quote-card";
import { useCustomUpdateRequestServiceMutation } from "@/stateManagement/apiSlices/requestServiceApi";
import { dispatchNotifyStackError, dispatchNotifyStackSuccess } from "@/core/services/notistack";

interface TabsProps {
	loading: boolean;
	data: RequestServiceResponseDto[];
}

const RenderTabs: React.FC <TabsProps> = ({ loading, data}) => {
	const [updateRequestService, { isLoading }] = useCustomUpdateRequestServiceMutation();

	const isEditable = (status: string) => status === "Solicitado"

	if (loading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
				<Typography variant="h6">Cargando...</Typography>
			</Box>
		);
	}

	const handleSubmitForm = (refData: RequestServiceResponseDto, formData: { id: number, budget: string; comment: string; quantity: number; serviceId: number }[]) => {
		const formattedData: RequestServiceRequestDto = {
			message: refData.message,
			approximateBudget: refData.approximateBudget,
			numberInvite: refData.numberInvite,
			totalPrice: refData.totalPrice,
			registerDate: refData.registerDate,
			//entityStatus: refData.entityStatus,
			entityStatus: 'En proceso',
			//provider: '',
			requestServiceDetail: formData.map((item) => ({
				id: item.id,
				comment: item.comment,
				quantity: item.quantity,
				priceFinal: parseFloat(item.budget.replace(/[^0-9.-]+/g, "")),
				service: item.serviceId,
			})),
		}

		updateRequestService({ id: refData.id, data: formattedData })
			.unwrap()
			.then(() => {
				dispatchNotifyStackSuccess("Cotización actualizada correctamente");
			})
			.catch(() => {
				dispatchNotifyStackError("Error al actualizar la cotización");
			});
	}

	return (
		<Box>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				{data.map((quote) => (
					<QuoteCard
						key={quote.id}
						quote={quote}
						isEditable={isEditable}
						onSubmit={(formData) => handleSubmitForm(quote, formData)}
						updating={isLoading}
					/>
				))}
			</Box>
		</Box>
	);
};

export default RenderTabs;