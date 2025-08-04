import { formatDate } from "@/lib/utils";
import { Post } from "@/types/types";
import Image from "next/image";
import { DivAccent } from "./div-accent";
import { Link } from "../optionals/link";
import { fetchCategoryById } from "@/api-fetcher/fetcher";

export function RecentArticles({ articles, className }: { articles: Post[], className?: string }) {
  if (!articles || articles.length === 0) {
    return null; // No hay artículos recientes
  }
  //const category = fetchCategoryById(articles[2].category_id)
  const sortedArticles = articles
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  // Separo el primero del resto
  const [main, ...rest] = sortedArticles;

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      <h2 className='text-2xl font-bold'>Artículos recientes</h2>
      <DivAccent />
      <div className="flex flex-col gap-2">
        {/* Primer artículo destacado */}
        {main && (
          <Link
            href={
              main.breadcrumbs.length === 4
                ? `/categories${main.breadcrumbs[1].url}${main.breadcrumbs[3].url.slice(1)}`
                : main.breadcrumbs.length === 2
                  ? `/categories${main.breadcrumbs[1].url}`
                  : `/categories${main.breadcrumbs[2].url}`
            }
            className="block group mb-2"
          >
            <div className="w-full aspect-[16/9] relative rounded overflow-hidden">
              {main.featured_image && (
                <Image
                  src={main.featured_image}
                  alt={main.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="mt-2">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:underline group-hover:decoration-[var(--color-black,red)] group-hover:decoration-2 font-serif line-clamp-2">{main.title}</h3>
              {main.author_name && (
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide mt-1 mb-1">
                  {main.author_name}
                </div>
              )}
              <p className="text-xs text-slate-400 mt-1">{formatDate(main.created_at)}</p>
            </div>
          </Link>
        )}
        {/* Lista de los demás artículos */}
        <ul className='flex flex-col gap-1'>
          {rest.map((article, index) => {
            const url =
              article.breadcrumbs.length === 4
                ? `/categories${article.breadcrumbs[1].url}${article.breadcrumbs[3].url.slice(1)}`
                : article.breadcrumbs.length === 2
                  ? `/categories${article.breadcrumbs[1].url}`
                  : `/categories${article.breadcrumbs[2].url}`;
            return (
              <li key={article.id || index}>
                <Link
                  href={url || `/categories/single/${article.slug}`}
                  className="group flex w-full items-center gap-4 py-2 px-1 hover:bg-slate-50 overflow-hidden flex-row"
                >
                  {/* Miniatura */}
                  {article.featured_image && (
                    <div className="relative min-w-[90px] min-h-[60px] w-[90px] h-[60px] md:w-[120px] md:h-[80px] overflow-hidden rounded">
                      <Image
                        src={article.featured_image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {/* Contenido textual */}
                  <div className="flex flex-1 flex-col justify-center min-w-0">
                    <h4 className="line-clamp-2 text-md md:text-lg font-bold text-slate-900 group-hover:underline group-hover:decoration-[var(--color-black,red)] group-hover:decoration-2 font-sans text-left">{article.title}</h4>
                    {(article.author_name || article.created_at) && (
                      <div className="flex items-center gap-x-1 text-xs text-slate-500 font-semibold uppercase tracking-wide">
                        {article.author_name && <span className="py-0 text-xs">{article.author_name}</span>}
                        {article.author_name && article.created_at && <span className="py-0 text-xs">·</span>}
                        {article.created_at && <span className="normal-case text-slate-400 text-xs py-0">{formatDate(article.created_at)}</span>}
                      </div>
                    )}
                    {article.excerpt && (
                      <p className="text-xs text-slate-600 line-clamp-2">{article.excerpt}</p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  )
}