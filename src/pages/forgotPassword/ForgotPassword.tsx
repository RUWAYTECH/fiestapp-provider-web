import React, { useState } from "react";
import { Box, Card, CardContent, Grid, Typography, TextField, Button, Divider, Link } from '@mui/material';
import localize from '@/utils/localizer';
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import paths from "@/core/constants/paths";
import { useForgotPasswordMutation } from "../../stateManagement/apiSlices/userApi";
import LogoApartment from '@/assets/logoProject.png';
import useStyles from './ForgotPasword.styles'
import * as modelConstants from "./model/ConstantsForgot";

const Forgot: React.FC = () => {
    const navigate = useNavigate();
    const styles = useStyles();
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const [emailError, setEmailError] = useState('');

    const {
        handleSubmit,
        control,
        setError,
        clearErrors,
        formState: { errors = {} },
    } = useForm({ defaultValues: { ...modelConstants.initValues } });



    const handleSubmitForm = (data: any) => {
        if (!data.email) {
            setEmailError('Introduce una dirección de correo electrónico');
            return;
        }
        clearErrors('email');
        setEmailError('');
        forgotPassword(data)
            .unwrap()
            .then(() => {
                navigate(paths.RESET)
            })
            .catch((err: any) => {
                if (err?.data.error.name) {
                    const errorMessage = 'No se ha podido encontrar tu cuenta';
                    setEmailError(errorMessage);
                    setError('email', { type: 'manual', message: errorMessage });
                }
            });
    };
    const handleLogin = () => {
        navigate(paths.LOGIN);
    };
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Card className={styles.classes.card}>
                    <CardContent>
                        <Grid item md={6} xs={12} sx={{ padding: { xs: '20px' } }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <img src={LogoApartment} alt="logo" className={styles.classes.logo} />
                                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1 }} className={styles.classes.typographyh6}>
                                    Template react web
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }} className={styles.classes.typographyh5}>
                                    ¿Has olvidado tu contraseña?
                                </Typography>
                                <Typography sx={{ textAlign: 'center', mb: 4 }} className={styles.classes.typography}>
                                    Ingrese su dirección de correo electrónico a continuación y le enviaremos un codigo para restablecer su contraseña.
                                </Typography>

                                <Box sx={{ width: '100%', maxWidth: '500px' }}>
                                    <form onSubmit={handleSubmit(handleSubmitForm)}>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <Controller
                                                control={control}
                                                name={modelConstants.USER_EMAIL}
                                                rules=
                                                {
                                                    {
                                                        pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, message: localize('user.mensageEmails') },
                                                    }
                                                }
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        fullWidth
                                                        variant="outlined"
                                                        id={modelConstants.USER_EMAIL}
                                                        label={'Correo electrónico/nombre de usuario'}
                                                        autoComplete="off"
                                                        error={Boolean(emailError)}
                                                        helperText={(errors.email && errors.email.message) || emailError}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            disabled={isLoading}
                                            sx={{ mt: 2, textTransform: 'uppercase' }}
                                        >
                                            Enviar correo
                                        </Button>
                                    </form>
                                    <br />
                                    <Divider />
                                    <Grid container justifyContent="center" gap={2} marginTop={2}>
                                        <Grid item>
                                            <Typography variant="subtitle1">
                                                <Link
                                                    onClick={handleLogin}
                                                    color="inherit"
                                                    underline="none"
                                                    fontWeight="bold"
                                                    sx={{
                                                        textDecoration: 'none',
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            color: 'secondary',
                                                            textDecoration: 'underline',
                                                        },
                                                    }}
                                                >
                                                    {'¿Ya tienes una cuenta?'}
                                                </Link>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
export default Forgot;