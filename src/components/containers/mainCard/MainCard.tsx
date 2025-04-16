import { Card, Container, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";

type MainProps = {
  children?: ReactNode;
  title?: string;
};

const MainCard: React.FC<MainProps> = ({ children, title }) => {
  return (
    <>
      <Card>
        <Grid style={{ margin: "30px", marginTop: "40px" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
        </Grid>
        <Container maxWidth="xl">{children}</Container>
      </Card>
    </>
  );
};

export default MainCard;
