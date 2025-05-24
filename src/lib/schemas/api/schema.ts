import { z } from 'zod';

export const ApiPaginationOptionsSchema = z.object({
	_limit: z.number().int().min(1).optional(),
	_page: z.number().int().min(1).optional(),
	_sort: z.string().nullish(),
	_order: z.string().nullish()
});

export type ApiPaginationOptionsSchemaType = z.infer<typeof ApiPaginationOptionsSchema>;
