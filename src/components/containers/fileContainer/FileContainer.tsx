import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import localize from '@/utils/localizer';
interface IFileContainerProps {
    loading?: boolean;
    path?: any;
    onCloseModal?: () => void;
}
function FileContainer({ loading, path, onCloseModal }: IFileContainerProps) {
    const urlBlod = (): string => {
        let base_url = import.meta.env.VITE_BASE_URL;
        return base_url + path.pdfPath;
    }
    
    return (
        <>
            <Grid container sx={{ marginTop: 0 }} spacing={2}>
                <Grid xs={12} item>
                    <Grid container rowSpacing={2}>
                        {loading ? <CircularProgress color='inherit' /> :
                            <Grid xs={12} item sx={{ width: '70vw' }}>
                                <iframe title='a' src={urlBlod()} style={{ width: '100%', height: '70vh', borderRadius: 10, border: '1px solid #ccc' }} />
                            </Grid>
                        }
                        <Grid xs={8} item></Grid>
                        <Grid xs={4} item>
                            <Button variant="contained" color="secondary" onClick={onCloseModal} fullWidth>
                                {localize('common.close')}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default FileContainer;