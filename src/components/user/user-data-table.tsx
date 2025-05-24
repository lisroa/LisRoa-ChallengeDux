import { UserSchemaType } from '@/lib/schemas/user/schema';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { Skeleton } from 'primereact/skeleton';

interface Props {
	data: UserSchemaType[];
	count: number;
	isFetching: boolean;

	// Pagination
	page: number;
	rows: number;
	handleRowsChange: (e: PaginatorPageChangeEvent) => void;

	// Sorting
	sortField?: string | null;
	sortOrder?: 1 | 0 | -1 | null;
	handleSortRows: (e: DataTableStateEvent) => void;

	// Actions
	onEdit: (user: UserSchemaType) => void;
	onDelete: (id: string) => void;
}

const SkeletonComponent = <Skeleton className='h-2rem' />;

export const UserDataTable = ({
	data,
	count,
	isFetching,

	// Pagination
	page,
	rows,
	handleRowsChange,

	// Sorting
	sortField,
	sortOrder,
	handleSortRows,

	// Actions
	onEdit,
	onDelete
}: Props) => {
	return (
		<div className='flex-column justify-content-between flex h-full w-full flex-1 overflow-hidden'>
			<div className='flex-column flex w-full flex-1 overflow-hidden'>
				<DataTable
					value={isFetching ? Array.from({ length: rows }, () => ({})) : data}
					className='w-full'
					scrollable
					scrollHeight='flex'
					lazy
					stripedRows
					onSort={handleSortRows}
					sortField={sortField ?? undefined}
					sortOrder={sortOrder}
					sortMode='single'
					removableSort
				>
					<Column sortable field='id' header='ID' body={isFetching && SkeletonComponent} />
					<Column
						sortable
						field='usuario'
						header='Usuario'
						body={(row: UserSchemaType) =>
							isFetching ? (
								SkeletonComponent
							) : (
								<p className='cursor-pointer text-blue-500 underline hover:text-purple-900 m-0' onClick={() => onEdit(row)}>
									{row.usuario}
								</p>
							)
						}
					/>
					<Column sortable field='estado' header='Estado' body={isFetching && SkeletonComponent} />
					<Column sortable field='sector' header='Sector' body={isFetching && SkeletonComponent} />

					<Column
						header='Acciones'
						body={(row: UserSchemaType) => (
							<Button
								icon='pi pi-trash text-xl'
								className='p-button-rounded p-button-text p-button-danger'
								onClick={() => onDelete(row.id)}
							/>
						)}
						headerClassName='text-left font-bold bg-[#F9FAFB]'
						bodyClassName='text-left'
						style={{ width: '20%' }}
					/>
				</DataTable>
			</div>

			<Paginator
				rows={rows}
				totalRecords={count}
				first={(page - 1) * rows}
				onPageChange={handleRowsChange}
				rowsPerPageOptions={[5, 10, 30]}
			/>
		</div>
	);
};
