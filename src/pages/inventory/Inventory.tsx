import { Card, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import "dayjs/locale/es";
import localize from "@/utils/localizer";
import Auth from "@/core/services/auth/auth";

function Inventory() {
  const userData= Auth.getUserInfo();
  return (
    <>
      <Card>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography>
            Pantalla inventario
          </Typography>
        </Box>
      </Card>
    </>
  );
}

export default Inventory;
