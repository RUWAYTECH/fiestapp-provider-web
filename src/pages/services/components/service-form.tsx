import AutoCompleteCheckBox from '@/components/ui/autocompleteCheckBox/AutoCompleteCheckBox'
import CustomInput from '@/components/ui/input/CustomInput'
import SelectTextField from '@/components/ui/selectTextField/SelectTextField'
import useYupValidationResolver from '@/core/hooks/useYupValidationResolver'
import localize from '@/utils/localizer'
import { Box, Button, Grid } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import UploadImage, { ImageFile } from './upload-images'
import { useGetCategoriesQuery } from '@/stateManagement/apiSlices/categoryApi'
import { useGetUbigeosQuery } from '@/stateManagement/apiSlices/ubigeoApi'
import { ServiceRequestDto } from '@/stateManagement/models/service/service-dto'
import { useState } from 'react'
import { useUploadMutation } from '@/stateManagement/apiSlices/uploadApi'
import { v4 as uuidv4 } from 'uuid'

const schema = Yup.object().shape({
	name: Yup.string().required(localize("common.fieldRequired")),
	category: Yup.string().required(localize("common.fieldRequired")),
	description: Yup.string().required(localize("common.fieldRequired")),
	minPrice: Yup.number().required(localize("common.fieldRequired")),
	maxPrice: Yup.number().required(localize("common.fieldRequired")),
	serviceZone: Yup.array().of(Yup.object().shape({
		value: Yup.number().required(localize("common.fieldRequired")),
		label: Yup.string().required(localize("common.fieldRequired")),
	})).required(localize("common.fieldRequired")),
	attachments: Yup.array().of(Yup.string().required(localize("common.fieldRequired"))).required(localize("common.fieldRequired")),
})

interface ServiceFormProps {
	onCancel: () => void
	onSave: (data: ServiceRequestDto) => void
	isLoading?: boolean
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onCancel, onSave, isLoading }) => {
	const resolver = useYupValidationResolver(schema)
	const [uploadedFiles, setUploadedFiles] =  useState<ImageFile[]>([])

	const { handleSubmit, control, setValue, formState: { errors } } = useForm<Yup.InferType<typeof schema>>({
		defaultValues: {
			name: "",
			category: "",
			description: "",
			minPrice: 0,
			maxPrice: 0,
			serviceZone: [],
			attachments: [],
		},
		resolver,
	})

	const { data: categories, isLoading: loadingCategories } = useGetCategoriesQuery(undefined)
	const { data: ubigeos, isLoading: loadingUbigeos } = useGetUbigeosQuery(undefined)
	const [uploadFile] = useUploadMutation()

	const handleFormSubmit = (data: Yup.InferType<typeof schema>) => {
		onSave({
			name: data.name,
			description: data.description,
			priceMin: data.minPrice,
			priceMax: data.maxPrice,
			category: data.category,
			ubigeos: data.serviceZone.map((item) => item.value),
			fileImage: data.attachments,
			score: 5
		})
	}

	const handleUploadFile = (file: File) => {
		const formData = new FormData()

		formData.append("files[]", file)

		const uploadingFile: ImageFile = {
			id: uuidv4(),
			name: file.name,
			url: URL.createObjectURL(file),
			state: "loading",
		}

		setUploadedFiles((prev) => [...prev, uploadingFile])

		uploadFile(formData).unwrap().then((response) => {
			const newFile: ImageFile = {
				id: response[0].id,
				name: file.name,
				url: response[0].url,
				state: "success",
			}
			setUploadedFiles((prev) => prev.map((item) => (item.id === uploadingFile.id ? newFile : item)))
			setValue("attachments", [...uploadedFiles.map(item => item.id.toString()), newFile.id.toString()])
		}).catch(() => {
			setUploadedFiles((prev) => prev.map((item) => (item.id === uploadingFile.id ? { ...item, state: "error" } : item)))
		})
	}

	const handleDeleteFile = (fileId: string | number) => {
		setUploadedFiles((prev) => prev.filter((item) => item.id !== fileId))
		setValue("attachments", uploadedFiles.filter(item => item.id !== fileId).map(item => item.id.toString()))
	}

	return (
		<div style={{ width: "100%" }}>
			<form>
				<CustomInput
					id="name"
					control={control}
					label={localize("service.name")}
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
								loading={loadingCategories}
								size="small"
								label={localize("service.category")}
								name="category"
								id="category"
								options={categories?.map(item => ({ label: item.name, value: item.id })) || []}
								onSelectItem={(_e: any, option: any) => {
									setValue("category", option.id);
								}}
								error={!!errors.category}
							/>
						)}
					/>
				</Box>
				<CustomInput
					id="description"
					control={control}
					label={localize("service.description")}
					error={!!errors.description}
					errorText={errors.description?.message}
				/>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<CustomInput
							id="minPrice"
							control={control}
							label={localize("service.minPrice")}
							type="number"
							error={!!errors.minPrice}
							errorText={errors.minPrice?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<CustomInput
							id="maxPrice"
							control={control}
							label={localize("service.maxPrice")}
							type="number"
							error={!!errors.maxPrice}
							errorText={errors.maxPrice?.message}
						/>
					</Grid>
				</Grid>
				<Box sx={{ mt: 1.5 }}>
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
								label={localize("service.serviceZone")}
								placeholder={"Seleccione"}
								dataOptions={ubigeos?.map(item => ({ label: `${item.department} - ${item.province} - ${item.district}`, value: item.id })) || []}
								loading={loadingUbigeos}
								onSelectItem={(items: any) => {
									setValue("serviceZone", items);
								}}
								error={!!errors.serviceZone}
								helperText={errors.serviceZone?.message}
							/>
						)}
					/>
				</Box>
				<UploadImage uploadFile={handleUploadFile} uploadedFiles={uploadedFiles} deleteFile={handleDeleteFile} />
				<Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
					<Button
						variant="outlined"
						color="secondary"
						disabled={isLoading}
						onClick={onCancel}
						sx={{ mr: 1 }}
					>
						{localize("common.cancel")}
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit(handleFormSubmit)}
						disabled={isLoading}
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