import React, { useState } from "react";
import { Box, Card, CardContent, Grid, Typography, TextField, Button, Divider, Link, IconButton, InputAdornment } from '@mui/material';
import localize from '@/utils/localizer';
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import paths from "@/core/constants/paths";
import { useResetPasswordMutation } from "../../stateManagement/apiSlices/userApi";
import { dispatchNotifyStackSuccess } from "../../core/services/notistack";
import LogoApartment from '@/assets/logoProject.png';
import useStyles from './ResetPassword.styles'
import * as modelConstants from "@/pages/resetPassword/model/ConstantsReset";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const styles = useStyles();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const [codeError, setCodeError] = useState('');

    const {
        handleSubmit,
        control,
        setError,
        clearErrors,
        getValues,
        formState: { errors = {} },
    } = useForm({ defaultValues: { ...modelConstants.initValues } });

    const handleSubmitForm = (data: any) => {
        if (!data.code) {
            setCodeError('Introduce un codigo');
            return;
        }
        clearErrors('code');
        setCodeError('');
        resetPassword(data)
            .unwrap()
            .then(() => {
                dispatchNotifyStackSuccess(localize('login.success'))
                navigate(paths.LOGIN)
            })
            .catch((err: any) => {
                if (err?.data.error.name) {
                    const errorMessage = 'El codigo Ingresado es Incorrecto';
                    setCodeError(errorMessage);
                    setError('code', { type: 'manual', message: errorMessage });
                }
            });
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(show => !show)
    }

    const handleLogin = () => {
        navigate(paths.LOGIN);
    };

    return (
        <>
            <Box className={styles.classes.box} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Card className={styles.classes.card}>
                    <CardContent>
                        <Grid item md={6} xs={12} sx={{ padding: { xs: '15px' } }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <img src={LogoApartment} alt="logo" className={styles.classes.logo} />
                                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1 }} className={styles.classes.typographyh6}>
                                    Template react web
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1 }} className={styles.classes.typographyh5}>
                                    Hola revisa tu correo
                                </Typography>
                                <Typography sx={{ textAlign: 'center', mb: 1 }} className={styles.classes.typography}>
                                    Le hemos enviado un codigo para recuperar su contraseña a su correo electrónico.
                                </Typography>
                                <Box sx={{ width: '100%', maxWidth: '500px' }}>
                                    <form onSubmit={handleSubmit(handleSubmitForm)}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} sm={12} md={12}>
                                                <Controller
                                                    control={control}
                                                    name={modelConstants.USER_PASSWORD}
                                                    rules=
                                                    {
                                                        {
                                                            required: {
                                                                value: true,
                                                                message: localize('requiredInput'),
                                                            },
                                                        }
                                                    }
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            type={showPassword ? 'text' : 'password'}
                                                            id={modelConstants.USER_PASSWORD}
                                                            label={localize('user.password')}
                                                            variant="outlined"
                                                            placeholder={localize('login.passPlaceholder')}
                                                            error={Boolean(errors[modelConstants.USER_PASSWORD])}
                                                            helperText={errors[modelConstants.USER_PASSWORD]?.message}
                                                            fullWidth
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <IconButton onClick={handleShowPassword} edge="end">
                                                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12}>
                                                <Controller
                                                    control={control}
                                                    name={modelConstants.USER_PASSWORD_CONFIRM}
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: localize('requiredInput'),
                                                        },
                                                        validate: value =>
                                                            value === getValues(modelConstants.USER_PASSWORD) || false
                                                    }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            type={showPassword ? 'text' : 'password'}
                                                            id={modelConstants.USER_PASSWORD_CONFIRM}
                                                            label={localize('user.passwordConfirm')}
                                                            variant="outlined"
                                                            placeholder={localize('login.passPlaceholder')}
                                                            error={Boolean(errors[modelConstants.USER_PASSWORD_CONFIRM])}
                                                            helperText={errors[modelConstants.USER_PASSWORD_CONFIRM] ? localize('registerUser.passwordConfirmLabel') : ''}
                                                            fullWidth
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <IconButton onClick={handleShowPassword} edge="end">
                                                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12}>
                                                <Controller
                                                    control={control}
                                                    name={modelConstants.CODE}
                                                    rules=
                                                    {
                                                        {
                                                            required: { value: true, message: localize('requiredInput') }
                                                        }
                                                    }
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            fullWidth
                                                            variant="outlined"
                                                            id={modelConstants.CODE}
                                                            label={'Codigo'}
                                                            autoComplete="off"
                                                            error={Boolean(errors[modelConstants.CODE]) || Boolean(codeError)}
                                                            helperText={errors[modelConstants.CODE]?.message || codeError}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            disabled={isLoading}
                                            sx={{ mt: 2, textTransform: 'uppercase' }}
                                        >
                                            Guardar
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
export default ResetPassword;