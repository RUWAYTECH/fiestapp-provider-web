import { Box, Typography } from "@mui/material";
import { RequestServiceRequestDto, RequestServiceResponseDto } from "@/stateManagement/models/request-service/request-service-dto";
import QuoteCard from "./quote-card";
import { useCustomUpdateRequestServiceMutation } from "@/stateManagement/apiSlices/requestServiceApi";
import { dispatchNotifyStackError, dispatchNotifyStackSuccess } from "@/core/services/notistack";
import { RequestStatus } from "@/core/constants/requestStatus";

interface TabsProps {
	loading: boolean;
	data: RequestServiceResponseDto[];
}

const RenderTabs: React.FC <TabsProps> = ({ loading, data}) => {
	const [updateRequestService, { isLoading }] = useCustomUpdateRequestServiceMutation();

	const isEditable = (status: RequestStatus) => status === RequestStatus.REQUESTED

	if (loading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
				<Typography variant="h6">Cargando...</Typography>
			</Box>
		);
	}

	const handleSubmitForm = (refData: RequestServiceResponseDto, formData: { id: string, budget: string; comment: string; quantity: number; serviceId: string }[]) => {
		const formattedData: RequestServiceRequestDto = {
			items: formData.map((item) => ({
				id: item.id,
				priceFinal: parseFloat(item.budget),
				comment: item.comment,
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