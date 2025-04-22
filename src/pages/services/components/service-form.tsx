import AutoCompleteCheckBox from '@/components/ui/autocompleteCheckBox/AutoCompleteCheckBox'
import CustomInput from '@/components/ui/input/CustomInput'
import SelectTextField from '@/components/ui/selectTextField/SelectTextField'
import useYupValidationResolver from '@/core/hooks/useYupValidationResolver'
import localize from '@/utils/localizer'
import { Box, Button, Grid } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import UploadImage from './upload-images'

const schema = Yup.object().shape({
	name: Yup.string().required(localize("common.fieldRequired")),
	category: Yup.string().required(localize("common.fieldRequired")),
	description: Yup.string().required(localize("common.fieldRequired")),
	minPrice: Yup.number().required(localize("common.fieldRequired")),
	maxPrice: Yup.number().required(localize("common.fieldRequired")),
	serviceZone: Yup.string().required(localize("common.fieldRequired")),
	attachments: Yup.array().of(Yup.mixed()).required(localize("common.fieldRequired")),
})

interface ServiceFormProps {
	onCancel: () => void
	onSave: (data: Yup.InferType<typeof schema>) => void
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onCancel, onSave }) => {
	const resolver = useYupValidationResolver(schema)

	const { handleSubmit, control, setValue, formState: { errors } } = useForm<Yup.InferType<typeof schema>>({
		defaultValues: {
			name: "",
			category: "",
			description: "",
			minPrice: 0,
			maxPrice: 0,
			serviceZone: "",
			attachments: [],
		},
		resolver,
	})

	return (
		<div style={{ width: "100%" }}>
			<form>
				<CustomInput
					id="name"
					control={control}
					label={localize("services.name")}
					error={!!errors.name}
					errorText={errors.name?.message}
				/>
				<Box sx={{ mt: 1.5 }}>
					<Controller
						control={control}
						name="category"
						rules={{
							required: {
								value: true,
								message: localize("requiredInput"),
							},
						}}
						render={({ field }) => (
							<SelectTextField
								{...field}
								fullWidth
								loading={false}
								size="small"
								label={localize("registerProvider.category")}
								name="category"
								id="category"
								options={[]}
								onSelectItem={(_e: any, option: any) => {
									setValue("category", option.code);
								}}
								error={!!errors.category}
							/>
						)}
					/>
				</Box>
				<CustomInput
					id="description"
					control={control}
					label={localize("services.description")}
					error={!!errors.description}
					errorText={errors.description?.message}
				/>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<CustomInput
							id="minPrice"
							control={control}
							label={localize("services.minPrice")}
							type="number"
							error={!!errors.minPrice}
							errorText={errors.minPrice?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<CustomInput
							id="maxPrice"
							control={control}
							label={localize("services.maxPrice")}
							type="number"
							error={!!errors.maxPrice}
							errorText={errors.maxPrice?.message}
						/>
					</Grid>
				</Grid>
				<Controller
					control={control}
					name="serviceZone"
					rules={{
						required: {
							value: true,
							message: localize("requiredInput"),
						},
					}}
					render={({ field }) => (
						<AutoCompleteCheckBox
							{...field}
							id="serviceZone"
							name="serviceZone"
							size="small"
							noneOption
							noneOptionLabel="Todos"
							noneOptionValue="all"
							label={localize("services.serviceZone")}
							placeholder={"Seleccione"}
							dataOptions={[]}
							onSelectItem={(items: any) => {
								setValue("serviceZone", items);
							}}
							error={!!errors.serviceZone}
							helperText={errors.serviceZone?.message}
						/>
					)}
				/>
				<UploadImage />
				<Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
					<Button
						variant="outlined"
						color="secondary"
						onClick={onCancel}
						sx={{ mr: 1 }}
					>
						{localize("common.cancel")}
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit(onSave)}
						sx={{ ml: 1 }}
					>
						{localize("common.save")}
					</Button>
				</Box>
			</form>
		</div>
	)
}

export default ServiceForm