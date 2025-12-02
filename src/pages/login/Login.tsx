import logo from "@/assets/logo.png";
import Apartment from "@/assets/portada.jpg";
import CustomInput from "@/components/ui/input/CustomInput";
import useYupValidationResolver from "@/core/hooks/useYupValidationResolver";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
	Box,
	Button,
	Divider,
	Grid,
	IconButton,
	InputAdornment,
	Link,
	TextField,
	Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { GoogleLogin } from '@react-oauth/google';
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { httpStatusCodes, paths } from "../../core/constants";
import Auth from "../../core/services/auth/auth";
import {
	dispatchNotifyStack,
	dispatchNotifyStackError,
} from "../../core/services/notistack";
import {
	useGoogleLoginMutation,
	useLoginMutation,
} from "../../stateManagement/apiSlices/userApi";;
import localize from "../../utils/localizer";
import useStyles from "./Login.styles";
import * as userConstants from "./model/LoginConstants";

const schema = Yup.object().shape({
	[userConstants.USER_NAME]: Yup.string().required(
		localize("common.fieldRequired")
	),
	[userConstants.PASSWORD]: Yup.string().required(
		localize("common.fieldRequired")
	),
});

const Login: React.FC = () => {
	const navigate = useNavigate();
	const styles = useStyles();
	const resolver = useYupValidationResolver(schema);
	const [showPassword, setShowPassword] = useState(false);

	const [login, { isLoading }] = useLoginMutation();
	const [googleLogin] = useGoogleLoginMutation();

	const { handleSubmit, control, formState: { errors } } = useForm<{ email: string; password: string }>({
		defaultValues: { email: '', password: '' },
		resolver,
	});

	/* const loginGoogle = useGoogleLogin({
		onSuccess: (credentialResponse) => {
			if (!credentialResponse?.access_token) return;

			googleLogin(credentialResponse.access_token)
				.unwrap()
				.then((res) => {
					Auth.setUserToken(res.data.token);
					Auth.setUserInfo(res.data.user);
					navigate(paths.DASHBOARD);
				})
				.catch(() => {
					dispatchNotifyStack({ message: localize("login.error") }, httpStatusCodes.BAD_REQUEST);
				});
		},
		onError: () => {
			dispatchNotifyStack({ message: localize("login.error") }, httpStatusCodes.BAD_REQUEST);
		}
	}); */

	const handleSubmitForm = (data: { email: string; password: string }) => {
		Auth.logout();
		login(data)
			.unwrap()
			.then((res) => {
				Auth.setUserToken(res.data.token);
				Auth.setUserInfo(res.data.user);
				navigate(paths.DASHBOARD);
			})
			.catch(res => {
				if (Array.isArray(res?.data?.messages) && res?.data?.messages.length > 0) {
					res?.data?.messages.forEach((msg: { message: string }) => {
						dispatchNotifyStackError(msg?.message)
					})
				} else {
					dispatchNotifyStack({ message: localize("login.error") }, httpStatusCodes.BAD_REQUEST);
				}
			});
	};

	const handleShowPassword = () => setShowPassword((show) => !show);
	const handleRegister = () => navigate(paths.REGISTER);

	const handleProviderSignIn = (token: string | undefined) => {
		if (!token) return;
		googleLogin(token)
			.unwrap()
			.then((res) => {
				Auth.setUserToken(res.data.token);
				Auth.setUserInfo(res.data.user);
				navigate(paths.DASHBOARD);
			})
			.catch(res => {
				if (Array.isArray(res?.data?.messages) && res?.data?.messages.length > 0) {
					res?.data?.messages.forEach((msg: { message: string }) => {
						dispatchNotifyStackError(msg?.message)
					})
				} else {
					dispatchNotifyStack({ message: localize("login.error") }, httpStatusCodes.BAD_REQUEST);
				}
			});
	};

	return (
		<Box>
			<Grid container sx={{ height: "100vh", overflow: "hidden" }}>
				<Grid item md={6} sx={{ display: { xs: "none", md: "block" } }}>
					<img
						src={Apartment}
						alt="apartment"
						className={styles.classes.image}
					/>
				</Grid>
				<Grid item md={6} xs={12} sx={{ paddingX: { xs: "20px" } }}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							height: "100%",
							maxHeight: "calc(100vh - 0px)",
							overflowY: "auto",
						}}
					>
						<img
							src={logo}
							alt="logo"
							className={`${styles.classes.logo}`}
						/>
						<br />
						<Typography
							variant="h5"
							sx={{ fontWeight: "bold", textAlign: "center" }}
						>
							Inicia sesión en tu cuenta
						</Typography>
						<Box sx={{ width: "100%", maxWidth: "400px" }}>
							<Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
								{/* <Button
									variant="outlined"
									fullWidth
									size="large"
									startIcon={
										loadingGoogleLogin ? (
											<CircularProgress size={20} color="inherit" />
										) : <GoogleIcon />
									}
									disabled={loadingGoogleLogin}
									onClick={() => loginGoogle()}
									sx={{
										borderRadius: 2,
										py: 1,
										textTransform: "none",
										borderColor: "#dadce0",
										color: "rgba(0, 0, 0, 0.87)",
										backgroundColor: "#fff",
										"&:hover": {
											backgroundColor: "#f8f9fa",
											borderColor: "#dadce0",
											boxShadow: "0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
										},
										justifyContent: "center",
									}}
								>
									Continuar con Google
								</Button> */}
								<GoogleLogin onSuccess={res => handleProviderSignIn(res.credential)} onError={() => dispatchNotifyStack({ message: localize("login.error") }, httpStatusCodes.BAD_REQUEST)} />
							</Box>
							<Box sx={{ textAlign: "center", mt: 2 }}>
								<Typography variant="body2" sx={{ color: "text.secondary" }}>
									- o -
								</Typography>
							</Box>
							<form onSubmit={handleSubmit(handleSubmitForm)}>
								<CustomInput
									id={userConstants.USER_NAME}
									control={control}
									label={localize("login.userName")}
									placeholder={localize("login.userPlaceholder")}
									errorText={errors[userConstants.USER_NAME]?.message}
									error={!!errors[userConstants.USER_NAME]}
								/>

								<Controller
									control={control}
									name={userConstants.PASSWORD}
									rules={{
										required: {
											value: true,
											message: localize("common.fieldRequired"),
										},
									}}
									render={({ field }) => (
										<TextField
											{...field}
											type={showPassword ? "text" : "password"}
											id={userConstants.PASSWORD}
											label={localize("login.password")}
											variant="outlined"
											placeholder={localize("login.passPlaceholder")}
											error={!!errors[userConstants.PASSWORD]}
											helperText={errors[userConstants.PASSWORD]?.message}
											margin="normal"
											fullWidth
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton onClick={handleShowPassword} edge="end">
															{showPassword ? (
																<VisibilityIcon />
															) : (
																<VisibilityOffIcon />
															)}
														</IconButton>
													</InputAdornment>
												),
											}}
										/>
									)}
								/>
								<Button
									type="submit"
									variant="contained"
									fullWidth
									size="large"
									startIcon={
										isLoading ? (
											<CircularProgress size={20} color="inherit" />
										) : null
									}
									disabled={isLoading}
									sx={{ mt: 1, textTransform: "uppercase" }}
								>
									Iniciar sesión
								</Button>
							</form>
							<br />
							<Divider />
							<Grid container justifyContent="center" gap={2} marginTop={2}>
								<Grid item>
									<Typography variant="subtitle1">
										{"¿No tienes una cuenta?"}
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="subtitle1" gutterBottom>
										<Link
											onClick={handleRegister}
											color="inherit"
											underline="none"
											fontWeight="bold"
											sx={{
												textDecoration: "none",
												cursor: "pointer",
												"&:hover": {
													color: "secondary",
													textDecoration: "underline",
												},
											}}
										>
											Registrarse
										</Link>
									</Typography>
								</Grid>
							</Grid>
							{/* <Grid container justifyContent="center">
                <Typography variant="subtitle2" gutterBottom>
                  <Link
                    onClick={handleForgotPassword}
                    color="inherit"
                    underline="none"
                    fontWeight="bold"
                    sx={{
                      textDecoration: "none",
                      cursor: "pointer",
                      "&:hover": {
                        color: "secondary",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    ¿Has olvidado tu contraseña?
                  </Link>
                </Typography>
              </Grid> */}
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};
export default Login;
