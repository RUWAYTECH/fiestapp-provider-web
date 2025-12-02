import { CategoryGetAllReqDto } from '@/stateManagement/models/category/category-dto';
import localize from '@/utils/localizer';
import { Add } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { Button, CircularProgress, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import * as Yup from 'yup';
import useYupValidationResolver from '@/core/hooks/useYupValidationResolver';

interface GroupFilterProps {
	onChange?: (filters: CategoryGetAllReqDto) => void;
	isLoading?: boolean;
	onAdd?: () => void;
}

const schema = Yup.object({
	search: Yup.string(),
})

export default function GroupFilter({ onChange, isLoading, onAdd }: GroupFilterProps) {
	const resolver = useYupValidationResolver(schema);

	const { control, handleSubmit } = useForm<{ search: string }>({
		resolver,
		defaultValues: {
			search: ''
		}
	});

	const submitHandler = (data: { search: string }) => {
		onChange?.(data);
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)} noValidate>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6} md={3}>
					<Controller
						control={control}
						name="search"
						render={({ field }) => (
							<TextField
								{...field}
								fullWidth
								variant="outlined"
								id="search"
								name="search"
								label={localize('common.search')}
								onChange={e => field.onChange(e.target.value)}
								InputProps={{
									endAdornment: field.value ? (
										<InputAdornment position="end">
											<IconButton aria-label="clear" onClick={() => field.onChange('')} edge="end">
												<ClearIcon />
											</IconButton>
										</InputAdornment>
									) : null
								}}
							/>
						)}
					/>
				</Grid>
				<Grid item xs></Grid>
				<Grid item display="flex" alignItems="center" gap={1}>
					<Button
						type="submit"
						variant="outlined"
						color="primary"
						disabled={isLoading}
						startIcon={isLoading ? <CircularProgress size={15} /> : <SearchIcon />}
					>
						{localize('common.search')}
					</Button>
					<Button
						variant="outlined"
						color="secondary"
						startIcon={<CleaningServicesIcon />}
					>
						{localize('common.clear')}
					</Button>
					<Button variant="contained" color="primary" onClick={onAdd} type="button">
						<Add fontSize="small" />
						{localize('common.add')}
					</Button>
				</Grid>
			</Grid>
		</form>
	);
}
