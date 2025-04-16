import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PreviousIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function NotAuthorized() {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: 'calc(100vh - 96px)' }}>
            <Grid container rowSpacing={2}>
                <Grid item xs={12} sm={4} sx={{ margin: '0 auto' }}>
                    <Typography variant="h1"  sx={{ textAlign: 'center', fontSize: '10rem', fontWeight: 'bold'}} color={'info.main'} >
                        403
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" component="div" gutterBottom>
                        Pagina no autorizada
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        No tienes permisos para acceder a esta pagina
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ margin: '0 auto' }}>
                    <Button variant="contained" onClick={() => navigate(-1)} fullWidth startIcon={<PreviousIcon />}>
                        Regresar a la pagina anterior
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default NotAuthorized;
