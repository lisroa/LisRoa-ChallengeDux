import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { userApi } from '@/lib/api/user';
import { CreateUserFormSchema, CreateUserFormSchemaType } from '@/lib/schemas/user/form.schema';
import { UserSchemaType, UserStatus } from '@/lib/schemas/user/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useCallback, useRef, useTransition } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
	isOpen: boolean;
	selectedUser: UserSchemaType | null;
	onCloseDialog: (shouldRefetch?: boolean) => void;
}

export const CreateOrMutateUserDialog = ({ isOpen, selectedUser, onCloseDialog }: Props) => {
	const toast = useRef<Toast>(null);
	const [isLoading, startLoadingTransition] = useTransition();

	const form = useForm<CreateUserFormSchemaType>({
		resolver: zodResolver(CreateUserFormSchema),
		mode: 'onBlur',
		defaultValues: {
			id: selectedUser?.id ?? '',
			username: selectedUser?.usuario ?? '',
			status: selectedUser?.estado ?? '',
			sector: selectedUser?.sector ?? undefined
		}
	});

	const onSubmit = useCallback(
		(data: CreateUserFormSchemaType) =>
			startLoadingTransition(async () => {
				if (toast?.current) {
					try {
						if (!!selectedUser?.id) {
							// If a user is selected, it means we should mutate an existing user.
							await userApi.update(data.id, data);

							toast.current.show({
								severity: 'success',
								summary: 'Se ha actualizado el usuario seleccionado',
								detail: 'Los nuevos datos han sido gaurdados y pueden ser visualizados en la tabla.'
							});
						} else {
							// If no user is selected, it means we should create a new user.
							await userApi.create(data);

							toast.current.show({
								severity: 'success',
								summary: 'Se ha creado un nuevo usuario',
								detail: 'Has creado un nuevo usuario en la plataforma de manera exitosa.'
							});
						}

						form.reset();
						onCloseDialog(true);
					} catch {
						toast.current.show({ severity: 'error', summary: 'Ha ocurrido un error' });
					}
				}
			}),
		[form, onCloseDialog, selectedUser]
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
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='flex-column flex w-full gap-5 pt-5'>
					<FormField
						control={form.control}
						name='id'
						render={({ field }) => (
							<FormItem>
								<FormLabel>ID:</FormLabel>

								<InputText
									placeholder='Ingrese el ID del Usuario.'
									{...field}
									disabled={isLoading || !!selectedUser?.id}
								/>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nombre:</FormLabel>

								<InputText placeholder='Ingrese el nombre del usuario.' {...field} disabled={isLoading} />

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='status'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Estado:</FormLabel>

								<Dropdown
									options={[
										{ label: 'Activo', value: UserStatus.ACTIVO },
										{ label: 'Inactivo', value: UserStatus.INACTIVO }
									]}
									placeholder='Seleccionar el estado.'
									{...field}
									disabled={isLoading}
								/>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='sector'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Sector:</FormLabel>

								<Dropdown
									options={[
										// There is no API endpoint for fetching sectors, so we are using hardcoded values
										{ label: '6000', value: 6000 }
									]}
									placeholder='Seleccionar el Sector.'
									{...field}
									disabled={isLoading || !!selectedUser?.id}
								/>

								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='align-items-center justify-content-center flex w-full flex-row gap-2'>
						<Button label='Confirmar' icon='pi pi-check' raised type='submit' disabled={isLoading} />

						<Button label='Cancelar' icon='pi pi-times' outlined onClick={() => onCloseDialog()} disabled={isLoading} />
					</div>
				</form>
			</Form>

			<Toast ref={toast} />
		</Dialog>
	);
};
