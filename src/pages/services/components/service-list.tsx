import { ServiceResponseDto } from "@/stateManagement/models/service/service-dto"
import { Box, Card, CardContent, Chip, IconButton, Stack, Typography } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import ChangeStateIcon from "@mui/icons-material/ChangeCircle"


interface ServiceListProps {
  services: ServiceResponseDto[]
	isLoading?: boolean
	onEdit?: (serviceId: number) => void
	onDelete?: (serviceId: number) => void
	onChangeState?: (data: ServiceResponseDto) => void
}

export function ServiceList({ services, isLoading, onEdit, onDelete, onChangeState }: ServiceListProps) {
  return (
    <Stack spacing={2}>
      {services.map((service) => (
        <Card
          key={service.id}
          variant="outlined"
          sx={{
            borderRadius: "8px",
            cursor: "default",
            "&:hover": {
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              bgcolor:  "transparent",
            },
          }}
        >
          <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
						<Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
							<Box sx={{ display: "flex", alignItems: "center" }}>
								<Typography variant="h6" component="h2" fontWeight="bold" sx={{ flexGrow: 1 }}>
									{service.name}
								</Typography>
								<IconButton
									size="small"
									onClick={() => onEdit && onEdit(service.id)}
								>
									<EditIcon fontSize="small" />
								</IconButton>
								<IconButton
									size="small"
									onClick={() => onDelete && onDelete(service.id)}
								>
									<DeleteIcon fontSize="small" />
								</IconButton>
								<IconButton
									size="small"
									onClick={() => onChangeState && onChangeState(service)}
								>
									<ChangeStateIcon fontSize="small" />
								</IconButton>
							</Box>
							<Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
								<Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
									{service.description}
								</Typography>
								<Chip
									label={service.state ? "Publicado" : "Borrador"}
									size="small"
									sx={{
										bgcolor: service.state ? "rgba(46, 204, 113, 0.1)" : "rgba(255, 99, 132, 0.1)",
										color: service.state ? "#2ecc71" : "#ff6384",
										fontWeight: "medium",
										borderRadius: "4px",
										marginLeft: 2,
									}}
								/>
							</Box>
						</Box>
          </CardContent>
        </Card>
      ))}
			{isLoading && (
				<Typography variant="body1" color="text.secondary">
					Cargando servicios...
				</Typography>
			)}
    </Stack>
  )
}
