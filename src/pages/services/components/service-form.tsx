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
import { ServiceRequestDto, ServiceResponseDto } from '@/stateManagement/models/service/service-dto'
import { useEffect, useState } from 'react'
import Config from '@/core/config/config'
import axios from 'axios'
import { dispatchNotifyStackError, dispatchNotifyStackSuccess } from '@/core/services/notistack'

const schema = Yup.object().shape({
	name: Yup.string().required(localize("common.fieldRequired")),
	category: Yup.string().required(localize("common.fieldRequired")),
	description: Yup.string().required(localize("common.fieldRequired")),
	minPrice: Yup.number().required(localize("common.fieldRequired")),
	maxPrice: Yup.number().required(localize("common.fieldRequired")),
	serviceZone: Yup.array().of(Yup.object().shape({
		value: Yup.string().required(localize("common.fieldRequired")),
		label: Yup.string().required(localize("common.fieldRequired")),
	})).min(1, localize("common.fieldRequired")).required(localize("common.fieldRequired")),
	// attachments: Yup.array().of(Yup.string().required(localize("common.fieldRequired"))).min(1, localize("common.fieldRequired")).required(localize("common.fieldRequired")),
})

interface ServiceFormProps {
	data?: ServiceResponseDto | null
	onCancel: () => void
	onSave: (data: ServiceRequestDto) => void
	isLoading?: boolean
}

const ServiceForm: React.FC<ServiceFormProps> = ({ data, onCancel, onSave, isLoading }) => {
	const resolver = useYupValidationResolver(schema)
	const [uploadedFiles, setUploadedFiles] = useState<ImageFile[]>([])

	const { handleSubmit, control, setValue, formState: { errors } } = useForm<Yup.InferType<typeof schema>>({
		defaultValues: {
			name: "",
			category: "",
			description: "",
			minPrice: "",
			maxPrice: "",
			serviceZone: [],
		} as unknown as Yup.InferType<typeof schema>,
		resolver,
	})

	const { data: categories, isLoading: loadingCategories } = useGetCategoriesQuery(undefined)
	const { data: ubigeos, isLoading: loadingUbigeos } = useGetUbigeosQuery(undefined)

	const handleFormSubmit = (data: Yup.InferType<typeof schema>) => {
		if (uploadedFiles.filter(file => file.state === 'success').length === 0) {
			dispatchNotifyStackError('Debe subir al menos una imagen del servicio');
			return;
		}

		onSave({
			name: data.name,
			description: data.description,
			priceMin: data.minPrice,
			priceMax: data.maxPrice,
			categoryId: data.category,
			ubigeoIds: data.serviceZone.map((item) => item.value),
			imageUrls: uploadedFiles.filter(file => file.state === 'success').map(file => file.url),
			status: true
		})
	}

	const handleUploadFile = (selectedFile: File) => {
		if (selectedFile) {
			const id = uploadedFiles.length > 0 ? uploadedFiles.length + 1 : 1;

			setUploadedFiles(prevFiles => {
				const newFile: ImageFile = {
					id,
					name: selectedFile.name,
					url: URL.createObjectURL(selectedFile),
					state: 'loading',
				};

				return [...prevFiles, newFile];
			});

			const formData = new FormData();
			formData.append('file', selectedFile);
			formData.append('upload_preset', Config.cloudinaryPreset);
			console.log('Uploading file to Cloudinary:', selectedFile, Config.cloudinaryUrl, Config.cloudinaryPreset);
			axios({
				url: Config.cloudinaryUrl,
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				data: formData
			})
				.then(res => {
					// setValue('attachments', [...getValues('attachments'), res.data.secure_url]);
					setUploadedFiles(prevFiles => {
						return prevFiles.map(file => {
							if (file.id === id) {
								return {
									...file,
									url: res.data.secure_url,
									state: 'success',
								};
							}
							return file;
						});
					});

					dispatchNotifyStackSuccess('Imagen subida con éxito');
				})
				.catch(err => {
					setUploadedFiles(prevFiles => {
						return prevFiles.map(file => {
							if (file.id === id) {
								return {
									...file,
									state: 'error',
								};
							}
							return file;
						});
					});

					dispatchNotifyStackError(err.response?.data?.error?.message || err.message);
				});
		}
	}

	const handleDeleteFile = (fileId: string | number) => {
		setUploadedFiles(prevFiles => prevFiles.filter(f => f.id !== fileId));
	}

	useEffect(() => {
		if (data) {
			setValue("name", data.name)
			setValue("description", data.description)
			setValue("minPrice", data.priceMin)
			setValue("maxPrice", data.priceMax)
			setValue("category", data.categoryId ? data.categoryId.toString() : "")
			setValue("serviceZone", data.ubigeos?.map((ubigeo) => ({
				label: `${ubigeo.department} - ${ubigeo.province} - ${ubigeo.district}`,
				value: ubigeo.id,
			})) || [])
			setUploadedFiles(data.images.map((url, index) => ({
				id: index + 1,
				name: `Image ${index + 1}`,
				url,
				state: 'success'
			})))
		}
	}, [data])

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
				<Box sx={{ mt: 1.5 }}>
					<UploadImage uploadFile={handleUploadFile} uploadedFiles={uploadedFiles} deleteFile={handleDeleteFile} />
					{/* {errors.attachments && (
						<FormHelperText error sx={{ mt: 1 }}>
							{errors.attachments?.message}
						</FormHelperText>
					)} */}
				</Box>
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