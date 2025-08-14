
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
import { HeaderClient } from './header-client'

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
    <HeaderClient allSlugs={allSlugs} categoriesItems={categoriesItems} settings={settings} normalizedItems={normalizedItems} />
  )
}
