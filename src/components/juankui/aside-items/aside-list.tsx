import { RecentArticles } from '../aside-items/recent-articles'
import { SocialShare } from '../aside-items/social-share'
import { fetchArticles, fetchCategories } from '@/api-fetcher/fetcher'
import { Categories } from '../aside-items/categories'

export async function AsideList () {
  const recentArticles = await fetchArticles()
  const categories = await fetchCategories()
  return (
    <aside className='space-y-16 lg:flex-[0.3]' >
      <RecentArticles articles={recentArticles || []} />
      <SocialShare />
      <Categories categories={categories} />
    </aside>
  )
}