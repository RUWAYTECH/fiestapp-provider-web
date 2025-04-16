
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {SnackbarProvider, useSnackbar} from 'notistack'
import GlobalSnackbar from '../GlobalSnackBar';

const  SnackbarCloseButton: React.FC<any> = ({ snackbarKey }) =>{
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <CloseIcon style={{ color: 'white' }} />
    </IconButton>
  );
}

const NotistackProvider: React.FC<any>  = ({children}) => {

  return (
    <SnackbarProvider  
      action={(snackbarKey: any) => <SnackbarCloseButton snackbarKey={snackbarKey} />}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
     >
      <GlobalSnackbar />
      {children}
    </SnackbarProvider>
  )
}

export default NotistackProvider