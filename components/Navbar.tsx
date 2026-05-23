'use client';

import {
    Navbar as HeroUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
} from '@heroui/navbar';
import { Link } from '@heroui/link';
import React from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { Logo } from '@/components/Icons';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const pathname = usePathname();
    const isHome   = pathname === '/';

    return (
        <HeroUINavbar
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            maxWidth="xl"
            position="sticky"
            shouldHideOnScroll={false}
            classNames={{
                base:    'glass-dark border-b border-sky-500/8 dark:border-sky-500/6 z-50',
                wrapper: 'px-4 sm:px-6',
            }}
        >
            <NavbarContent justify="start">
                {!isHome && (
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? 'Close' : 'Open'}
                        className="lg:hidden text-sky-700 dark:text-sky-300"
                    />
                )}
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <Link className="flex items-center gap-2" href="/">
                        <Logo size={26} className="text-brand-blue" />
                        <span className="font-bold tracking-tight text-[15px] text-slate-900 dark:text-white">
                            Novarra
                        </span>
                    </Link>
                </NavbarBrand>

                {!isHome && (
                    <ul className="hidden lg:flex gap-1 ml-6">
                        {siteConfig.navItems.map((item) => {
                            const active = pathname === item.href;
                            return (
                                <NavbarItem key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={clsx(
                                            'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                                            active
                                                ? 'text-slate-900 dark:text-white bg-sky-100 dark:bg-sky-900/30'
                                                : 'text-slate-500 dark:text-sky-300/60 hover:text-slate-900 dark:hover:text-white hover:bg-sky-50 dark:hover:bg-sky-900/20',
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                </NavbarItem>
                            );
                        })}
                    </ul>
                )}
            </NavbarContent>

            {!isHome && (
                <NavbarContent className="hidden sm:flex" justify="end">
                    <NavbarItem>
                        <Link
                            href="/contact-us"
                            className="px-5 py-2 rounded-full text-sm font-semibold
                                       bg-brand-blue hover:bg-brand-blue-xl text-white
                                       transition-colors duration-200 glow-blue"
                        >
                            Get in touch
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            )}

            {!isHome && (
                <NavbarMenu className="glass-dark pt-6 pb-8 gap-1">
                    {siteConfig.navItems.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <NavbarMenuItem key={item.href}>
                                <Link
                                    href={item.href}
                                    onPress={() => setIsMenuOpen(false)}
                                    className={clsx(
                                        'block w-full px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200',
                                        active
                                            ? 'text-slate-900 dark:text-white bg-sky-100 dark:bg-sky-900/30'
                                            : 'text-slate-500 dark:text-sky-300/60 hover:text-slate-900 dark:hover:text-white hover:bg-sky-50 dark:hover:bg-sky-900/20',
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </NavbarMenuItem>
                        );
                    })}
                    <div className="mt-4 px-4">
                        <Link
                            href="/contact-us"
                            onPress={() => setIsMenuOpen(false)}
                            className="block w-full text-center px-5 py-3 rounded-full
                                       text-sm font-semibold bg-brand-blue text-white"
                        >
                            Get in touch
                        </Link>
                    </div>
                </NavbarMenu>
            )}
        </HeroUINavbar>
    );
};
