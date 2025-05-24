import { z } from 'zod';

export enum UserStatus {
	ACTIVO = 'ACTIVO',
	INACTIVO = 'INACTIVO',
}

export const UserSchema = z.object({
	id: z.string(),

	estado: z.nativeEnum(UserStatus),
	sector: z.number(),
	usuario: z.string(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
