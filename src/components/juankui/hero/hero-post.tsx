'use client'
import { Post } from "@/types/types"
import { Breadcrumbs } from "./breadcrumbs"
import { Link } from "../optionals/link"
import { Clock, Copy } from "lucide-react"
import { formatDate } from "@/lib/utils"
import Image from "next/image"
import { cleanSlug } from "@/lib/utils"

export function HeroPost({
    title,
    excerpt,
    primary_category,
    author_avatar,
    author_name,
    created_at,
    breadcrumbs,
    featured_image
}: Post) {

    const categorySlug =
        breadcrumbs.length === 4
            ? `/${cleanSlug(breadcrumbs[1].url)}/${cleanSlug(breadcrumbs[2].url)}`
            : `/${cleanSlug(breadcrumbs[1].url)}`


    return (
        <section className="w-full bg-white py-2">
            <div className="mx-auto w-[70vw] px-0">
                {/* Breadcrumbs */}

                <Breadcrumbs breadcrumbs={breadcrumbs} />

                {/* Categoría */}
                {primary_category?.name && (
                    <Link href={`/categories${categorySlug}`} className="inline-block rounded-full text-black text-3xl  uppercase tracking-widest underline font-extrabold">
                        {primary_category.name}
                    </Link>
                )}

                {/* Título */}
                <h1 className="mb-3 text-4xl text-start font-bold leading-tight text-gray-900 md:text-5xl">
                    {title}
                </h1>

                {excerpt && (
                    <>
                        <p className=" max-w-3xl text-lg text-gray-700">{excerpt}</p>
                    </>
                )}
                {/* Excerpt */}

                {/* Autor y fecha */}
                <div className="flex flex-col items-start md:items-start mb-3">
                    <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                            <Image
                                src={
                                    author_avatar ||
                                    `https://api.dicebear.com/7.x/lorelei/svg?seed=${author_name || "default"}`
                                }
                                alt={author_name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="text-lg text-gray-500">{author_name}</p>
                    </div>

                    <div className="flex flex-row justify-center items-center gap-x-1 pl-2 mb-3">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <p className="text-sm text-gray-500">
                            {formatDate(created_at, {
                                includeTime: true,
                                uppercase: true,
                                withTimeZone: true
                            })}
                        </p>

                    </div>

                    <div className="flex space-x-4 justify-start items-center">
                        {/* Facebook */}
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? window.location.href : ''}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-800 hover:text-slate-600 transition-colors"
                            aria-label="Compartir en Facebook"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
                        </a>
                        {/* X (Twitter) */}
                        <a
                            href={`https://twitter.com/intent/tweet?url=${typeof window !== 'undefined' ? window.location.href : ''}&text=${encodeURIComponent(title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-800 hover:text-slate-600 transition-colors"
                            aria-label="Compartir en X"
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                        </a>
                        {/* Instagram (copia el enlace) */}
                        <button
                            type="button"
                            onClick={() => {
                                if (typeof window !== 'undefined') {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('Enlace copiado. Ahora puedes compartirlo en Instagram.');
                                }
                            }}
                            className="text-slate-800 hover:text-slate-600 transition-colors"
                            aria-label="Copiar enlace para Instagram"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M16.5 7.5v.01" /></svg>
                        </button>
                        {/* Copiar enlace */}
                        <button
                            type="button"
                            onClick={() => {
                                if (typeof window !== 'undefined') {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('¡Enlace copiado al portapapeles!');
                                }
                            }}
                            className="text-slate-800 hover:text-slate-600 transition-colors"
                            aria-label="Copiar enlace"
                        >
                            <Copy
                                className="size-5 " />
                        </button>
                    </div>
                </div>

                {/* Imagen destacada */}
                <div className="relative mb-6 h-[300px] w-full overflow-hidden rounded-lg md:h-[450px]">
                    <Image
                        src={featured_image || "https://imagenes.elpais.com/resizer/v2/H5RD3AOEDFACTM5YQLKCJTZ6TA.jpg?auth=5672d03482fe2f39ac03675dba3971044a0e73c753e2610fe3ec3bd1640aad5e&width=1200"} // reemplaza con tu imagen destacada real
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}