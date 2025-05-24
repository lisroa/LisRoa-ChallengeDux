import ky from "ky";
import {env} from "@/lib/config/env";

export const api = ky.create({
	prefixUrl: env.NEXT_PUBLIC_API_URL,
	searchParams: {
		sector: env.NEXT_PUBLIC_API_ID
	}
})
