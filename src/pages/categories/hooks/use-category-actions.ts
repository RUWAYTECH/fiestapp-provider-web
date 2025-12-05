import { useEffect, useState } from 'react';
import localize from '@/utils/localizer';
import {
	useCreateCategoryMutation,
	useLazyGetAllCategoryQuery,
	useLazyGetByIdCategoryQuery,
	useRemoveCategoryMutation,
	useUpdateCategoryMutation
} from '@/stateManagement/apiSlices/categoryApi';
import { CategoryGetAllReqDto, CategoryResponseDto, CategoryRequestDto } from '@/stateManagement/models/category/category-dto';
import paginationValues from '@/core/constants/pagination';
import { closeInstanceModal, launchInstanceModal } from '@/core/services/modalService';
import { dispatchNotifyStackSuccess, dispatchNotifyStackError } from '@/core/services/notistack';
import baseModalOptions from '@/utils/baseOptionsInstanceModal';

export const useCategoryActions = () => {
	const [open, setOpen] = useState(false);
	const [dataById, setDataById] = useState<CategoryResponseDto | null>(null);
	const [filters, setFilters] = useState<CategoryGetAllReqDto>({
		...paginationValues
	});

	const [getAll, { data, isLoading: isLoadingGetAll }] = useLazyGetAllCategoryQuery();
	const [getById] = useLazyGetByIdCategoryQuery();
	const [create, { isLoading: isLoadingCreate }] = useCreateCategoryMutation();
	const [update, { isLoading: isLoadingUpdate }] = useUpdateCategoryMutation();
	const [remove] = useRemoveCategoryMutation();

	const handleClose = () => {
		setDataById(null);
		setOpen(false);
	};

	const handleNew = () => {
		setDataById(null);
		setOpen(true);
	};

	const findById = (id: string) => {
		getById(id)
			.unwrap()
			.then(res => {
				setDataById(res.data);
				setOpen(true);
			})
			.catch(error => {
				dispatchNotifyStackError(error?.data?.messages?.[0]?.message || 'Ocurrió un error inesperado');
			});
	};

	const saveData = (data: CategoryRequestDto, id?: string) => {
		if (id) {
			update({ id, body: data })
				.unwrap()
				.then(() => {
					setOpen(false);
					dispatchNotifyStackSuccess(localize('common.updated'));
				})
				.catch(error => {
					dispatchNotifyStackError(error?.data?.messages?.[0]?.message || 'Ocurrió un error inesperado');
				});
		} else {
			create(data)
				.unwrap()
				.then(() => {
					setOpen(false);
					dispatchNotifyStackSuccess(localize('common.created'));
				})
				.catch(error => {
					dispatchNotifyStackError(error?.data?.messages?.[0]?.message || 'Ocurrió un error inesperado');
				});
		}
	};

	const deleteItem = (id: string) => {
		launchInstanceModal(
			baseModalOptions.confirm({
				onClickOk: () => {
					remove(id)
						.unwrap()
						.then(() => {
							dispatchNotifyStackSuccess(localize('common.deleted'));
						})
						.catch(error => {
							dispatchNotifyStackError(error?.data?.messages?.[0]?.message || 'Ocurrió un error inesperado');
						});
					closeInstanceModal();
				},
				title: localize('common.deleteMessage'),
				cancelText: localize('common.no'),
				subtitle: '',
				okText: localize('common.yes')
			})
		);
	};

	const handleFiltersChange = (newFilters: CategoryGetAllReqDto) => {
		setFilters(prev => ({
			...prev,
			...newFilters,
			page: 1
		}));
	};

	const handlePaginationChange = ({ pageNumber, pageSize }: { pageNumber: number; pageSize: number }) => {
		setFilters(prev => ({ ...prev, page: pageNumber, pageSize }));
	};

	useEffect(() => {
		getAll(filters);
	}, [filters]);

	return {
		open,
		setOpen,
		data,
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
	};
};
