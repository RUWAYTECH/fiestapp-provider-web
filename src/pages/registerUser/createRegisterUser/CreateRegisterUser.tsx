import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import localize from "@/utils/localizer";
import { httpStatusCodes, paths } from "@/core/constants";
import { dispatchNotifyStack, dispatchNotifyStackError, dispatchNotifyStackSuccess } from "@/core/services/notistack";
import FormRegisterUser from "../components/formRegisterUser/FormRegisterUser";
import LogoApartment from '@/assets/logoProject.png';
import useStyles from './CreateRegisterUser.styles'
import { useNavigate } from 'react-router-dom';
import { userError } from "@/utils/format";
interface InputsProps {
    isLoading?: boolean;
    handleClose?: () => void;
    isEditing?: boolean;
}

const CreateRegisterUser: React.FC<InputsProps> = ({ handleClose }: any) => {
    const styles = useStyles();
    const navigate = useNavigate();
    const handleCerrarModal = () => {
        handleClose();
      };

    const handleSubmitAdd = (data: any) => {
        // addUser({ ...data }).unwrap()
        //     .then((res) => {
        //         let dataUser = data;
        //         dataUser.owner = res.id;
        //         dispatchNotifyStackSuccess(localize('registerUser.resgisterSuccesfull'));
        //         addResidentUser({
        //             data: {
        //                 ...dataUser,
        //             }
        //         }).unwrap()
        //             .then((res) => {
        //                 navigate(paths.LOGIN)
        //                 dispatchNotifyStackSuccess(localize('registerUser.resgisterResident'));
        //             }).catch((error) => {
        //                 const messages = error.data!.data!.attributes!.message ?? localize('common.error');
        //                 dispatchNotifyStackError(messages);
        //                 navigate(paths.LOGIN)
        //             });
        //     }).catch((error) => {
        //         const errorPath = error.data.error.message;
        //         userError(errorPath);
        //     });

    };

    return (
        <>
            <Box sx={{ p: { xs: 1, sm: 4, md: 8 } }}>
                <Grid container alignItems="center">
                    <Grid item xs={12} sm={3} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                        <img src={LogoApartment} alt="logo" className={styles.classes.image} />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" gutterBottom>
                            {localize('user.title.create')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                </Grid>
                <Divider />
                <br />
                <FormRegisterUser
                    handleSubmitRegister={handleSubmitAdd}
                    loading={ false}
                    data={null}
                    isEditing={false}
                    handleClose={handleCerrarModal}
                />
            </Box>
        </>
    );
};

export default CreateRegisterUser;
