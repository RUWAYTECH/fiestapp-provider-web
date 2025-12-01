import { Box, Button, Card, Pagination, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { ServiceList } from "./components/service-list"
import AddIcon from "@mui/icons-material/Add"
import GenericModal from "@/components/ui/genericModal/GenericModal"
import ServiceForm from "./components/service-form"
import { useChangeStateServiceMutation, useCustomCreateServiceMutation, useCustomUpdateServiceMutation, useDeleteServiceMutation, useLazyGetMyServicesQuery, useLazyGetServiceByIdQuery } from "@/stateManagement/apiSlices/serviceApi"
import { ServiceRequestDto, ServiceResponseDto } from "@/stateManagement/models/service/service-dto"
import { dispatchNotifyStackError, dispatchNotifyStackSuccess } from "@/core/services/notistack"
import { closeInstanceModal, launchInstanceModal } from "@/core/services/modalService"
import baseModalOptions from "@/utils/baseOptionsInstanceModal"
import localize from "@/utils/localizer"

const Services = () => {
	const [editData, setEditData] = useState<ServiceResponseDto | null>(null)

	const [getMyServices, { data: res, isLoading }] = useLazyGetMyServicesQuery()
	const [pagination, setPagination] = useState({ page: 1, pageSize: 10 })
	const [createService, { isLoading: isCreating }] = useCustomCreateServiceMutation()
	const [getService] = useLazyGetServiceByIdQuery()
	const [updateService] = useCustomUpdateServiceMutation()
	const [deleteService] = useDeleteServiceMutation()
	const [changeStateService] = useChangeStateServiceMutation()

	const [showFormModal, setShowFormModal] = useState(false)

	const handleSubmit = (data: ServiceRequestDto) => {
		if (editData) {
			handleUpdateService(editData.id, data)
		} else {
			handleAddService(data)
		}
	}

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
	const totalPages = (total: number | undefined, pageSize: number) => {
		if (total === 0) return 1
		if (!total) return 0
		return Math.ceil(total / pageSize)
	}

	const handleDeleteService = (serviceId: string) => {
		launchInstanceModal(
			baseModalOptions.confirm({
				onClickOk: () => {
					deleteService(serviceId).unwrap().then(() => {
						dispatchNotifyStackSuccess("Servicio eliminado correctamente")
					}).catch(() => {
						dispatchNotifyStackError("Error al eliminar el servicio")
					})
					closeInstanceModal()
				},
				title: localize("common.deleteMessage"),
				cancelText: localize("common.no"),
				subtitle: "",
				subtitle2: "",
				okText: localize("common.yes"),
			})
		);
	}

	const handleEditService = (serviceId: string) => {
		getService(serviceId).unwrap().then((res) => {
			setEditData(res.data)
			setShowFormModal(true)
		}).catch(() => {
			dispatchNotifyStackError("Error al obtener el servicio")
		})
	}

	const handleUpdateService = (id: string, data: ServiceRequestDto) => {
		updateService({ id, data }).unwrap().then(() => {
			setShowFormModal(false)
			setEditData(null)
			dispatchNotifyStackSuccess("Servicio actualizado correctamente")
		}).catch(() => {
			dispatchNotifyStackError("Error al actualizar el servicio")
		})
	}

	const handleChangeState = (data: ServiceResponseDto) => {
		launchInstanceModal(
			baseModalOptions.confirm({
				onClickOk: () => {
					changeStateService(data.id).unwrap().then(() => {
						dispatchNotifyStackSuccess(`Servicio ${data.status ? "guardado como borrador" : "publicado"} correctamente`)
					}).catch(() => {
						dispatchNotifyStackError("Error al cambiar el estado del servicio")
					})

					closeInstanceModal()
				},
				title: `Estás seguro de ${data.status ? "guardar como borrador" : "publicar"} el servicio?`,
				cancelText: localize("common.no"),
				subtitle: "",
				subtitle2: "",
				okText: localize("common.yes"),
			})
		);
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

      <ServiceList services={res?.data ?? []} isLoading={isLoading} onDelete={handleDeleteService} onEdit={handleEditService} onChangeState={handleChangeState} />
			{!isLoading && (
				<Pagination count={totalPages(res?.pageOptions.totalRows, pagination.pageSize)} page={pagination.page} onChange={(_e, page) => setPagination({ ...pagination, page })} color="primary" sx={{ mt: 2 }} variant="outlined" shape="rounded" />
			)}

			<GenericModal
				open={showFormModal}
				size={'90%'}
				title={"Agregar Servicio"}
			>
				<ServiceForm
					data={editData}
					onCancel={() => setShowFormModal(false)}
					isLoading={isCreating}
					onSave={handleSubmit}
				/>
			</GenericModal>
		</Card>
	)
}

export default Services