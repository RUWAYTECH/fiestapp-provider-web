import CustomInput from '@/components/ui/input/CustomInput'
import useYupValidationResolver from '@/core/hooks/useYupValidationResolver'
import localize from '@/utils/localizer'
import { Button, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

const schema = Yup.object().shape({
	businessName: Yup.string().required(localize("common.fieldRequired")),
	email: Yup.string().email(localize("common.invalidEmail")).required(localize("common.fieldRequired")),
	phone: Yup.string().required(localize("common.fieldRequired")),
	address: Yup.string().required(localize("common.fieldRequired")),
	website: Yup.string().url(localize("common.invalidUrl")).required(localize("common.fieldRequired")),
	facebook: Yup.string().url(localize("common.invalidUrl")).required(localize("common.fieldRequired")),
	instagram: Yup.string().url(localize("common.invalidUrl")).required(localize("common.fieldRequired")),
})

const ProfileForm = () => {
	const resolver = useYupValidationResolver(schema)

	const { handleSubmit, control, formState: { errors } } = useForm<Yup.InferType<typeof schema>>({
		defaultValues: {
			businessName: "",
			email: "",
			phone: "",
			address: "",
			website: "",
			facebook: "",
			instagram: "",
		},
		resolver,
	})

	const handleSubmitForm = (data: Yup.InferType<typeof schema>) => {
		console.log("Form submitted", data)
		// Aquí puedes manejar el envío del formulario, como hacer una llamada a la API
	}

	return (
		<form onSubmit={handleSubmit(handleSubmitForm)}>
			<CustomInput
				id="businessName"
				control={control}
				label={localize("profile.businessName")}
				error={!!errors.businessName}
				errorText={errors.businessName?.message}
			/>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<CustomInput
						id="email"
						control={control}
						label={localize("profile.email")}
						type="email"
						error={!!errors.email}
						errorText={errors.email?.message}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<CustomInput
						id="phone"
						control={control}
						label={localize("profile.phone")}
						type="tel"
						error={!!errors.phone}
						errorText={errors.phone?.message}
					/>
				</Grid>
			</Grid>
			<CustomInput
				id="address"
				control={control}
				label={localize("profile.address")}
				error={!!errors.address}
				errorText={errors.address?.message}
			/>
			<CustomInput
				id="website"
				control={control}
				label={localize("profile.website")}
				type="url"
				error={!!errors.website}
				errorText={errors.website?.message}
			/>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<CustomInput
						id="facebook"
						control={control}
						label={localize("profile.facebook")}
						type="url"
						error={!!errors.facebook}
						errorText={errors.facebook?.message}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<CustomInput
						id="instagram"
						control={control}
						label={localize("profile.instagram")}
						type="url"
						error={!!errors.instagram}
						errorText={errors.instagram?.message}
					/>
				</Grid>
			</Grid>
			<Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
				{localize("profile.updateProfile")}
			</Button>
		</form>
	)
}

export default ProfileForm