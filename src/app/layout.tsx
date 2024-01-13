import QueryProvider from '@/providers/query-provider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Prueba Técnica para StarFlowers',
	description: 'Aplicación para la prueba técnica de StarFlowers',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="es" className={GeistSans.className}>
			<body>
				<AppRouterCacheProvider options={{ enableCssLayer: false }}>
					<QueryProvider>{children}</QueryProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
