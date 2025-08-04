// app/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { capitalize } from '@/utils/capitalize'
import HtmlRenderer from '@/components/html-transform/html-renderer'
import { PrePage } from '@/components/juankui/pre-rendered/pre-page'
import { fetchPageById } from '@/api-fetcher/fetcher'
import { createPageTitle, getPageSlugToIdMap, getPostSlugToIdMap } from '@/lib/utils'
import { fetchArticleById } from '@/api-fetcher/fetcher'
import { debug, debugLog } from '@/config/debug-log'
import { PrePost } from '@/components/juankui/pre-rendered/pre-post'
import NotFound from '@/app/not-found'
import { createMetadata } from '@/app/seo/createMetadata'

async function getPageFromParams({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const map = await getPageSlugToIdMap()
  const { slug } = await params
  const id = map[slug]


  const page = await fetchPageById(id)
  return page
}
async function getPostFromParams({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const map = await getPostSlugToIdMap()
  const { slug } = await params
  const id = map[slug]

  const post = await fetchArticleById(id)
  return post
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const page = await getPageFromParams({ params })

  return await createMetadata(page);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const page = await getPageFromParams({ params })

  if (page) return (
    <PrePage page={page}>
      <HtmlRenderer html={page.html_content} cssContent={page.css_content} />
    </PrePage>
  )

  if (!page) {
    const post = await getPostFromParams({ params })

    if (post) return (
      <PrePost post={post.post}>
        <HtmlRenderer html={post.post.html_content} cssContent={post.post.css_content} />
      </PrePost>
    )
    else return <NotFound />
  }
}
