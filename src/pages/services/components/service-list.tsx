import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material"
import type { Service } from "../services"

interface ServiceListProps {
  services: Service[]
  onServiceClick?: (service: Service) => void
}

export function ServiceList({ services, onServiceClick }: ServiceListProps) {
  return (
    <Stack spacing={2}>
      {services.map((service) => (
        <Card
          key={service.id}
          variant="outlined"
          sx={{
            borderRadius: "8px",
            cursor: onServiceClick ? "pointer" : "default",
            "&:hover": {
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              bgcolor: onServiceClick ? "rgba(0,0,0,0.01)" : "transparent",
            },
          }}
          onClick={() => onServiceClick && onServiceClick(service)}
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
              label={service.isActive ? "Activo" : "Inactivo"}
              size="small"
              sx={{
                bgcolor: service.isActive ? "rgba(46, 204, 113, 0.1)" : "rgba(255, 99, 132, 0.1)",
                color: service.isActive ? "#2ecc71" : "#ff6384",
                fontWeight: "medium",
                borderRadius: "4px",
              }}
            />
          </CardContent>
        </Card>
      ))}
    </Stack>
  )
}
