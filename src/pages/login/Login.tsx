import React, { useState } from "react";
import {
  Grid,
  InputAdornment,
  IconButton,
  Typography,
  TextField,
  Button,
  Divider,
  Link,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  useLazyUserByIdQuery,
  useLoginMutation,
} from "../../stateManagement/apiSlices/userApi";
import * as userConstants from "./model/LoginConstants";
import localize from "../../utils/localizer";
import {
  dispatchNotifyStack,
  dispatchNotifyStackSuccess,
} from "../../core/services/notistack";
import { httpStatusCodes } from "../../core/constants";
import Auth from "../../core/services/auth/auth";
import useStyles from "./Login.styles";
import { paths } from "../../core/constants";
import { userDto } from "../../stateManagement/models";
import Apartment from "@/assets/portada.jpg";
import LogoApartment from "@/assets/logoProject.png";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import * as Yup from "yup";
import CustomInput from "@/components/ui/input/CustomInput";
import useYupValidationResolver from "@/core/hooks/useYupValidationResolver";

const schema = Yup.object().shape({
  [userConstants.USER_NAME]: Yup.string().required(
    localize("common.fieldRequired")
  ),
  [userConstants.PASSWORD]: Yup.string().required(
    localize("common.fieldRequired")
  ),
});

const Login: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [getUserById] = useLazyUserByIdQuery();
  const navigate = useNavigate();
  const styles = useStyles();
  const resolver = useYupValidationResolver(schema);

  const {
    handleSubmit,
    control,
    formState: { errors = {} },
  } = useForm<userDto>({
    defaultValues: { identifier: "", password: "" },
    resolver,
  });

  const handleSubmitForm = (data: userDto) => {
    Auth.logout();
    login(data)
      .unwrap()
      .then((res: any) => {
        Auth.setUserToken(res.jwt);
        getUserById(res.user.id)
          .unwrap()
          .then((res: any) => {
            Auth.setUserInfo(res);
            dispatchNotifyStackSuccess(localize("login.success"));
            navigate(paths.DASHBOARD);
          })
          .catch((err: any) => {
            dispatchNotifyStack(
              {
                message: localize("login.error"),
              },
              httpStatusCodes.BAD_REQUEST
            );
          });
      })
      .catch((err: any) => {
        dispatchNotifyStack(
          {
            message: localize("login.error"),
          },
          httpStatusCodes.BAD_REQUEST
        );
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleRegister = () => {
    navigate(paths.REGISTER);
  };
  const handleForgotPassword = () => {
    navigate(paths.FORGOT);
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
              src={LogoApartment}
              alt="logo"
              className={`${styles.classes.logo} ${styles.classes.logoSmall}`}
            />
            <br />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              Template react web
            </Typography>
            <Box sx={{ width: "100%", maxWidth: "400px" }}>
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
                  Login
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
                      //onClick={handleRegister}
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
              <Grid container justifyContent="center">
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
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Login;
