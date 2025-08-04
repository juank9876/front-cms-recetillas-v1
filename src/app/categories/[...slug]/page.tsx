// app/[...slug]/page.tsx
import { notFound } from 'next/navigation'
import { fetchArticleById, fetchCategoryById, fetchPermalink } from '@/api-fetcher/fetcher'
import { getPostSlugToIdMap, getCategorySlugToIdMap, cleanSlug, createPageTitle } from '@/lib/utils'
import { capitalize } from '@/utils/capitalize'
import { PrePost } from '@/components/juankui/pre-rendered/pre-post'
import HtmlRenderer from '@/components/html-transform/html-renderer'
import { PreCategory } from '@/components/juankui/pre-rendered/pre-category'
import { CardPostCategory, CardPostRow } from '@/components/juankui/card-post-category'
import { Category, Post } from '@/types/types'

/** Decide si es un post o categoría y obtiene los datos */
type RouteData =
    | { type: 'post'; post: Post }
    | { type: 'category'; category: Category }

async function getDataFromParams(slugArray: string[]): Promise<RouteData> {
    if (slugArray.length === 0) notFound()

    // 🚨 Eliminar el prefijo "categories" si existe
    if (slugArray[0] === "categories") {
        slugArray = slugArray.slice(1)
    }

    const postMap = await getPostSlugToIdMap()
    const categoryMap = await getCategorySlugToIdMap()


    const categorySlug = slugArray[slugArray.length - 1]
    const postSlug = slugArray[slugArray.length - 1]


    const categoryId = categoryMap[categorySlug]
    const postId = postMap[postSlug]
    const urlSegments = slugArray[0] === "categories" ? slugArray.slice(1) : slugArray;
    let url = "/" + urlSegments.join("/");
    if (!url.endsWith("/")) {
        url += "/";
    }

    if (categoryId) {
        const category = await fetchCategoryById(categoryId)
        console.log(category)

        const permalinkData = await fetchPermalink(categoryId, "category")
        const permalink = permalinkData.permalink

        console.log('permalink', permalink)
        console.log('url', url)

        if (permalink !== url) {
            notFound()
        }

        return { type: 'category', category }
    }


    if (postId) {
        const post = (await fetchArticleById(postId)).post

        const permalinkData = await fetchPermalink(postId, "post")
        const permalink = permalinkData.permalink


        if (permalink !== url) {
            notFound()
        }
        return { type: 'post', post }
    }
    notFound()
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug = [] } = await params

    const data = await getDataFromParams(slug)

    if (data.type === 'post') {
        return {
            title: await createPageTitle(data.post.meta_title, data.post.title),
            description: capitalize(data.post.meta_description) || data.post.excerpt || '',
        }
    }

    return {
        title: await createPageTitle(data.category.meta_title, data.category.name),
        description: capitalize(data.category.meta_description) || data.category.description || '',
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string[] }>
}) {
    const slugArray = (await params).slug || []
    const data = await getDataFromParams(slugArray)


    if (data.type === 'post') {
        const post = data.post
        return (
            <PrePost post={post}>
                <HtmlRenderer html={post.html_content} cssContent={post.css_content} />
            </PrePost>
        )
    }

    const { category } = data
    const posts = category?.posts || []

    return (
        <PreCategory category={category} className="w-full max-w-6xl mx-auto px-2 md:px-4">
            {posts.length === 0 ? (
                <span className="text-muted rounded-lg bg-[var(--color-accent)] px-5 py-10 text-xl italic">
                    Oops! No posts available in this category.
                </span>
            ) : (
                <div className="w-full flex flex-col gap-8 md:gap-10">
                    {/* Grid principal: noticia principal + secundarias */}
                    <div className="w-full flex flex-col lg:flex-row gap-4 md:gap-8">
                        {/* Noticia principal */}
                        <div className="min-w-0 flex-1 lg:basis-0 lg:grow">
                            <CardPostCategory key={posts[0].id} post={posts[0]} category={category} isImgBig={true} />
                        </div>
                        {/* Secundarias (máximo 2) */}
                        <div className="flex flex-col space-y-4 md:space-y-6 lg:basis-[340px] lg:shrink-0 w-full">
                            {posts.slice(1, 3).map((post) => (
                                <CardPostCategory key={post.id} post={post} category={category} isImgBig={false} hideImage={true} />
                            ))}
                        </div>
                    </div>
                    {/* Fila inferior: más noticias en grid */}
                    {posts.length > 3 && (
                        <div className="w-full flex flex-col border-t pt-6 md:pt-8 gap-6 md:gap-8">
                            {posts.slice(3).map((post) => (
                                <CardPostRow key={post.id} post={post} category={category} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </PreCategory>
    )
}
