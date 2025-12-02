import { CategoryResponseDto } from '@/stateManagement/models/category/category-dto';
import localize from '@/utils/localizer';
import { Delete, Edit } from '@mui/icons-material';
import { Avatar, Box, IconButton, Tooltip } from '@mui/material';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';

interface ScaleGroupTableProps {
	data: CategoryResponseDto[];
	isLoading?: boolean;
	onDelete?: (id: string) => void;
	onEdit?: (id: string) => void;
}

const labelNotFound = {
	noRowsLabel: localize('common.notFound')
};

export default function CategoryTable({ data, isLoading, onEdit, onDelete }: ScaleGroupTableProps) {
	const columns: DataGridProps<CategoryResponseDto>['columns'] = [
		{
			field: 'image',
			headerName: localize('category.image'),
			width: 100,
			sortable: false,
			renderCell: ({ row }) => {
				return (
					<Avatar
						src={row.image || ''}
						alt={localize('category.image')}
						sx={{ width: 30, height: 30, borderRadius: '50%' }}
					/>
				);
			}
		},
		{
			field: 'name',
			headerName: localize('category.name'),
			flex: 1,
			sortable: false
		},
		{
			field: 'description',
			headerName: localize('category.description'),
			flex: 1,
			sortable: false
		},
		{
			field: 'actions',
			headerName: localize('common.actions'),
			width: 170,
			sortable: false,
			renderCell: ({ row }) => {
				return (
					<Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
						<Tooltip title={localize('common.edit')} arrow>
							<span>
								<IconButton
									color="info"
									size="small"
									aria-label="edit"
									onClick={() => {
										onEdit?.(row.id);
									}}
								>
									<Edit fontSize="small" />
								</IconButton>
							</span>
						</Tooltip>
						<Tooltip title={localize('common.delete')} arrow>
							<span>
								<IconButton
									color="error"
									size="small"
									aria-label="delete"
									onClick={() => {
										onDelete?.(row.id);
									}}
								>
									<Delete fontSize="small" />
								</IconButton>
							</span>
						</Tooltip>
					</Box>
				);
			}
		}
	];

	const rowsData = data?.map((item) => ({ ...item }));

	return (
		<DataGrid
			rows={rowsData}
			columns={columns.map(col => ({ ...col }))}
			hideFooterPagination={true}
			loading={isLoading}
			localeText={labelNotFound}
			getRowHeight={() => 'auto'}
			autoHeight
			hideFooter
			disableColumnMenu
		/>
	);
}
