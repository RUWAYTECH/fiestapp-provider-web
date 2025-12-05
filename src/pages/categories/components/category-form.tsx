import localize from '@/utils/localizer';
import { Controller, useForm } from 'react-hook-form';
import { Button, Divider, FormHelperText, Stack } from '@mui/material';
import * as Yup from 'yup';
import { CategoryRequestDto, CategoryResponseDto } from '@/stateManagement/models/category/category-dto';
import CustomInput from '@/components/ui/input/CustomInput';
import useYupValidationResolver from '@/core/hooks/useYupValidationResolver';
import { ImagePicker } from './image-picker';

interface CategoryFormProps {
	data?: CategoryResponseDto | null;
	onSubmit?: (data: CategoryRequestDto) => void;
	onCancel?: () => void;
	isLoading?: boolean;
}

const schema = Yup.object().shape({
	name: Yup.string().required(localize('common.fieldRequired')),
	description: Yup.string().required(localize('common.fieldRequired')),
	image: Yup.string().url(localize('common.invalidUrl')),
});

export default function CategoryForm({ data, onSubmit, onCancel, isLoading }: CategoryFormProps) {
	const resolver = useYupValidationResolver(schema)

	const {
		control,
		formState: { errors },
		watch,
		handleSubmit
	} = useForm<CategoryRequestDto>({
		resolver,
		defaultValues: {
			name: data?.name || '',
			description: data?.description || '',
			image: data?.image || null
		},
	});

	const submitHandler = (data: CategoryRequestDto) => {
		onSubmit?.({
			name: data.name,
			description: data.description,
			image: data.image
		});
	};

	return (
		<form
			onSubmit={handleSubmit(submitHandler)}
			style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}
			noValidate
		>
			<Controller
				name="image"
				control={control}
				render={({ field }) => (
					<>
						<ImagePicker
							currentImage={field.value}
							fallbackText={watch('name') || "PP"}
							onImageChange={(url) => field.onChange(url)}
							size="lg"
						/>
						{errors.image && (
							<FormHelperText error sx={{ mt: 1, textAlign: "center" }}>
								{errors.image?.message}
							</FormHelperText>
						)}
					</>
				)}
			/>
			<Divider sx={{ mb: 2 }} />
			<CustomInput
				id="name"
				control={control}
				label={localize("category.name")}
				error={!!errors.name}
				errorText={errors.name?.message}
			/>
			<CustomInput
				id="description"
				control={control}
				label={localize("category.description")}
				error={!!errors.description}
				errorText={errors.description?.message}
			/>

			<Stack direction="row" spacing={2} justifyContent="center" sx={{ padding: 2 }}>
				<Button variant="outlined" color="primary" type="button" onClick={onCancel}>
					{localize('common.cancel')}
				</Button>
				<Button variant="contained" color="primary" type="submit" disabled={isLoading}>
					{localize('common.save')}
				</Button>
			</Stack>
		</form>
	);
}
