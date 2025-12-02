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
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { httpStatusCodes, paths } from "../../core/constants";
import Auth from "../../core/services/auth/auth";
import { dispatchNotifyStack, dispatchNotifyStackError } from "../../core/services/notistack";
import { useRegisterMutation } from "../../stateManagement/apiSlices/userApi";
import localize from "../../utils/localizer";
import useStyles from "./register.styles";
import * as userConstants from "./model/registerConstants";
import { RegisterRequestDto } from "@/stateManagement/models/auth/register";

const schema = Yup.object().shape({
	[userConstants.USER_NAME]: Yup.string().required(localize("common.fieldRequired")),
	[userConstants.EMAIL]: Yup.string()
		.email(localize("common.invalidEmail"))
		.required(localize("common.fieldRequired")),
	[userConstants.PASSWORD]: Yup.string().required(localize("common.fieldRequired")),
	[userConstants.CONFIRM_PASSWORD]: Yup.string()
		.oneOf([Yup.ref(userConstants.PASSWORD)], localize("register.passwordsMustMatch"))
		.required(localize("common.fieldRequired")),
});

const Register: React.FC = () => {
	const navigate = useNavigate();
	const styles = useStyles();
	const resolver = useYupValidationResolver(schema);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [register, { isLoading }] = useRegisterMutation();

	const { handleSubmit, control, formState: { errors } } = useForm<RegisterRequestDto & { confirmPassword: string }>({
		defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
		resolver,
	});

	const handleSubmitForm = (data: RegisterRequestDto & { confirmPassword: string }) => {
		const { confirmPassword, ...rest } = data;

		register({ ...rest })
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
					dispatchNotifyStack({ message: localize("register.error") }, httpStatusCodes.BAD_REQUEST);
				}
			});
	};

	const handleShowPassword = () => setShowPassword((show) => !show);
	const handleLogin = () => navigate(paths.LOGIN);

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
							Crea tu cuenta
						</Typography>
						<Box sx={{ width: "100%", maxWidth: "400px" }}>
							<form onSubmit={handleSubmit(handleSubmitForm)}>
								<CustomInput
									id={userConstants.USER_NAME}
									control={control}
									label={localize("register.userName")}
									placeholder={localize("register.userNamePlaceholder")}
									errorText={errors[userConstants.USER_NAME]?.message}
									error={!!errors[userConstants.USER_NAME]}
								/>

								<CustomInput
									id={userConstants.EMAIL}
									control={control}
									label={localize("register.email")}
									placeholder={localize("register.emailPlaceholder")}
									errorText={errors[userConstants.EMAIL]?.message}
									error={!!errors[userConstants.EMAIL]}
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
											label={localize("register.password")}
											variant="outlined"
											placeholder={localize("register.passwordPlaceholder")}
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
								{/* confirm password */}
								<Controller
									control={control}
									name={userConstants.CONFIRM_PASSWORD}
									rules={{
										required: {
											value: true,
											message: localize("common.fieldRequired"),
										},
									}}
									render={({ field }) => (
										<TextField
											{...field}
											type={showConfirmPassword ? "text" : "password"}
											id={userConstants.CONFIRM_PASSWORD}
											label={localize("register.confirmPassword")}
											variant="outlined"
											placeholder={localize("register.confirmPasswordPlaceholder")}
											error={!!errors[userConstants.CONFIRM_PASSWORD]}
											helperText={errors[userConstants.CONFIRM_PASSWORD]?.message}
											margin="normal"
											fullWidth
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton onClick={() => setShowConfirmPassword((show) => !show)} edge="end">
															{showConfirmPassword ? (
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
									Registrarse
								</Button>
							</form>
							<br />
							<Divider />
							<Grid container justifyContent="center" gap={2} marginTop={2}>
								<Grid item>
									<Typography variant="subtitle1">
										{"¿Ya tienes una cuenta?"}
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="subtitle1" gutterBottom>
										<Link
											onClick={handleLogin}
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
											Inicia sesión
										</Link>
									</Typography>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Register;