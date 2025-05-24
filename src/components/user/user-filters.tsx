import { UserStatus } from '@/lib/schemas/user/schema';
import { Dropdown } from 'primereact/dropdown';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

interface Props {
	search: string | null;
	setSearch: (search: string) => void;

	status: string | null;
	setStatus: (status: UserStatus) => void;
}

export const UserFilters = ({ search, setSearch, status, setStatus }: Props) => {
	return (
		<div className='flex w-full flex-row gap-4 align-items-center justify-content-start'>
			<IconField iconPosition='left'>
				<InputIcon className='pi pi-search'> </InputIcon>
				<InputText value={search} onChange={e => setSearch(e.target.value)} placeholder='Buscar' />
			</IconField>

			<Dropdown
				value={status}
				onChange={e => setStatus(e.target.value)}
				options={[
					{ label: 'Activo', value: UserStatus.ACTIVO },
					{ label: 'Inactivo', value: UserStatus.INACTIVO }
				]}
				placeholder='Seleccionar el estado'
			/>

			{/*Disabled because there is no /sector endpoint to fetch the options from*/}
			<Dropdown options={[]} placeholder='Seleccionar el Sector' disabled />
		</div>
	);
};
