import { fetchArticles, fetchCategories, fetchSiteSettings } from "@/api-fetcher/fetcher"
import { SiteSettings, Category, Post } from "@/types/types"
import { DestacadoCard } from "./destacado-card"
import { ListaCard } from "./lista-card"
import { CategorySection } from "./category-section"
import { AuthorDate } from "../../author-date"
import { NewBadge } from "../../badges/new-badge"
import { Link } from "../../optionals/link"
import { formatDate, permalinkPost } from "@/lib/utils"
import Image from "next/image"
import { BarraInformativa } from "./barra-informativa"
import { ChefHat, Clock, Users, Star, TrendingUp } from 'lucide-react'
import { RecipeHero } from "@/components/recipes/recipe-hero"
import { SearchSection } from "@/components/recipes/search-section"

export async function HeroHome({ site_title, site_description }: SiteSettings) {
    const articles = await fetchArticles();
    const categories = await fetchCategories();
    const siteSettings = await fetchSiteSettings();

    // Get featured recipe (first published article)
    const publishedArticles = articles?.filter(article => article.status === 'published') || [];
    const featuredRecipe = publishedArticles[0] || null;
    const totalRecipes = publishedArticles.length;

    return (
        <>
            {/* Main Hero Section - AllRecipes Layout */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 py-4">


                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                        {/* Left: Featured Article */}
                        <div className="lg:col-span-2">
                            {featuredRecipe && (
                                <article className="bg-white space-y-2">
                                    {/* Imagen primero - Mayor altura */}
                                    <div className="relative">
                                        {featuredRecipe.featured_image ? (
                                            <Image
                                                src={featuredRecipe.featured_image}
                                                alt={featuredRecipe.title}
                                                width={1000}
                                                height={500}
                                                className="w-full h-[500px] object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-full h-[500px] bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                                                <div className="text-center">
                                                    <ChefHat className="w-24 h-24 text-orange-300 mx-auto mb-4" />
                                                    <p className="text-orange-600 font-medium">Imagen de receta próximamente</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Tag segundo - Menos espacio */}
                                    <div className="">
                                        <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 text-sm font-semibold rounded-full uppercase tracking-wide">
                                            En la Cocina
                                        </span>
                                    </div>

                                    {/* Título tercero - Menos espacio */}
                                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                                        {featuredRecipe.title}
                                    </h3>

                                    {/* Descripción cuarto - Menos espacio */}
                                    <p className="text-xl text-gray-700 leading-relaxed ">
                                        {featuredRecipe.excerpt || 'Descubre esta increíble receta que combina tradición, sabor y técnicas culinarias que harán que tu cocina se llene de aromas deliciosos y momentos inolvidables.'}
                                    </p>

                                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                            <div className="flex items-center space-x-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{Math.floor(Math.random() * 45) + 15} min</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Users className="w-4 h-4" />
                                                <span>4 porciones</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                                ))}
                                                <span className="ml-1">4.8</span>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/recipe/${featuredRecipe.id}`}
                                            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                                        >
                                            Ver Receta Completa
                                            <TrendingUp className="w-4 h-4 ml-2" />
                                        </Link>
                                    </div>
                                </article>
                            )}
                        </div>

                        {/* Right: The Latest Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-orange-500">
                                    Lo Más Reciente
                                </h2>

                                <div className="space-y-3">
                                    {articles.slice(1, 6).map((article: Post, index: number) => (
                                        <article key={article.id} className="flex space-x-3">
                                            <div className="flex-shrink-0">
                                                {article.featured_image ? (
                                                    <Image
                                                        src={article.featured_image}
                                                        alt={article.title}
                                                        width={80}
                                                        height={80}
                                                        className="w-20 h-20 object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                                                        <ChefHat className="w-8 h-8 text-orange-300" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2 mb-0.5">
                                                    <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded uppercase">
                                                        {index === 0 ? 'Comida Rápida' : index === 1 ? 'Consejos' : index === 2 ? 'En la Cocina' : 'Postres'}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        hace {Math.floor(Math.random() * 12) + 1} horas
                                                    </span>
                                                </div>

                                                <Link
                                                    href={`/recipe/${article.id}`}
                                                    className="block"
                                                >
                                                    <h3 className="text-sm font-bold text-gray-900 hover:text-orange-600 transition-colors line-clamp-2 mb-0.5">
                                                        {article.title}
                                                    </h3>
                                                </Link>

                                                <p className="text-xs text-gray-600 line-clamp-2">
                                                    {article.excerpt?.slice(0, 80) || 'Una deliciosa receta que te encantará...'}
                                                </p>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                <div className="mt-4 pt-3 border-t border-gray-200">
                                    <Link
                                        href="/recipes"
                                        className="block w-full text-center py-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                                    >
                                        Ver Más
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Mejores Recetas - Grid 2x4 */}
            <section className="bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            Las Mejores Recetas
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Descubre nuestras recetas más populares, probadas y amadas por miles de cocineros
                        </p>
                    </div>

                    {/* Grid de 8 recetas (2 filas x 4 columnas) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {articles.slice(0, 8).map(async (article: Post, index: number) => {
                            const href = await permalinkPost(article.id);
                            return (
                                <Link href={href} key={article.id} className="group">
                                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-orange-200 transition-all duration-300 transform hover:-translate-y-2 h-[500px] flex flex-col">
                                        {/* Imagen de la receta */}
                                        <div className="relative h-48 bg-gradient-to-br from-orange-100 to-red-100 overflow-hidden">
                                            {article.featured_image ? (
                                                <Image
                                                    src={article.featured_image}
                                                    alt={article.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full">
                                                    <ChefHat className="w-16 h-16 text-orange-300" />
                                                </div>
                                            )}

                                            {/* Badge de popularidad */}
                                            {index < 3 && (
                                                <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                    <Star className="w-3 h-3 fill-current" />
                                                    {index === 0 ? 'Top 1' : index === 1 ? 'Top 2' : 'Top 3'}
                                                </div>
                                            )}

                                            {/* Tiempo de cocción */}
                                            <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {Math.floor(Math.random() * 45) + 15} min
                                            </div>
                                        </div>

                                        {/* Contenido de la tarjeta */}
                                        <div className="p-6 flex-1 flex flex-col justify-between">
                                            {/* Título */}
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                                                {article.title}
                                            </h3>

                                            {/* Descripción */}
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                {article.excerpt || 'Una deliciosa receta que te encantará preparar y compartir con tus seres queridos.'}
                                            </p>

                                            {/* Metadata */}
                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                                                        {article.author_name?.charAt(0) || 'C'}
                                                    </div>
                                                    <span>{article.author_name || 'Chef'}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-3 h-3" />
                                                    <span>{Math.floor(Math.random() * 500) + 100}</span>
                                                </div>
                                            </div>

                                            {/* Rating */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                                }`}
                                                        />
                                                    ))}
                                                    <span className="text-sm text-gray-600 ml-1">4.{Math.floor(Math.random() * 9) + 1}</span>
                                                </div>

                                                {/* Dificultad */}
                                                <div className="flex items-center gap-1">
                                                    <div className={`w-2 h-2 rounded-full ${index % 3 === 0 ? 'bg-green-400' :
                                                        index % 3 === 1 ? 'bg-yellow-400' : 'bg-red-400'
                                                        }`}></div>
                                                    <span className="text-xs text-gray-500">
                                                        {index % 3 === 0 ? 'Fácil' : index % 3 === 1 ? 'Medio' : 'Difícil'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* CTA para ver más recetas */}
                    <div className="text-center mt-12">
                        <Link
                            href="/recipes"
                            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg"
                        >
                            Ver Todas las Recetas
                            <TrendingUp className="w-5 h-5 ml-2" />
                        </Link>
                    </div>
                    {/* Search Bar */}
                    <RecipeHero
                        siteSettings={siteSettings}
                        totalRecipes={totalRecipes}
                        featuredRecipe={featuredRecipe}
                        categories={categories}
                    />
                </div>
            </section>
        </>
    )
}