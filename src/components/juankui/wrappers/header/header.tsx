
import { fetchCategories, fetchMenu } from '@/api-fetcher/fetcher'
import { contextSiteSettings } from '@/app/context/getSiteSettings'
import { normalizeUrl } from '@/lib/utils'
import { HeaderClient } from './header-client'

export async function Header() {
  const categoriesItems = await fetchCategories()
  const settings = await contextSiteSettings()
  
  // Fetch menu items to maintain compatibility
  const rawNavItems = await fetchMenu()
  const navItems = rawNavItems?.filter(item => item.status === 'active') || []
  const sortedItems = navItems.sort((a, b) => Number(a.sort_order) - Number(b.sort_order))
  const normalizedItems = sortedItems.map(item => ({
    ...item,
    url: normalizeUrl(item.url)
  }))

  return (
    <HeaderClient 
      categoriesItems={categoriesItems || []} 
      settings={settings} 
      normalizedItems={normalizedItems}
    />
  )
}
