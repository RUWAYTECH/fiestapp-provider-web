import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

function LoadingLazy() {
    return (
        <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={2} direction="column" alignItems="center">
                <CircularProgress size={45} thickness={4} />
                <Typography variant="h6" component="div" sx={{ textAlign: 'center' }} >
                    Cargando
                </Typography>
            </Stack>
        </Box>
    );
}

export default LoadingLazy;