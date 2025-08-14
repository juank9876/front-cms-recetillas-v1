"use client";
import { Logo } from './logo'
import { RenderMenu } from './render-menu'
import { NavMobile } from './nav-mobile'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { Search, User, Heart, Menu } from 'lucide-react'
import { BreakingNews } from './breaking-news'
import { Category, SiteSettings, NavItemType } from '@/types/types'
import { useState } from 'react'
import { NavLink } from './nav-link';
import { navPosition } from '@/config/options'
import { capitalize } from '@/utils/capitalize'
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Link } from '@/components/juankui/optionals/link';
import { Slug } from '@/api-fetcher/fetcher';

interface HeaderClientProps {
    categoriesItems: Category[];
    settings: SiteSettings | null;
    normalizedItems: NavItemType[];
    allSlugs: Slug[]
}
type ListItemProps = {
    title: string;
    href: string;
    children?: React.ReactNode;
    className?: string
    isChild?: boolean
    childCategories?: NavItemType[]
    parentSlug?: string
}
function ListItem({ title, href, className, isChild = false, childCategories, parentSlug }: ListItemProps) {
    const hasSubcategories = childCategories && childCategories.length > 0;
    const [open, setOpen] = useState(false);
    const parentSlugFull = parentSlug + href;

    return (
        <li
            className={hasSubcategories ? 'relative' : ''}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <NavLink
                href={parentSlug ? `${parentSlug}${href}` : href}
                className={`flex items-center px-4 py-3 text-md text-black hover:bg-orange-500 bg-white hover:text-white rounded-lg  transition-colors duration-150 ${isChild ? 'pl-8 text-sm' : ''}`}
            >
                {title}
                {hasSubcategories && (
                    <ChevronUp color='black' className={`text-black ml-2 h-4 w-4 transition-transform duration-200 ${open ? 'rotate-90' : ''}`} />
                )}
            </NavLink>
            {/* Renderizar subcategorías si existen */}
            {hasSubcategories && (
                <ul className={`absolute right-full top-0 mt-0 ml-0 w-[220px] bg-white rounded-lg shadow-lg z-30 ${open ? 'block' : 'hidden'}`}>
                    {childCategories!.map((subcat) => (
                        <ListItem
                            key={subcat.id}
                            title={capitalize(subcat.title)}
                            href={subcat.url}
                            childCategories={subcat.children}
                            parentSlug={parentSlugFull || undefined}
                        />
                    ))}
                </ul>
            )}
        </li>
    )
}
export function HeaderClient({ categoriesItems, settings, normalizedItems, allSlugs }: HeaderClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Create fallback settings if null
    const fallbackSettings: SiteSettings = settings || {
        id: 'fallback',
        project_id: 'fallback',
        site_title: 'Recetillas',
        site_description: 'Tu cocina, tu pasión',
        site_logo: null,
        favicon: null,
        primary_color: '#f97316',
        secondary_color: '#ea580c',
        accent_color: '#fed7aa',
        font_family: 'Inter',
        meta_title: 'Recetillas - Tu cocina, tu pasión',
        meta_description: 'Descubre recetas deliciosas y fáciles de preparar',
        meta_keywords: null,
        ga_tracking_id: null,
        facebook_pixel: null,
        social_links: {
            facebook: '',
            twitter: '',
            instagram: '',
            youtube: '',
            linkedin: ''
        },
        custom_css: null,
        custom_js: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        schema_data: []
    };

    const navProps = { categoriesItems, settings: fallbackSettings, normalizedItems };

    // Use navigation items from API, with fallback
    const mainNavItems = normalizedItems && normalizedItems.length > 0
        ? normalizedItems.map(item => ({
            label: item.title.toUpperCase(),
            href: item.url
        }))
        : [];
    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200">
                {/* Main Header - AllRecipes Style */}
                <div className="bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex items-center justify-between h-16">
                            {/* Left: Logo */}
                            <div className="flex-shrink-0">
                                <Logo siteSettings={settings} />
                            </div>

                            {/* Center: Search Bar (Hidden on mobile) */}
                            <div className="hidden md:flex flex-1 max-w-lg mx-8">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (searchQuery.trim()) {
                                            window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
                                        }
                                    }}
                                    className="relative w-full flex"
                                >
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Buscar recetas o ingredientes..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition-colors font-medium border border-orange-500 hover:border-orange-600"
                                    >
                                        Buscar
                                    </button>
                                </form>
                            </div>

                            {/* Right: Actions */}
                            <div className="flex items-center space-x-4">
                                {/* Mobile Search Button */}
                                <button className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors">
                                    <Search className="h-5 w-5 text-gray-600" />
                                </button>

                                {/* Login Button */}
                                <Link
                                    href="/login"
                                    className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 transition-colors"
                                >
                                    <User className="w-4 h-4" />
                                    <span className="hidden sm:inline text-sm font-medium">Log in</span>
                                </Link>

                                {/* Magazine Link */}
                                <Link
                                    href="/magazine"
                                    className="hidden sm:inline text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
                                >
                                    Magazine
                                </Link>

                                {/* Newsletter */}
                                <Link
                                    href="/newsletter"
                                    className="hidden sm:inline text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
                                >
                                    Newsletter
                                </Link>

                                {/* Favorites */}
                                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                                </button>

                                {/* Get Magazine CTA */}
                                <Link
                                    href="/get-magazine"
                                    className="hidden lg:inline-flex items-center px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded hover:bg-orange-600 transition-colors"
                                >
                                    GET THE MAGAZINE
                                </Link>

                                {/* Mobile Menu Button */}
                                <button
                                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                                    className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <Menu className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Bar - AllRecipes Style */}
                <div className="bg-white border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4">
                        <nav className="hidden lg:flex items-center space-x-8 h-12">
                            <ul className="flex flex-row gap-2 items-center justify-start w-full  border-0 shadow-none py-0">
                                {normalizedItems.map((item) => (
                                    <li key={item.id} className="relative group/menu">
                                        {item.children && item.children.length > 0 ? (
                                            <>
                                                <span className="flex text-base hover:bg-orange-500 hover:text-white  items-center gap-1 px-4 py-3 cursor-pointer tracking-wide  transition-colors duration-150 rounded-lg">
                                                    {capitalize(item.title)}
                                                    <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover/menu:rotate-180" />
                                                </span>
                                                <div className="bg-white absolute left-0 top-full w-[250px]  rounded-lg z-20 hidden group-hover/menu:block ">
                                                    <ul className="py-0 ">
                                                        {item.children.map((category) => {

                                                            const foundCategory = Object.entries(allSlugs).find(([slug, data]) => {
                                                                return '/' + slug === category.url;
                                                            });
                                                            // Construir href
                                                            const isCategory = foundCategory ? `/categories` : "";

                                                            return (
                                                                <ListItem
                                                                    key={category.id}
                                                                    title={capitalize(category.title)}
                                                                    href={category.url}
                                                                    childCategories={category.children}
                                                                    parentSlug={isCategory} />
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                            </>
                                        ) : (
                                            <NavLink
                                                href={item.url}
                                                className="px-4 py-3 text-base  tracking-wide  hover:text-white hover:bg-orange-500 rounded-lg"
                                            //label={item.title}
                                            >
                                                {item.title}
                                            </NavLink>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Mobile Menu */}
                {showMobileMenu && (
                    <div className="lg:hidden bg-white border-t border-gray-200">
                        <div className="px-4 py-4 space-y-4">
                            {/* Mobile Search */}
                            <div className="md:hidden">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const mobileInput = e.currentTarget.querySelector('input') as HTMLInputElement;
                                        if (mobileInput?.value.trim()) {
                                            window.location.href = `/search?q=${encodeURIComponent(mobileInput.value.trim())}`;
                                        }
                                    }}
                                    className="flex gap-2"
                                >
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Buscar recetas..."
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                                    >
                                        Buscar
                                    </button>
                                </form>
                            </div>

                            {/* Mobile Navigation */}
                            <div className="space-y-2">
                                {mainNavItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="block py-2 text-gray-700 hover:text-orange-600 font-medium"
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            {/* Mobile Actions */}
                            <div className="pt-4 border-t border-gray-200 space-y-2">
                                <Link href="/magazine" className="block py-2 text-gray-700 hover:text-orange-600">
                                    Magazine
                                </Link>
                                <Link href="/newsletter" className="block py-2 text-gray-700 hover:text-orange-600">
                                    Newsletter
                                </Link>
                                <Link
                                    href="/get-magazine"
                                    className="block w-full text-center py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition-colors"
                                >
                                    GET THE MAGAZINE
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
                {/* Stats Bar - AllRecipes Style */}

            </header>
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-3">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-center space-x-8 text-sm font-medium">
                        <div className="flex items-center space-x-2">
                            <span className="text-yellow-300 font-bold">Tu Recurso #1</span>
                            <span>de Recetas Confiables desde 2024</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-6">
                            <div className="flex items-center space-x-1">
                                <span className="text-yellow-300 font-bold">1000+</span>
                                <span>Recetas Originales</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <span className="text-yellow-300 font-bold">50K+</span>
                                <span>Reseñas y Valoraciones</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <span className="text-yellow-300 font-bold">100K+</span>
                                <span>Cocineros Caseros</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}