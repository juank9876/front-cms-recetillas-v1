import { fetchCategoryPosts } from "@/api-fetcher/fetcher"
import { Category, Post } from "@/types/types"
import { ListaCard } from "./lista-card"
import { AuthorDate } from "../../author-date"
import { Link } from "../../optionals/link"
import { formatDate, permalinkPost } from "@/lib/utils"
import Image from "next/image"
import { NewBadge } from "../../badges/new-badge"
import { LiveBadge } from "../../badges/live-badge"

export async function CategorySection({ category, isNew, isLive }: { category: Category, isNew?: boolean, isLive?: boolean }) {
    const categoryPosts = await fetchCategoryPosts(category.id)

    const badge = isNew ? <NewBadge /> : isLive ? <LiveBadge /> : null

    if (Number(category.post_count) > 0) return (
        <div key={category.id} className="border-t-8 border-slate-800 w-custom flex flex-col pt-10">
            <h2 className="text-4xl font-extrabold font-serif text-start border-b-2 border-slate-800 pb-2">{category.name}</h2>
            <div className="my-8 w-custom grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5">
                {categoryPosts.posts?.slice(0, 4).map((article: Post) => (
                    <ListaCard key={article.id} article={article} />
                ))}
            </div>
            <div className="flex flex-row gap-4 pb-10">
                {categoryPosts.posts?.slice(5).map(async (article: Post) => (
                    <Link href={await permalinkPost(article.id)} key={article.id} className="flex flex-col w-custom items-start justify-start py-2 border-t border-slate-200 pt-8 first:pl-0 last:border-r-0 gap-5">
                        {article.featured_image && (
                            <div className="relative w-full h-96 flex mx-auto">
                                <Image
                                    src={article.featured_image}
                                    alt={article.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="flex flex-col w-full mx-auto justify-between items-center py-5">
                            <h4 className="hover:underline text-xl font-semibold text-start font-serif">{badge} {article.title}</h4>
                            <div>
                                <AuthorDate isTextCenter={true} author={article.author_name} date={formatDate(article.created_at, { includeTime: false, uppercase: false })} />
                                <p className=" text-start text-base text-gray-600 line-clamp-3">{article.excerpt}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
    return null;
} 