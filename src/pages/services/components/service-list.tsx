import { ServiceResponseDto } from "@/stateManagement/models/service/service-dto"
import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material"

interface ServiceListProps {
  services: ServiceResponseDto[]
	isLoading?: boolean
}

export function ServiceList({ services, isLoading }: ServiceListProps) {
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
            <Box>
              <Typography variant="h6" component="h2" fontWeight="bold">
                {service.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {service.description}
              </Typography>
            </Box>
            <Chip
              label={service.publishedAt ? "Publicado" : "Borrador"}
              size="small"
              sx={{
                bgcolor: service.publishedAt ? "rgba(46, 204, 113, 0.1)" : "rgba(255, 99, 132, 0.1)",
                color: service.publishedAt ? "#2ecc71" : "#ff6384",
                fontWeight: "medium",
                borderRadius: "4px",
								marginLeft: 2,
              }}
            />
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
