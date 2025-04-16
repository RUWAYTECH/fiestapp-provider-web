import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/core/constants';

function NotFound() {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
            <Grid container rowSpacing={2} mx={2}>
                <Grid item xs={12} sm={4} sx={{ margin: '0 auto' }}>
                    <Typography variant="h1" sx={{ textAlign: 'center', fontSize: '10rem', fontWeight: 'bold' }} color={'error'} >
                        404
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }} >
                        OPS!...
                    </Typography>
                    <Typography variant="h4" component="div" gutterBottom>
                        Pagina no encontrada
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        La pagina que buscas no existe o no esta disponible
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ margin: '0 auto' }}>
                    <Button variant="contained" onClick={() => navigate(paths.LOGIN)} fullWidth startIcon={<HomeIcon />}>
                        Ir al inicio
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default NotFound;
