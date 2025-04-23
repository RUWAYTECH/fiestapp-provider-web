import CustomInput from "@/components/ui/input/CustomInput"
import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { updateProviderConstants } from "./model/constants"
import localize from "@/utils/localizer"
import useYupValidationResolver from "@/core/hooks/useYupValidationResolver"
import * as Yup from "yup"
import { useLazyGetProviderByUserIdQuery, useUpdateProviderProfileMutation } from "@/stateManagement/apiSlices/providerApi"
import Auth from "@/core/services/auth/auth"
import { useEffect } from "react"
import { ProviderRequestDto } from "@/stateManagement/models/provider/provider-dto"
import { CircularProgress } from "@mui/material"
import { dispatchNotifyStackError, dispatchNotifyStackSuccess } from "@/core/services/notistack"

const schema = Yup.object().shape({
	[updateProviderConstants.NAME]: Yup.string().required(localize("common.fieldRequired")),
	[updateProviderConstants.DESCRIPTION]: Yup.string().required(localize("common.fieldRequired")),
	[updateProviderConstants.EMAIL]: Yup.string()
		.email(localize("common.invalidEmail"))
		.required(localize("common.fieldRequired")),
	[updateProviderConstants.PHONE]: Yup.string().required(localize("common.fieldRequired")),
	[updateProviderConstants.ADDRESS]: Yup.string().required(localize("common.fieldRequired")),
	[updateProviderConstants.WEBSITE]: Yup.string().url(localize("common.invalidUrl")),
	[updateProviderConstants.FACEBOOK]: Yup.string().url(localize("common.invalidUrl")),
	[updateProviderConstants.INSTAGRAM]: Yup.string().url(localize("common.invalidUrl")),
})

const UpdateProvider = () => {
	const resolver = useYupValidationResolver(schema);
	const userInfo = Auth.getUserInfo()
	const [ getProviderById, { isLoading: isLoadingGetProviderById } ] = useLazyGetProviderByUserIdQuery()
	const [ updateProviderProfile, { isLoading: isLoadingUpdate } ] = useUpdateProviderProfileMutation()

	const { handleSubmit, control, setValue, formState: { errors } } = useForm<Yup.InferType<typeof schema>>({
		defaultValues: {
			name: "",
			description: "",
			email: "",
			phone: "",
			address: "",
			website: "",
			facebook: "",
			instagram: "",
		},
		resolver,
		disabled: isLoadingGetProviderById,
	})

	const handleSubmitForm = (data: Yup.InferType<typeof schema>) => {
		if (!userInfo.id) return

		const newData: ProviderRequestDto = {
			name: data.name ?? '',
			description: data.description ?? '',
			email: data.email ?? '',
			phone: data.phone ?? '',
			address: data.address ?? '',
			website: data.website,
			facebookUrl: data.facebook,
			instagramUrl: data.instagram,
		}

		updateProviderProfile(newData).unwrap().then((response) => {
			if (response.data) {
				dispatchNotifyStackSuccess('Datos actualizados correctamente')
			}
		}).catch(() => {
			dispatchNotifyStackError('Error al actualizar datos')
		})
	}

	useEffect(() => {
		if (userInfo.id) {
			getProviderById(userInfo.id).unwrap().then((response) => {
				const provider = response?.data?.[0]
				if (provider) {
					setValue(updateProviderConstants.NAME, provider.name)
					setValue(updateProviderConstants.DESCRIPTION, provider.description ?? "")
					setValue(updateProviderConstants.EMAIL, provider.email)
					setValue(updateProviderConstants.PHONE, provider.phone ?? "")
					setValue(updateProviderConstants.ADDRESS, provider.address)
					setValue(updateProviderConstants.WEBSITE, provider.website ?? "")
					setValue(updateProviderConstants.FACEBOOK, provider.facebookUrl ?? "")
					setValue(updateProviderConstants.INSTAGRAM, provider.instagramUrl ?? "")
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
							disabled={isLoadingUpdate}
							startIcon={isLoadingUpdate ? <CircularProgress size={20} /> : null}
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