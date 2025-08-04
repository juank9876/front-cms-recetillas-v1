import Image from "next/image"
import { AuthorDate } from "../../author-date"
import { Link } from "../../optionals/link"
import { formatDate, isLiveArticle, isNewArticle, permalinkPost } from "@/lib/utils"
import { NewBadge } from "../../badges/new-badge"
import { LiveBadge } from "../../badges/live-badge"

export async function DestacadoCard({ article, isNew, isLive }: { article: any, isNew?: boolean, isLive?: boolean }) {
    const badge = isNew || isNewArticle(article.created_at) ? <NewBadge /> : isLive || isLiveArticle(article.created_at) ? <LiveBadge /> : null

    return (
        <Link href={await permalinkPost(article.id)} className="flex flex-col gap-6 bg-white overflow-hidden shadow-none">
            {article.featured_image && (
                <div className="relative w-full h-64 md:h-96">
                    <Image
                        src={article.featured_image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}
            <div className="flex flex-col justify-center w-full">
                <h2 className="hover:underline text-3xl md:text-4xl font-bold font-serif leading-tight text-start">{badge} {article.title}</h2>
                <AuthorDate author={article.author_name} date={formatDate(article.created_at, { includeTime: false, uppercase: false })} />
                <p className="text-base text-gray-700 line-clamp-4">{article.excerpt}</p>
            </div>
        </Link>
    )
} 