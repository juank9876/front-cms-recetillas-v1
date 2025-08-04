import Image from "next/image"
import { AuthorDate } from "../../author-date"
import { Link } from "../../optionals/link"
import { formatDate, isLiveArticle, isNewArticle, permalinkPost } from "@/lib/utils"
import { NewBadge } from "../../badges/new-badge"
import { LiveBadge } from "../../badges/live-badge"

export async function ListaCard({ article, isNew, isLive }: { article: any, isNew?: boolean, isLive?: boolean }) {
    const badge = isNew || isNewArticle(article.created_at) ? <NewBadge /> : isLive || isLiveArticle(article.created_at) ? <LiveBadge /> : null

    return (
        <Link href={await permalinkPost(article.id)} className="flex flex-col w-full items-start justify-start py-2 border-r border-slate-200 pr-3 pl-3 first:pl-0 last:border-r-0">
            {article.featured_image && (
                <div className="relative w-full h-64 flex mb-4">
                    <Image
                        src={article.featured_image}
                        alt={article.title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}
            <div className="flex flex-col justify-center space-y-2">
                <h4 className="text-xl hover:underline font-semibold font-serif">{badge} {article.title}</h4>
                <AuthorDate author={article.author_name} date={formatDate(article.created_at, { includeTime: false, uppercase: false })} />
                {!article.featured_image && (
                    <p className="text-sm text-gray-500 line-clamp-8">{article.excerpt}</p>
                )}
            </div>
        </Link>
    )
} 