'use client';

import { CreateOrMutateUserDialog } from '@/components/user/create-or-mutate-user-dialog';
import { DeleteUserDialog } from '@/components/user/delete-user-dialog';
import { UserDataTable } from '@/components/user/user-data-table';
import { UserFilters } from '@/components/user/user-filters';
import { userApi } from '@/lib/api/user';
import { useDialogState } from '@/lib/hooks/dialog/use-dialog-state';
import { UserSchemaType } from '@/lib/schemas/user/schema';
import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, useQueryState } from 'nuqs';
import { Button } from 'primereact/button';
import { DataTableStateEvent } from 'primereact/datatable';
import { PaginatorPageChangeEvent } from 'primereact/paginator';
import { useCallback } from 'react';

export default function Home() {
	const createOrMutateUserDialog = useDialogState<UserSchemaType>();
	const deleteUserDialog = useDialogState<string>();

	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
	const [rows, setRows] = useQueryState('rows', parseAsInteger.withDefault(10));

	const [sortBy, setSortBy] = useQueryState('sortBy');
	const [sortDir, setSortDir] = useQueryState('sortDir');

	const [search, setSearch] = useQueryState('search');
	const [status, setStatus] = useQueryState('status');

	const { data, isFetching, refetch } = useQuery({
		queryKey: ['employee', page, rows, sortBy, sortDir, search, status],
		queryFn: () =>
			userApi.findAll({
				_page: page,
				_limit: rows,
				_sort: sortBy,
				_order: sortDir,
				username_like: search,
				status
			}),
		placeholderData: prev => prev,
		staleTime: 5 * 60 * 1000, // 5 minutes
		refetchOnWindowFocus: false
	});

	const handleRowsChange = useCallback(
		async (e: PaginatorPageChangeEvent) => {
			await setRows(e.rows);
			await setPage((e.page ?? 0) + 1);
		},
		[setPage, setRows]
	);

	const handleSortRows = useCallback(
		async (e: DataTableStateEvent) => {
			if (e.sortOrder === 0) {
				await setSortBy(null);
				await setSortDir(null);
			} else {
				await setSortBy(e.sortField);
				await setSortDir(e.sortOrder === 1 ? 'asc' : 'desc');
			}
		},
		[setSortBy, setSortDir]
	);

	const onCloseDialogs = useCallback(
		async (shouldRefetch: boolean = false) => {
			if (shouldRefetch) {
				await refetch();
			}

			createOrMutateUserDialog.onOpenChange(false);
			deleteUserDialog.onOpenChange(false);
		},
		[createOrMutateUserDialog, deleteUserDialog, refetch]
	);

	return (
		<div className='flex-column flex h-full w-full flex-1 gap-4'>
			<div className='align-items-center justify-content-between flex w-full flex-row'>
				<h1 className='m-0 text-3xl font-bold'>Usuarios</h1>

				<Button
					label='Nuevo usuario'
					icon='pi pi-plus'
					className='bg-blue-500'
					onClick={() => createOrMutateUserDialog.onOpen()}
				/>
			</div>

			<UserFilters search={search} setSearch={setSearch} status={status} setStatus={setStatus} />

			<UserDataTable
				data={data?.employees ?? []}
				count={data?.count ?? 0}
				isFetching={isFetching}
				page={page}
				rows={rows}
				handleRowsChange={handleRowsChange}
				sortField={sortBy}
				sortOrder={sortDir === 'asc' ? 1 : -1}
				handleSortRows={handleSortRows}
				onEdit={createOrMutateUserDialog.onOpen}
				onDelete={deleteUserDialog.onOpen}
			/>

			{createOrMutateUserDialog.isOpen && (
				<CreateOrMutateUserDialog
					isOpen={createOrMutateUserDialog.isOpen}
					selectedUser={createOrMutateUserDialog.state}
					onCloseDialog={onCloseDialogs}
				/>
			)}

			<DeleteUserDialog isOpen={deleteUserDialog.isOpen} id={deleteUserDialog.state} onCloseDialog={onCloseDialogs} />
		</div>
	);
}
