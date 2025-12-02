import CustomInput from "@/components/ui/input/CustomInput"
import { Box, Button, Card, Divider, FormHelperText, Grid, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { updateProviderConstants } from "./model/constants"
import localize from "@/utils/localizer"
import useYupValidationResolver from "@/core/hooks/useYupValidationResolver"
import * as Yup from "yup"
import Auth from "@/core/services/auth/auth"
import { useEffect } from "react"
import { ProviderRequestDto } from "@/stateManagement/models/provider/provider-dto"
import { CircularProgress } from "@mui/material"
import { dispatchNotifyStackError, dispatchNotifyStackSuccess } from "@/core/services/notistack"
import { useLazyProfileQuery, useSyncProviderMutation } from "@/stateManagement/apiSlices/userApi"
import { ProfilePhotoPicker } from "./components/profile-photo-picker"

const schema = Yup.object().shape({
	[updateProviderConstants.NAME]: Yup.string().required(localize("common.fieldRequired")),
	[updateProviderConstants.PICTURE]: Yup.string().url().optional().nullable(),
	[updateProviderConstants.DESCRIPTION]: Yup.string().required(localize("common.fieldRequired")),
	[updateProviderConstants.EMAIL]: Yup.string()
		.email(localize("common.invalidEmail"))
		.required(localize("common.fieldRequired")),
	[updateProviderConstants.PHONE]: Yup.string().required(localize("common.fieldRequired")),
	[updateProviderConstants.ADDRESS]: Yup.string().required(localize("common.fieldRequired")),
	[updateProviderConstants.WEBSITE]: Yup.string(),
	[updateProviderConstants.FACEBOOK]: Yup.string().url(localize("common.invalidUrl")),
	[updateProviderConstants.INSTAGRAM]: Yup.string().url(localize("common.invalidUrl")),
})

const UpdateProvider = () => {
	const resolver = useYupValidationResolver(schema);
	const userInfo = Auth.getUserInfo()
	const [getProfile, { isLoading: isLoadingProfile }] = useLazyProfileQuery()
	const [syncProvider, { isLoading: isLoadingSync }] = useSyncProviderMutation()

	const { handleSubmit, control, setValue, watch, formState: { errors } } = useForm<Yup.InferType<typeof schema>>({
		defaultValues: {
			name: "",
			picture: null,
			description: "",
			email: "",
			phone: "",
			address: "",
			website: "",
			facebook: "",
			instagram: "",
		},
		resolver,
		disabled: isLoadingProfile,
	})

	const handleSubmitForm = (data: Yup.InferType<typeof schema>) => {
		if (!userInfo.id) return

		const newData: ProviderRequestDto = {
			name: data.name ?? '',
			description: data.description ?? '',
			email: data.email ?? '',
			phone: data.phone ?? '',
			address: data.address ?? '',
			website: data.website ?? '',
			facebook: data.facebook ?? '',
			instagram: data.instagram ?? '',
			picture: data.picture ?? '',
			status: true
		}

		syncProvider(newData).unwrap().then(() => {
			dispatchNotifyStackSuccess('Datos actualizados correctamente')
		}).catch(res => {
			if (Array.isArray(res?.data?.messages) && res?.data?.messages.length > 0) {
				res?.data?.messages.forEach((msg: { message: string }) => {
					dispatchNotifyStackError(msg?.message)
				})
			} else {
				dispatchNotifyStackError('Error al actualizar datos')
			}
		})
	}

	useEffect(() => {
		if (userInfo.id) {
			getProfile(undefined).unwrap().then((res) => {
				if (res.data.provider) {
					setValue(updateProviderConstants.PICTURE, res.data.provider.picture)
					setValue(updateProviderConstants.NAME, res.data.provider.name)
					setValue(updateProviderConstants.DESCRIPTION, res.data.provider.description ?? "")
					setValue(updateProviderConstants.EMAIL, res.data.provider.email)
					setValue(updateProviderConstants.PHONE, res.data.provider.phone ?? "")
					setValue(updateProviderConstants.ADDRESS, res.data.provider.address)
					setValue(updateProviderConstants.WEBSITE, res.data.provider.website ?? "")
					setValue(updateProviderConstants.FACEBOOK, res.data.provider.facebook ?? "")
					setValue(updateProviderConstants.INSTAGRAM, res.data.provider.instagram ?? "")
				}
			})
		}
	}, [userInfo?.id])

	return (
		<Box sx={{ p: { xs: 2, md: 4 } }}>
			<Card sx={{ p: { xs: 2, md: 3 } }}>
				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", sm: "row" },
						justifyContent: "space-between",
						alignItems: { xs: "flex-start", sm: "center" },
						rowGap: 1,
						mb: 2,
					}}
				>
					<Typography variant="h6">{localize("updateProvider.title")}</Typography>
				</Box>

				<Controller
					name={updateProviderConstants.PICTURE}
					control={control}
					render={({ field }) => (
						<>
							<ProfilePhotoPicker
								currentImage={field.value}
								fallbackText={watch(updateProviderConstants.NAME) || "PP"}
								onImageChange={(url) => field.onChange(url)}
								size="lg"
							/>
							{errors[updateProviderConstants.PICTURE] && (
								<FormHelperText error sx={{ mt: 1, textAlign: "center" }}>
									{errors[updateProviderConstants.PICTURE]?.message}
								</FormHelperText>
							)}
						</>
					)}
				/>

				<Divider sx={{ mb: 2 }} />

				<form onSubmit={handleSubmit(handleSubmitForm)}>
					<CustomInput
						id={updateProviderConstants.NAME}
						control={control}
						label={localize("updateProvider.businessName")}
						errorText={errors[updateProviderConstants.NAME]?.message}
						error={!!errors[updateProviderConstants.NAME]}
					/>

					<CustomInput
						id={updateProviderConstants.DESCRIPTION}
						control={control}
						multiline
						rows={4}
						label={localize("updateProvider.description")}
						errorText={errors[updateProviderConstants.DESCRIPTION]?.message}
						error={!!errors[updateProviderConstants.DESCRIPTION]}
					/>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<CustomInput
								id={updateProviderConstants.EMAIL}
								control={control}
								label={localize("updateProvider.email")}
								errorText={errors[updateProviderConstants.EMAIL]?.message}
								error={!!errors[updateProviderConstants.EMAIL]}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomInput
								id={updateProviderConstants.PHONE}
								control={control}
								label={localize("updateProvider.phone")}
								errorText={errors[updateProviderConstants.PHONE]?.message}
								error={!!errors[updateProviderConstants.PHONE]}
							/>
						</Grid>
					</Grid>
					<CustomInput
						id={updateProviderConstants.ADDRESS}
						control={control}
						label={localize("updateProvider.address")}
						errorText={errors[updateProviderConstants.ADDRESS]?.message}
						error={!!errors[updateProviderConstants.ADDRESS]}
					/>

					<CustomInput
						id={updateProviderConstants.WEBSITE}
						control={control}
						label={localize("updateProvider.website")}
						errorText={errors[updateProviderConstants.WEBSITE]?.message}
						error={!!errors[updateProviderConstants.WEBSITE]}
					/>

					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<CustomInput
								id={updateProviderConstants.FACEBOOK}
								control={control}
								label={localize("updateProvider.facebook")}
								errorText={errors[updateProviderConstants.FACEBOOK]?.message}
								error={!!errors[updateProviderConstants.FACEBOOK]}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomInput
								id={updateProviderConstants.INSTAGRAM}
								control={control}
								label={localize("updateProvider.instagram")}
								errorText={errors[updateProviderConstants.INSTAGRAM]?.message}
								error={!!errors[updateProviderConstants.INSTAGRAM]}
							/>
						</Grid>
					</Grid>
					{/* <Box sx={{ mt: 2 }}>
						<Typography variant="body2" color="text.secondary">
							{localize("updateProvider.termsAndConditions")}
						</Typography>
					</Box> */}

					{/* register button */}
					<Box sx={{ mt: 2 }}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							size="large"
							disabled={isLoadingSync}
							startIcon={isLoadingSync ? <CircularProgress size={20} /> : null}
						>
							{localize("updateProvider.submit")}
						</Button>
					</Box>
				</form>
			</Card>
		</Box>
	)
}

export default UpdateProvider