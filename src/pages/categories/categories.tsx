import Container from '@/components/containers/container';
import { Card, Pagination } from '@mui/material';
import CategoryFilter from './components/category-filter';
import localize from '@/utils/localizer';
import CategoryForm from './components/category-form';
import CategoryTable from './components/category-table';
import { useCategoryActions } from './hooks/use-category-actions';
import paginationValues from '@/core/constants/pagination';
import GenericModal from '@/components/ui/genericModal/GenericModal';

export default function Category() {
	const {
		open,
		data: res,
		dataById,
		handleFiltersChange,
		handlePaginationChange,
		saveData,
		findById,
		deleteItem,
		handleClose,
		handleNew,
		isLoadingGetAll,
		isLoadingCreate,
		isLoadingUpdate
	} = useCategoryActions();

	const totalPages = (total: number | undefined, pageSize: number) => {
		if (total === 0) return 1
		if (!total) return 0
		return Math.ceil(total / pageSize)
	}

	return (
		<>
			<Container title={localize('category.title')}>
				<Card sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
					<CategoryFilter onAdd={handleNew} onChange={handleFiltersChange} isLoading={isLoadingGetAll} />
					<CategoryTable
						data={res?.data || []}
						isLoading={isLoadingGetAll}
						onEdit={findById}
						onDelete={deleteItem}
					/>
					<Pagination count={totalPages(res?.pageOptions.totalRows, res?.pageOptions.pageSize || paginationValues.pageSize)} page={res?.pageOptions.page || 1} onChange={(_e, page) => handlePaginationChange({ pageNumber: page, pageSize: res?.pageOptions.pageSize || paginationValues.pageSize })} color="primary" sx={{ mt: 2 }} variant="outlined" shape="rounded" />
				</Card>
			</Container>
			<GenericModal
				open={open}
				size="60%"
				title={dataById ? localize('category.editTitle') : localize('category.newTitle')}
			>
				<CategoryForm
					data={dataById}
					onSubmit={data => saveData(data, dataById?.id)}
					onCancel={handleClose}
					isLoading={isLoadingCreate || isLoadingUpdate}
				/>
			</GenericModal>
		</>
	);
}
