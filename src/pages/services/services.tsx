import { Box, Button, Card, Typography } from "@mui/material"
import { useState } from "react"
import { ServiceList } from "./components/service-list"
import AddIcon from "@mui/icons-material/Add"
import GenericModal from "@/components/ui/genericModal/GenericModal"
import ServiceForm from "./components/service-form"

export interface Service {
  id: string
  name: string
  description: string
  isActive: boolean
}

const Services = () => {
	const [services] = useState<Service[]>([
    {
      id: "1",
      name: "Paquete Básico de Catering",
      description: "Servicio de catering para hasta 50 personas",
      isActive: true,
    },
    {
      id: "2",
      name: "Paquete Premium de Catering",
      description: "Servicio de catering gourmet para eventos especiales",
      isActive: false,
    },
  ])
	const [showFormModal, setShowFormModal] = useState(false)

	const handleAddService = () => {
    // Implementation for adding a new service would go here
    console.log("Add service clicked")
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

      <ServiceList services={services} />

			<GenericModal
				open={showFormModal}
				size={'90%'}
				title={"Agregar Servicio"}
			>
				<ServiceForm
					onCancel={() => setShowFormModal(false)}
					onSave={handleAddService}
				/>
			</GenericModal>
		</Card>
	)
}

export default Services