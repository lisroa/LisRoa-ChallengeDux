'use client';

import { Navbar } from '@/components/main/navbar';
import { Sidebar } from '@/components/main/sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import React from 'react';

export interface QueryClientProps {
	children: React.ReactNode;
}

const queryClient = new QueryClient();

export const MainLayout = ({ children }: QueryClientProps) => {
	return (
		<NuqsAdapter>
			<QueryClientProvider client={queryClient}>
				<div className='flex-column align-items-center justify-content-start flex h-screen w-screen flex-1 overflow-hidden'>
					<Navbar />

					<main className='justify-content-start align-items-start relative flex w-full flex-1 flex-row overflow-hidden'>
						<Sidebar />

						<div className='flex-column flex h-full w-full flex-1 overflow-hidden p-5'>{children}</div>
					</main>
				</div>
			</QueryClientProvider>
		</NuqsAdapter>
	);
};
