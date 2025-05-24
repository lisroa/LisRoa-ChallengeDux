import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	client: {
		// System
		NEXT_PUBLIC_API_URL: z.string().url(),
		NEXT_PUBLIC_API_ID: z.string()
	},
	runtimeEnv: {
		// System
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXT_PUBLIC_API_ID: process.env.NEXT_PUBLIC_API_ID,
	}
});
