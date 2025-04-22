import CustomInput from '@/components/ui/input/CustomInput'
import useYupValidationResolver from '@/core/hooks/useYupValidationResolver'
import localize from '@/utils/localizer'
import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

const schema = Yup.object().shape({
	currentPassword: Yup.string().required(localize("common.fieldRequired")),
	password: Yup.string().required(localize("common.fieldRequired")),
	passwordConfirmation: Yup.string()
		.required(localize("common.fieldRequired"))
		.oneOf([Yup.ref('password'), ''], localize("common.passwordsMustMatch")),
})

const ChangePassword = () => {
	const resolver = useYupValidationResolver(schema)

	const { handleSubmit, control, formState: { errors } } = useForm<Yup.InferType<typeof schema>>({
		defaultValues: {
			currentPassword: "",
			password: "",
			passwordConfirmation: "",
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
				id="currentPassword"
				control={control}
				label={localize("profile.currentPassword")}
				type="password"
				error={!!errors.currentPassword}
				errorText={errors.currentPassword ? errors.currentPassword.message : ""}
			/>
			<CustomInput
				id="password"
				control={control}
				label={localize("profile.newPassword")}
				type="password"
				error={!!errors.password}
				errorText={errors.password ? errors.password.message : ""}
			/>
			<CustomInput
				id="passwordConfirmation"
				control={control}
				label={localize("profile.confirmNewPassword")}
				type="password"
				error={!!errors.passwordConfirmation}
				errorText={errors.passwordConfirmation ? errors.passwordConfirmation.message : ""}
			/>
			<Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
				{localize("profile.changePassword")}
			</Button>
		</form>
	)
}

export default ChangePassword