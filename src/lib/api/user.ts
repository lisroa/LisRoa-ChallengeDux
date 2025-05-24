import { api } from '@/lib/config/ky';
import { ApiPaginationOptionsSchemaType } from '@/lib/schemas/api/schema';
import { CreateUserFormSchemaType, UpdateUserFormSchemaType } from '@/lib/schemas/user/form.schema';
import { UserSchemaType } from '@/lib/schemas/user/schema';

export const userApi = {
	findAll: async (
		options: ApiPaginationOptionsSchemaType & { username_like?: string | null; status?: string | null }
	) => {
		const response = await api.get<UserSchemaType[]>('personal', {
			searchParams: {
				_limit: options._limit ?? 10,
				_page: options._page ?? 1,
				...(options._sort ? { _sort: options._sort } : {}),
				...(options._order ? { _order: options._order } : {}),
				...(options.username_like ? { usuario_like: options.username_like } : {}),
				...(options.status ? { estado: options.status } : {})
			}
		});

		const count = response.headers.get('x-total-count');

		return {
			employees: await response.json(),
			count: count ? parseInt(count) : 0
		};
	},
	create: (payload: CreateUserFormSchemaType) => {
		return api.post<UserSchemaType>('personal', {
			json: {
				id: payload.id,
				usuario: payload.username,
				estado: payload.status,
				sector: payload.sector
			}
		});
	},
	update: (id: string, payload: UpdateUserFormSchemaType) => {
		return api.patch<UserSchemaType>(`personal/${id}`, {
			json: {
				usuario: payload.username,
				estado: payload.status
			}
		});
	},
	delete: (id: string) => {
		return api.delete<UserSchemaType>(`personal/${id}`);
	}
};
