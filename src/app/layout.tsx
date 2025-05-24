import { MainLayout } from '@/components/main/main-layout';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { PrimeReactProvider } from 'primereact/api';
import './globals.css';
import { Suspense } from 'react';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
});

export const metadata: Metadata = {
	title: 'Lis Roa | Dux Challenge',
	description: 'Coding challenge for Dux Software'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable} m-0 h-screen w-screen overflow-hidden p-0`}>
				<PrimeReactProvider>
					<MainLayout>
						<Suspense>{children}</Suspense>
					</MainLayout>
				</PrimeReactProvider>
			</body>
		</html>
	);
}
