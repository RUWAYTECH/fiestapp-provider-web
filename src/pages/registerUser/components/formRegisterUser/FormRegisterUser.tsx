import React, { useState } from "react";
import { Button, Grid, TextField, FormControlLabel, Checkbox, InputAdornment, IconButton } from "@mui/material";
import * as modelConstants from "../../model/ConstantsRegister";
import { Controller, useForm } from "react-hook-form";
import CircularProgress from '@mui/material/CircularProgress';
import localize from '@/utils/localizer';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import paths from "@/core/constants/paths";
interface InputsProps {
    handleSubmitRegister: (data: any) => void;
    loading: boolean;
    data: any;
    isEditing: boolean;
    isDetail?: boolean;
    handleClose?: () => void;
}

const FormRegisterUser: React.FC<InputsProps> = ({ handleSubmitRegister,handleClose, isEditing = false, loading }) => {
    const navigate = useNavigate();
    const { control, handleSubmit, setValue, getValues, formState: { errors = {} }, trigger } = useForm({
        defaultValues: {
            ...modelConstants.initValues,
            [modelConstants.ROLE]: null,
        },
    });

    const [isChecked, setIsChecked] = useState(false);

    const handleClickCancelar = () => {
        navigate(paths.LOGIN);
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(show => !show)
    }


    return (
        <>
            <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(handleSubmitRegister)}
            >

                <Grid container direction="row" alignItems="center" spacing={2} marginBottom={1} >
                    <Grid item xs={12} sm={6} md={4}>
                        <Controller
                            control={control}
                            name={modelConstants.NAME}
                            rules=
                            {
                                {
                                    required: { value: true, message: localize('requiredInput') },
                                }
                            }
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    variant="outlined"
                                    id={modelConstants.NAME}
                                    name={modelConstants.NAME}
                                    label={localize('user.name')}
                                    error={!!errors[modelConstants.NAME]}
                                    helperText={errors[modelConstants.NAME]?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} >
                        <Controller
                            control={control}
                            name={modelConstants.LASTNAME}
                            rules=
                            {
                                {
                                    required: { value: true, message: localize('requiredInput') },
                                }
                            }
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    variant="outlined"
                                    id={modelConstants.LASTNAME}
                                    name={modelConstants.LASTNAME}
                                    label={localize('user.lastName')}
                                    error={!!errors[modelConstants.LASTNAME]}
                                    helperText={errors[modelConstants.LASTNAME]?.message}
                                />
                            )}
                        />
                    </Grid>                    
                    <Grid item xs={12} sm={6} md={4} >
                        <Controller
                            control={control}
                            name={modelConstants.DOCUMENT_IDENTIFICATION}
                            rules=
                            {
                                {
                                    required: { value: true, message: localize('requiredInput') },                                    
                                    pattern: {
                                        value: /^[0-9]\d{7}$/,
                                        message: localize('user.mensageDni'), 
                                      },
                                }
                            }
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    id={modelConstants.DOCUMENT_IDENTIFICATION}
                                    name={modelConstants.DOCUMENT_IDENTIFICATION}
                                    label={localize('user.documentIdentification')}
                                    error={!!errors[modelConstants.DOCUMENT_IDENTIFICATION]}
                                    helperText={errors[modelConstants.DOCUMENT_IDENTIFICATION]?.message}
                                    inputProps={{
                                        min: "0",
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} >
                        <Controller
                            control={control}
                            name={modelConstants.PHONE}
                            rules=
                            {
                                {
                                    required: { value: true, message: localize('requiredInput') },
                                }
                            }
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    type="number"
                                    variant="outlined"
                                    id={modelConstants.PHONE}
                                    name={modelConstants.PHONE}
                                    label={localize('user.phone')}
                                    error={!!errors[modelConstants.PHONE]}
                                    helperText={errors[modelConstants.PHONE]?.message}
                                    inputProps={{
                                        min: "0",
                                    }}
                                />
                            )}
                        />
                    </Grid>                   
                    <Grid item xs={12} sm={6} md={8} >
                        <Controller
                            control={control}
                            name={modelConstants.EMAIL}
                            rules=
                            {
                                {
                                    required: { value: true, message: localize('requiredInput') },
                                    pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, message: localize('user.mensageEmail') },
                                    
                                }
                            }
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    variant="outlined"
                                    id={modelConstants.EMAIL}
                                    name={modelConstants.EMAIL}
                                    label={localize('user.email')}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        field.onChange(value);
                                        setValue(modelConstants.USERNAME, value);
                                    }}
                                    error={!!errors[modelConstants.EMAIL]}
                                    helperText={errors[modelConstants.EMAIL]?.message}
                                />
                            )}
                        />
                    </Grid>                    
                    <Grid item xs={12} sm={6} md={6}>
                        <Controller
                            control={control}
                            name={modelConstants.PASSWORD}
                            rules={{
                                required: {
                                    value: true,
                                    message: localize('requiredInput'),
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type={showPassword ? 'text' : 'password'}
                                    id={modelConstants.PASSWORD}
                                    label={localize('user.password')}
                                    variant="outlined"
                                    placeholder={localize('login.passPlaceholder')}
                                    error={!!errors[modelConstants.PASSWORD]}
                                    helperText={errors[modelConstants.PASSWORD]?.message}
                                    margin="normal"
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
                    <Grid item xs={12} sm={6} md={6}>
                        <Controller
                            control={control}
                            name={modelConstants.CONFIRMED_PASSWORD}
                            rules={{
                                required: {
                                    value: true,
                                    message: localize('requiredInput'),
                                },
                                validate: {
                                    matchPassword: (value) => value === getValues(modelConstants.PASSWORD) || localize('user.passwordConfirmLabel'),
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type={showPassword ? 'text' : 'password'}
                                    id={modelConstants.CONFIRMED_PASSWORD}
                                    label={localize('user.passwordConfirm')}
                                    variant="outlined"
                                    placeholder={localize('login.passPlaceholder')}
                                    error={!!errors[modelConstants.CONFIRMED_PASSWORD]}
                                    helperText={errors[modelConstants.CONFIRMED_PASSWORD]?.message}
                                    margin="normal"
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
                                    onChange={(e) => {
                                        const confirmedPassword = e.target.value;
                                        setValue(modelConstants.CONFIRMED_PASSWORD, confirmedPassword);
                                        trigger(modelConstants.CONFIRMED_PASSWORD);
                                        if (confirmedPassword === getValues(modelConstants.PASSWORD)) {
                                            setValue(modelConstants.CONFIRMED, true);
                                        } else {
                                            setValue(modelConstants.CONFIRMED, false);
                                        }
                                    }}
                                />
                            )}
                        />
                    </Grid>                   
                </Grid>

                <Grid item xs={12} sm={6} md={4} sx={{ marginTop: '5%' }}>
                    <Controller
                        control={control}
                        name={modelConstants.CONFIRMED_POLICE}
                        rules=
                        {
                            {
                                required: { value: false, message: localize('requiredInput') }
                            }
                        }
                        render={({ field }) => (
                            <FormControlLabel
                                label={localize('user.termsAndConditions')}
                                control={
                                    <Checkbox {...field}
                                        id={modelConstants.CONFIRMED_POLICE}
                                        name={modelConstants.CONFIRMED_POLICE}
                                        checked={field.value}
                                        onChange={(e) => {
                                            if (e.target.checked === false) {
                                                setIsChecked(false);
                                                setValue(modelConstants.CONFIRMED_POLICE, e.target.checked)
                                            } else {
                                                setValue(modelConstants.CONFIRMED_POLICE, e.target.checked)
                                                setIsChecked(true);
                                            }
                                        }
                                        }
                                    />}
                            />
                        )}
                    />
                </Grid>

                <Grid container direction="row" style={{ justifyContent: 'flex-end' }} alignItems="center" spacing={2} marginBottom={4} marginTop={4}>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <Button variant="contained" color="secondary" fullWidth
                            onClick={handleClose}>
                            {localize('common.cancel')}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <Button variant="contained" color="primary" fullWidth type="submit" disabled={!isChecked || loading} startIcon={loading && <CircularProgress size={20} />}>
                            {isEditing ? 'Guardar cambios' : 'Guardar'}
                        </Button>
                    </Grid>
                </Grid>

            </form>
        </>
    );
};
export default FormRegisterUser;