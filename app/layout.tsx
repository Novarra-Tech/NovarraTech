import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';

import { Providers } from './providers';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import { Navbar } from '@/components/Navbar';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export const metadata: Metadata = {
    title: {
        default:  siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#040810' },
        { media: '(prefers-color-scheme: dark)',  color: '#040810' },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning lang="en">
            <head />
            <body
                className={clsx(
                    'min-h-screen text-foreground bg-background font-sans antialiased',
                    fontSans.variable,
                )}
            >
                <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
                    <div className="relative flex flex-col min-h-screen">
                        <Navbar />
                        <main className="flex-1">
                            {children}
                        </main>

                        {/* Theme switcher */}
                        <div className="fixed bottom-5 right-5 z-50">
                            <ThemeSwitcher className="transition-transform duration-300 hover:scale-110 hover:rotate-12" />
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
