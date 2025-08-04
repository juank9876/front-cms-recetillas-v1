import { fetchSiteSettings, fetchArticles, fetchCategories } from '@/api-fetcher/fetcher'
import { createMetadata } from '@/app/seo/createMetadata'
import { PreHomePage } from '@/components/juankui/pre-rendered/pre-home'
import { Metadata } from 'next'
import { RecipeHero } from '@/components/recipes/recipe-hero'
import { SearchSection } from '@/components/recipes/search-section'
import { RecipeCategories } from '@/components/recipes/recipe-categories'
import { FeaturedRecipes } from '@/components/recipes/featured-recipes'


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Recetillas - Las mejores recetas caseras',
    description: 'Descubre deliciosas recetas caseras, desde platos tradicionales hasta creaciones modernas. Cocina fácil y sabrosa.',
    keywords: 'recetas, cocina, comida casera, ingredientes, cocinar'
  };
}

export default async function Home() {
  const settings = await fetchSiteSettings()
  const posts = await fetchArticles() // Fetch all posts (recipes)
  const categories = await fetchCategories() // Fetch all categories

  // Filter published posts and limit to featured recipes
  const publishedPosts = posts?.filter(post => post.status === 'published') || []
  const featuredRecipes = publishedPosts.slice(0, 6) // Get first 6 as featured

  return (
    <PreHomePage settings={settings}>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">

        {/* Categories */}
        {categories && categories.length > 0 && (
          <RecipeCategories categories={categories} />
        )}

        {/* Featured Recipes */}
        {featuredRecipes && featuredRecipes.length > 0 && (
          <FeaturedRecipes recipes={featuredRecipes} />
        )}
      </div>
    </PreHomePage>
  )
}
