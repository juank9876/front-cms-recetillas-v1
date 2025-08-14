
import { fetchAllSlugs, fetchCategories, fetchMenu } from '@/api-fetcher/fetcher'
import { normalizeUrl } from '@/lib/utils'
import { contextSiteSettings } from '@/app/context/getSiteSettings'
import { Logo } from './logo'
import { RenderMenu } from './render-menu'
import { NavMobile } from './nav-mobile'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { Search, Bell, User, Globe } from 'lucide-react'
import Link from 'next/link'
import { BreakingNews } from './breaking-news'
import { BarraInformativa } from '../../hero/hero-home/barra-informativa'

export async function Header() {
  const rawNavItems = await fetchMenu()
  const navItems = rawNavItems.filter(item => item.status === 'active')
  const sortedItems = navItems.sort((a, b) => Number(a.sort_order) - Number(b.sort_order))

  const normalizedItems = sortedItems.map(item => ({
    ...item,
    url: normalizeUrl(item.url)
  }))
  const categoriesItems = await fetchCategories()
  const settings = await contextSiteSettings()

  const navProps = { categoriesItems, settings, normalizedItems }
  const allSlugs = await fetchAllSlugs("category")

  return (
    <header className="flex flex-col top-0 z-50 w-full bg-white shadow-sm border-b border-slate-200">
      {/* Main Header */}
      <div className='grid grid-cols-3 w-[80vw] mx-auto h-full border-b border-slate-200 pb-5'>
        <BarraInformativa />
        <div className=" flex items-center mx-auto">
          <Logo />
        </div>
        {/* Right Side Actions */}
        <div className="flex items-center space-x-4 justify-end">
          {/* Search */}
          <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <Search className="h-5 w-5 text-slate-600" />
            <span className="sr-only">Search</span>
          </button>

          {/* CTA Button */}
          <Link
            href="/subscribe"
            className="hidden sm:inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] transition-colors"
          >
            SUSCRÍBETE
          </Link>
          <Link
            href="/subscribe"
            className="hidden sm:inline-flex items-center py-2 border border-transparent text-sm font-medium rounded-md text-black hover:text-slate-800  transition-colors"
          >
            INICIAR SESIÓN
          </Link>
        </div>
      </div>

      <div className="bg-white pt-5">
        <div className="mx-auto w-custom">
          <div className="flex items-center justify-center h-fit">
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <NavMobile {...navProps} />
            </div>

            {/* Logo */}


            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex lg:items-center lg:space-x-8">
              <RenderMenu
                categoriesItems={categoriesItems}
                normalizedItems={normalizedItems}
                allSlugs={allSlugs}
              />
            </NavigationMenu>


          </div>
        </div>
      </div>

      <BreakingNews />
    </header>
  )
}
