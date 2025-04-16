import { Card, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import localize from "@/utils/localizer";
import Auth from "@/core/services/auth/auth";

function Dashboard() {
  const userData = Auth.getUserData();
  let username = userData?.username;

  return (
    <>
      <Card>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography>
            {localize("login.welcome")}{username}
          </Typography>
        </Box>
      </Card>
    </>
  );
}

export default Dashboard;
