import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { Link } from '@/components/juankui/optionals/link'
import { Category, Post } from '@/types/types'


export function CardPostCategory({ post, category, isImgBig = false, hideImage = false }: { post: Post, category: Category, isImgBig?: boolean, hideImage?: boolean }) {
  const categoryUrl = category.parent_id ? category.parent_slug + "/" + category.slug : category.slug
  const cardWidth = isImgBig ? 'w-[600px]' : 'w-[340px]'
  const imgHeight = isImgBig ? 'h-[350px]' : 'h-[180px]'
  return (
    <>
      {/* Card estilo El País/CNN para PC */}
      <div className={`group relative hidden ${cardWidth} overflow-hidden bg-white p-0 transition-all duration-200 lg:flex flex-col`}>
        <Link href={`/categories/${categoryUrl}/${post.slug}`} className="h-full w-full flex flex-col">
          {/* Imagen */}
          {!hideImage && (
            <div className={`relative ${imgHeight} w-full overflow-hidden`}>
              <Image
                src={post.featured_image || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop"}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          {/* Contenido */}
          <CardContent className="flex flex-1 flex-col items-start justify-between">
            {/* Categoría */}
            <span className="mb-2 text-xs font-semibold uppercase text-slate-400 tracking-widest">{category.name}</span>
            <h2 className="font-serif line-clamp-2 text-2xl font-bold text-slate-900 group-hover:underline group-hover:decoration-[var(--color-black,red)] group-hover:decoration-2 transition-all text-left">{post.title}</h2>
            <div className="flex flex-row items-center gap-2 text-xs text-slate-400">
              <span className='text-sm'>{formatDate(post.published_at, { uppercase: true })}</span>
              <span>·</span>
              <span className='text-sm'>{post.author_name.toUpperCase()}</span>
            </div>
            <p className="line-clamp-3 text-sm text-slate-600 mb-2 text-left">{post.excerpt}</p>
          </CardContent>
        </Link>
      </div>

      {/* Card estilo El País/CNN para móvil */}
      <Card className="group relative w-full overflow-hidden border border-slate-100 bg-white p-0 transition-all duration-200 lg:hidden flex flex-col">
        <Link href={`/categories/${category.slug}/${post.slug}`} className="flex flex-col w-full">
          {/* Imagen */}
          {!hideImage && (
            <div className="relative h-[180px] w-full overflow-hidden">
              <Image
                src={post.featured_image || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop"}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          {/* Contenido */}
          <CardContent className="flex flex-1 flex-col items-start justify-between p-4">
            {/* Categoría */}
            <span className="mb-2 text-xs font-semibold uppercase text-slate-400 tracking-widest">{category.name}</span>
            <h2 className="mb-1 line-clamp-2 text-lg font-bold text-slate-900 group-hover:underline group-hover:decoration-[var(--color-primary,red)] group-hover:decoration-2 transition-all font-sans text-left">{post.title}</h2>
            <div className="mb-2 flex flex-row items-center gap-2 text-xs text-slate-400">
              <span>{formatDate(post.published_at)}</span>
              <span>·</span>
              <span>{post.author_name}</span>
            </div>
            <p className="line-clamp-2 text-sm text-slate-600 mb-2 text-left">{post.excerpt}</p>
          </CardContent>
        </Link>
      </Card>
    </>
  )
}

export function CardPostRow({ post, category }: { post: Post, category: Category }) {
  return (
    <div className="flex flex-col md:flex-row w-full border-b last:border-b-0 py-6 gap-4">
      {/* Imagen */}
      <div className="relative w-full md:w-56 h-36 flex-shrink-0 overflow-hidden">
        <Image
          src={post.featured_image || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop"}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      {/* Contenido */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <span className="mb-1 text-xs font-semibold uppercase text-slate-400 tracking-widest">{category.name}</span>
        <h2 className="mb-1 line-clamp-2 text-xl md:text-2xl font-serif font-bold text-slate-900 hover:underline hover:decoration-[var(--color-primary,red)] hover:decoration-2 transition-all text-left cursor-pointer">{post.title}</h2>
        <div className="mb-1 flex flex-row items-center gap-2 text-xs text-slate-400">
          <span className='text-sm'>{formatDate(post.published_at, { uppercase: true })}</span>
          <span>·</span>
          <span className='text-sm'>{post.author_name.toUpperCase()}</span>
        </div>
        <p className="line-clamp-3 text-sm text-slate-600 text-left">{post.excerpt}</p>
      </div>
    </div>
  )
}