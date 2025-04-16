import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CloudDowloadIcon from '@mui/icons-material/CloudDownload';
import localize from '@/utils/localizer';

interface IImageContainerProps {
    url: string;
    closeModal?: () => void;
}
function ImageContainer({ url, closeModal }: IImageContainerProps) {

    const handleDownload = () => {
        window.open(url, '_blank');
    };
    return (
        <Grid container sx={{ marginTop: 0 }} spacing={2}>
            <Grid xs={12} item>
                <Grid container spacing={2}>
                    <Grid xs={12} item>
                        <div style={{ width: '60vw', overflowY: 'auto', height: '70vh' }}>
                            <img src={url} alt="logo" style={{ width: '100%', height: '100%', borderRadius: 10, border: '1px solid #ccc', objectFit: 'contain' }} />
                        </div>
                    </Grid>
                    <Grid xs={4} item>
                        <Button variant="outlined" color="primary" startIcon={<CloudDowloadIcon />} onClick={handleDownload} fullWidth>
                            {localize('common.print')}
                        </Button>
                    </Grid>
                    <Grid xs={4} item></Grid>
                    <Grid xs={4} item>
                        <Button variant="contained" color="secondary" onClick={closeModal} fullWidth>
                            {localize('common.close')}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
export default ImageContainer;