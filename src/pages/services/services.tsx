import { Box, Button, Card, Pagination, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { ServiceList } from "./components/service-list"
import AddIcon from "@mui/icons-material/Add"
import GenericModal from "@/components/ui/genericModal/GenericModal"
import ServiceForm from "./components/service-form"
import { useCustomCreateServiceMutation, useLazyGetMyServicesQuery } from "@/stateManagement/apiSlices/serviceApi"
import { ServiceRequestDto } from "@/stateManagement/models/service/service-dto"
import { dispatchNotifyStackError, dispatchNotifyStackSuccess } from "@/core/services/notistack"

const Services = () => {
	const [getMyServices, { data: res, isLoading }] = useLazyGetMyServicesQuery()
	const [pagination, setPagination] = useState({ page: 1, pageSize: 10 })
	const [createService, { isLoading: isCreating }] = useCustomCreateServiceMutation()

	const [showFormModal, setShowFormModal] = useState(false)

	const handleAddService = (data: ServiceRequestDto) => {
		createService(data).unwrap().then(() => {
			setShowFormModal(false)
			dispatchNotifyStackSuccess("Servicio creado correctamente")
		}).catch(() => {
			dispatchNotifyStackError("Error al crear el servicio")
		})
  }

	useEffect(() => {
		getMyServices(pagination)
	}, [pagination])

	// calc total pages, params: total, pageSize
	const totalPages = (total: number, pageSize: number) => {
		if (total === 0) return 1
		return Math.ceil(total / pageSize)
	}

	return (
		<Card sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" component="h1" fontWeight="bold">
          Mis Servicios
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowFormModal(true)}
					color="primary"
        >
          Agregar Servicio
        </Button>
      </Box>

      <ServiceList services={res?.data ?? []} isLoading={isLoading} />
			{!isLoading && (
				<Pagination count={totalPages(res?.meta?.pagination.total ?? 0, pagination.pageSize)} page={pagination.page} onChange={(_e, page) => setPagination({ ...pagination, page })} color="primary" sx={{ mt: 2 }} variant="outlined" shape="rounded" />
			)}

			<GenericModal
				open={showFormModal}
				size={'90%'}
				title={"Agregar Servicio"}
			>
				<ServiceForm
					onCancel={() => setShowFormModal(false)}
					isLoading={isCreating}
					onSave={handleAddService}
				/>
			</GenericModal>
		</Card>
	)
}

export default Services