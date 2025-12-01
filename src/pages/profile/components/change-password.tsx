import CustomInput from '@/components/ui/input/CustomInput'
import useYupValidationResolver from '@/core/hooks/useYupValidationResolver'
import { dispatchNotifyStackError, dispatchNotifyStackSuccess } from '@/core/services/notistack'
import { useChangePasswordMutation } from '@/stateManagement/apiSlices/userApi'
import localize from '@/utils/localizer'
import { Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import CircularProgress from '@mui/material/CircularProgress'

const schema = Yup.object().shape({
	currentPassword: Yup.string().required(localize("common.fieldRequired")),
	newPassword: Yup.string().required(localize("common.fieldRequired")),
	passwordConfirmation: Yup.string()
		.required(localize("common.fieldRequired"))
		.oneOf([Yup.ref('newPassword'), ''], localize("common.passwordsMustMatch")),
})

const ChangePassword = ({ disabled }: { disabled?: boolean }) => {
	const [changePassword, { isLoading }] = useChangePasswordMutation()
	const resolver = useYupValidationResolver(schema)

	const { handleSubmit, control, formState: { errors } } = useForm<Yup.InferType<typeof schema>>({
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			passwordConfirmation: "",
		},
		resolver,
		disabled: disabled,
	})

	const handleSubmitForm = (data: Yup.InferType<typeof schema>) => {
		changePassword(data).unwrap().then(() => {
			dispatchNotifyStackSuccess(localize("profile.passwordChanged"))
		}).catch(() => {
			dispatchNotifyStackError(localize("profile.passwordChangeError"))
		})
	}

	return (
		<form onSubmit={handleSubmit(handleSubmitForm)}>
			<Typography variant="h5" component="h1" fontWeight="bold" mb={2}>
				{localize("profile.changePassword")}
			</Typography>
			<CustomInput
				id="currentPassword"
				control={control}
				label={localize("profile.currentPassword")}
				type="password"
				error={!!errors.currentPassword}
				errorText={errors.currentPassword ? errors.currentPassword.message : ""}
			/>
			<CustomInput
				id="newPassword"
				control={control}
				label={localize("profile.newPassword")}
				type="password"
				error={!!errors.newPassword}
				errorText={errors.newPassword ? errors.newPassword.message : ""}
			/>
			<CustomInput
				id="passwordConfirmation"
				control={control}
				label={localize("profile.confirmNewPassword")}
				type="password"
				error={!!errors.passwordConfirmation}
				errorText={errors.passwordConfirmation ? errors.passwordConfirmation.message : ""}
			/>
			<Button
				type="submit"
				variant="contained"
				color="primary"
				sx={{ mt: 2 }}
				disabled={isLoading || disabled}
				startIcon={isLoading ? <CircularProgress size={24} /> : null}
			>
				{localize("profile.changePassword")}
			</Button>
		</form>
	)
}

export default ChangePassword