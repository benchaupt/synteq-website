"use client";
import { cn } from '@/lib/utils';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatedButton } from './animated-button';

export const Navigation = () => {
    const [mobileNavbar, setMobileNavbar] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mobileNavbar) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileNavbar]);

    return (
        <nav className={cn(`sticky top-0 z-50 bg-background backdrop-blur-xl transition-all duration-200 border-b`, isScrolled ? 'border-white/5' : 'border-transparent')}>
            <div className="flex flex-row items-center justify-between py-5 px-5 max-w-viewport w-full mx-auto relative z-[70]">
                {/* Logo */}
                <Link href="/" className="flex items-center group/logo">
                    <svg viewBox="0 0 159 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto text-white transition-colors duration-200 group-hover/logo:text-accent">
                        <g clipPath="url(#clip0_407_3194)">
                            <path d="M11.3314 36.0003C4.58532 36.0003 0.155704 32.1363 0 26.2068H5.56403C5.71973 29.2256 8.19193 30.8112 11.538 30.8112C14.6298 30.8112 16.9971 29.4861 16.9971 27.1061C16.9971 24.3542 14.0102 23.7696 10.6101 23.1881C5.97394 22.3396 0.514776 21.2815 0.514776 14.6657C0.514776 9.53061 4.78869 5.98438 11.2806 5.98438C17.7725 5.98438 21.9415 9.63865 22.0464 15.1423H16.6381C16.5364 12.4413 14.4741 10.9605 11.1281 10.9605C7.98538 10.9605 6.02796 12.3905 6.02796 14.4559C6.02796 16.998 8.86241 17.4747 12.2085 18.0562C16.8955 18.8506 22.612 19.8039 22.612 26.8455C22.612 32.4032 18.1316 36.0034 11.3314 36.0034V36.0003Z" fill="currentColor" />
                            <path d="M44.6556 6.66797H50.7344L37.9603 35.7846C34.8177 42.9851 32.0372 45.524 26.3715 45.524H23.5371V40.2301H25.9584C29.6159 40.2301 30.7471 39.1179 32.8094 34.5644L33.4259 33.1885L21.3223 6.66797H27.5028L36.362 26.6267L44.6556 6.66797Z" fill="currentColor" />
                            <path d="M66.947 6.03516C73.4897 6.03516 77.5571 11.0113 77.5571 18.053V35.2598H71.8405V19.2732C71.8405 14.0841 69.6257 11.3323 65.4535 11.3323C61.0747 11.3323 57.9861 14.9325 57.9861 19.9627V35.263H52.2695V6.67068H56.2352L57.3696 10.6936C59.4287 7.78285 62.8796 6.03516 66.9502 6.03516H66.947Z" fill="currentColor" />
                            <path d="M93.5171 29.965H96.7106V35.259H92.4367C86.3579 35.259 82.5987 31.395 82.5987 25.0937V11.7541H77.6035V10.5879L87.2858 0H88.2645V6.66984H96.5581V11.7509H88.3185V24.6171C88.3185 28.0585 90.171 29.965 93.5203 29.965H93.5171Z" fill="currentColor" />
                            <path d="M125.827 21.0718C125.827 21.7073 125.776 22.3428 125.672 22.9783H103.11C103.832 27.6367 107.076 30.4966 111.607 30.4966C114.957 30.4966 117.632 28.9078 119.129 26.2608H125.154C122.939 32.2951 117.839 36.0034 111.607 36.0034C103.469 36.0034 97.3398 29.5433 97.3398 20.9669C97.3398 12.3905 103.469 5.98438 111.607 5.98438C120.158 5.98438 125.824 12.7623 125.824 21.0718H125.827ZM111.611 11.3291C107.337 11.3291 104.194 13.9761 103.266 18.2119H120.057C119.027 13.8713 115.884 11.3291 111.611 11.3291Z" fill="currentColor" />
                            <path d="M148.684 26.4489H141.588L151.785 39.6806H158.881L153.647 32.89C156.713 30.0746 158.572 25.9881 158.572 21.2789C158.572 12.3943 151.899 5.68945 142.964 5.68945C134.028 5.68945 127.27 12.4387 127.27 21.2789C127.27 30.1191 133.984 36.9097 142.964 36.9097C144.575 36.9097 146.113 36.6936 147.549 36.2837L143.205 30.8023C143.126 30.8023 143.043 30.8023 142.961 30.8023C137.714 30.8023 133.73 26.6586 133.73 21.2789C133.73 15.8992 137.718 11.7969 142.961 11.7969C148.204 11.7969 152.109 15.8547 152.109 21.2789C152.109 23.856 151.226 26.1343 149.735 27.8153L148.684 26.4489Z" fill="currentColor" />
                            <path d="M133 50V41H134V50H133Z" fill="currentColor" />
                            <path d="M124.004 50L127.469 41H128.535L132 50H130.802L130.01 47.9305H125.969L125.176 50H124H124.004ZM126.392 46.799H129.58L127.984 42.4926L126.388 46.799H126.392Z" fill="currentColor" />
                        </g>
                        <defs>
                            <clipPath id="clip0_407_3194">
                                <rect width="158.881" height="50" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </Link>

                {/* Desktop Navigation */}
                <NavigationMenu.Root className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10 overflow-visible">
                    <NavigationMenu.List className="flex flex-row items-center gap-1">
                        {/* Clusters Link */}
                        <NavigationMenu.Item>
                            <NavigationMenu.Link asChild>
                                <Link href="/clusters" className="px-4 py-2 text-white/80 hover:text-accent transition-colors duration-200 text-sm">
                                    Clusters
                                </Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>

                        {/* Cloud Link */}
                        <NavigationMenu.Item>
                            <NavigationMenu.Link asChild>
                                <Link href="/cloud" className="px-4 py-2 text-white/80 hover:text-accent transition-colors duration-200 text-sm">
                                    Cloud
                                </Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>

                        {/* Compute Link */}
                        <NavigationMenu.Item>
                            <NavigationMenu.Link asChild>
                                <Link href="/compute" className="px-4 py-2 text-white/80 hover:text-accent transition-colors duration-200 text-sm">
                                    Compute
                                </Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>

                        {/* Resources Dropdown */}
                        <NavigationMenu.Item className="relative">
                            <NavigationMenu.Trigger className="group px-4 py-2 text-sm flex items-center gap-1 text-white/80 hover:text-accent data-[state=open]:text-accent transition-colors duration-200">
                                Resources
                                <svg
                                    className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </NavigationMenu.Trigger>
                            <NavigationMenu.Content className="absolute left-1/2 -translate-x-1/2 top-full mt-2.5 w-auto rounded-xl border border-white/5 bg-background-dropdown shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 duration-200">
                                <div className="p-4 sm:w-[320px]">
                                    <div className="space-y-1">
                                        {/* Disabled - API */}
                                        <div className="flex items-center gap-3 px-3 py-3 rounded-lg opacity-50 cursor-not-allowed">
                                            <div className="size-8 rounded-md bg-white/5 flex items-center justify-center shrink-0">
                                                <svg className="size-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-sm text-white">API</div>
                                                <div className="text-xs text-white/40 mt-0.5">OpenAPI compatible</div>
                                            </div>
                                        </div>
                                        {/* Model Library */}
                                        <NavigationMenu.Link asChild>
                                            <Link href="/models" className="group/item flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 transition-all duration-200">
                                                <div className="size-8 rounded-md bg-white/5 flex items-center justify-center shrink-0 group-hover/item:bg-accent/10 transition-colors">
                                                    <svg className="size-4 text-white/60 group-hover/item:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium text-sm text-white group-hover/item:text-accent transition-colors">Models</div>
                                                    <div className="text-xs text-white/40 mt-0.5">255+ production models</div>
                                                </div>
                                            </Link>
                                        </NavigationMenu.Link>
                                        <NavigationMenu.Link asChild>
                                            <Link href="/blogs" className="group/item flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 transition-all duration-200">
                                                <div className="size-8 rounded-md bg-white/5 flex items-center justify-center shrink-0 group-hover/item:bg-accent/10 transition-colors">
                                                    <svg className="size-4 text-white/60 group-hover/item:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium text-sm text-white group-hover/item:text-accent transition-colors">Blog</div>
                                                    <div className="text-xs text-white/40 mt-0.5">Latest updates & insights</div>
                                                </div>
                                            </Link>
                                        </NavigationMenu.Link>
                                    </div>
                                </div>
                            </NavigationMenu.Content>
                        </NavigationMenu.Item>

                        {/* Regular Links */}
                        <NavigationMenu.Item>
                            <NavigationMenu.Link asChild>
                                <Link href="/about" className="px-4 py-2 text-white/80 hover:text-accent transition-colors duration-200 text-sm">
                                    About Us
                                </Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>

                    </NavigationMenu.List>
                </NavigationMenu.Root>

                {/* CTA Buttons */}
                <div className="hidden lg:flex items-center gap-2">
                    <Link href="/contact">
                        <AnimatedButton background="primary" className="hover:bg-background-secondary px-4 py-2.5">
                            Contact Sales
                        </AnimatedButton>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-white/80 hover:text-accent transition-colors relative z-[70]"
                    onClick={() => setMobileNavbar(!mobileNavbar)}
                    aria-label="Toggle menu"
                >
                    {mobileNavbar ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileNavbar && (
                <div className="fixed inset-0 z-[60] lg:hidden">
                    {/* Background overlay */}
                    <div 
                        className="fixed inset-0 bg-background/95 backdrop-blur-xl" 
                        onClick={() => setMobileNavbar(false)} 
                        aria-hidden="true"
                    />
                    
                    {/* Menu content */}
                    <div className="fixed inset-x-0 top-0 pt-20 pb-8 overflow-y-auto max-h-screen">
                        <div className="relative w-full max-w-md mx-auto px-5">
                            <nav className="flex flex-col gap-1 bg-background-secondary rounded-2xl p-4 shadow-xl border border-white/5">
                                {/* Clusters Link */}
                                <Link
                                    href="/clusters"
                                    className="text-lg text-white/90 hover:text-accent hover:bg-white/5 transition-all rounded-lg px-4 py-4 border-b border-white/5"
                                    onClick={() => setMobileNavbar(false)}
                                >
                                    Clusters
                                </Link>

                                {/* Cloud Link */}
                                <Link
                                    href="/cloud"
                                    className="text-lg text-white/90 hover:text-accent hover:bg-white/5 transition-all rounded-lg px-4 py-4 border-b border-white/5"
                                    onClick={() => setMobileNavbar(false)}
                                >
                                    Cloud
                                </Link>

                                {/* Compute Link */}
                                <Link
                                    href="/compute"
                                    className="text-lg text-white/90 hover:text-accent hover:bg-white/5 transition-all rounded-lg px-4 py-4 border-b border-white/5"
                                    onClick={() => setMobileNavbar(false)}
                                >
                                    Compute
                                </Link>

                                {/* Resources Section */}
                                <div className="border-b border-white/5">
                                    <button
                                        onClick={() => setMobileActiveDropdown(mobileActiveDropdown === 'resources' ? null : 'resources')}
                                        className="flex items-center justify-between w-full text-lg text-white/90 hover:text-accent hover:bg-white/5 transition-all rounded-lg px-4 py-4"
                                    >
                                        <span>Resources</span>
                                        <svg
                                            className={cn(
                                                "size-5 transition-transform duration-200",
                                                mobileActiveDropdown === 'resources' && 'rotate-180'
                                            )}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {mobileActiveDropdown === 'resources' && (
                                        <div className="pb-2 px-4 space-y-1">
                                            {/* Disabled - API */}
                                            <div className="flex items-center gap-3 py-3 px-3 rounded-lg opacity-50 cursor-not-allowed">
                                                <div className="size-8 rounded-md bg-white/5 flex items-center justify-center shrink-0">
                                                    <svg className="size-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-white text-sm font-medium">API</div>
                                                    <div className="text-xs text-white/40">OpenAPI compatible</div>
                                                </div>
                                            </div>
                                            {/* Model Library */}
                                            <Link
                                                href="/models"
                                                className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-white/5 transition-colors"
                                                onClick={() => setMobileNavbar(false)}
                                            >
                                                <div className="size-8 rounded-md bg-white/5 flex items-center justify-center shrink-0">
                                                    <svg className="size-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-white text-sm font-medium">Models</div>
                                                    <div className="text-xs text-white/40">255+ production models</div>
                                                </div>
                                            </Link>
                                            <Link
                                                href="/blogs"
                                                className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-white/5 transition-colors"
                                                onClick={() => setMobileNavbar(false)}
                                            >
                                                <div className="size-8 rounded-md bg-white/5 flex items-center justify-center shrink-0">
                                                    <svg className="size-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-white text-sm font-medium">Blog</div>
                                                    <div className="text-xs text-white/40">Latest updates & insights</div>
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* About Us Link */}
                                <Link
                                    href="/about"
                                    className="text-lg text-white/90 hover:text-accent hover:bg-white/5 transition-all rounded-lg px-4 py-4 border-b border-white/5"
                                    onClick={() => setMobileNavbar(false)}
                                >
                                    About Us
                                </Link>

                                {/* CTA Buttons */}
                                <div className="flex flex-col gap-3 pt-6">
                                    <Link href="/contact" onClick={() => setMobileNavbar(false)}>
                                        <AnimatedButton
                                            background="primary"
                                            className="w-full justify-center"
                                        >
                                            Contact Sales
                                        </AnimatedButton>
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
