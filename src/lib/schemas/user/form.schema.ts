import { z } from 'zod';

export const CreateUserFormSchema = z.object({
	id: z.string().min(1, 'El id del usuario es requerido.'),
	username: z.string().min(1, 'El nombre de usuario es requerido.'),
	status: z.string().min(1, 'El estado del usuario es requerido.'),
	sector: z.number({
		message: 'El sector del usuario es requerido.',
	})
});

export type CreateUserFormSchemaType = z.infer<typeof CreateUserFormSchema>;

export const UpdateUserFormSchema = z.object({
	username: z.string().min(1, 'El nombre de usuario es requerido.'),
	status: z.string().min(1, 'El estado del usuario es requerido.')
});

export type UpdateUserFormSchemaType = z.infer<typeof UpdateUserFormSchema>;
