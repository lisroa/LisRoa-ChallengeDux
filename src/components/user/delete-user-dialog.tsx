import { userApi } from '@/lib/api/user';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useCallback, useRef, useTransition } from 'react';

interface Props {
	isOpen: boolean;
	id: string | null;
	onCloseDialog: (shouldRefetch?: boolean) => void;
}

export const DeleteUserDialog = ({ isOpen, id, onCloseDialog }: Props) => {
	const toast = useRef<Toast>(null);
	const [isLoading, startLoadingTransition] = useTransition();

	const onSubmit = useCallback(
		() =>
			startLoadingTransition(async () => {
				if (toast?.current) {
					try {
						if (!id) {
							return toast.current.show({
								severity: 'error',
								summary: 'No se ha podido eliminar el usuario',
								detail: 'El usuario no existe o no se ha seleccionado correctamente.'
							});
						}

						await userApi.delete(id);

						toast.current.show({
							severity: 'success',
							summary: 'Se ha creado un nuevo usuario',
							detail: 'Has creado un nuevo usuario en la plataforma de manera exitosa.'
						});

						onCloseDialog(true);
					} catch {
						toast.current.show({ severity: 'error', summary: 'Ha ocurrido un error' });
					}
				}
			}),
		[id, onCloseDialog]
	);

	return (
		<Dialog
			header={
				<div className='align-items-center justify-content-between flex w-full flex-row gap-2 bg-blue-500 p-3'>
					<h2 className='m-0 text-xl text-white'>Usuario</h2>

					<div className='align-items-center justify-content-center flex flex-row gap-2'>
						<Button icon='pi pi-cog text-xl' />

						<Button icon='pi pi-times text-xl' onClick={() => onCloseDialog()} />
					</div>
				</div>
			}
			visible={isOpen}
			headerClassName='p-0 m-0'
			style={{ width: '50vw' }}
			closable={false}
			onHide={() => !isLoading && onCloseDialog()}
		>
			<h3 className='text-xl w-full text-center'>Estas seguro de que deseas eliminar el usuario?</h3>

			<p className='w-full text-center'>Esta acción no se puede deshacer y eliminará todos los datos.</p>

			<div className='align-items-center justify-content-center flex w-full flex-row gap-2'>
				<Button label='Eliminar usuario' icon='pi pi-check' severity='danger' raised onClick={onSubmit} disabled={isLoading} />

				<Button label='Cancelar' icon='pi pi-times' outlined onClick={() => onCloseDialog()} disabled={isLoading} />
			</div>

			<Toast ref={toast} />
		</Dialog>
	);
};
