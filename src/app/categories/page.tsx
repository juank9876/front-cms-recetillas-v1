import { Metadata } from "next"
import { fetchCategories } from '@/api-fetcher/fetcher'
import { Category } from '@/types/types'
import { CategoryCard } from '@/components/categories/category-card'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Categorías de Recetas - Recetillas',
    description: 'Explora todas nuestras categorías de recetas: desayunos, almuerzos, cenas, postres y más.',
    keywords: 'categorías recetas, tipos de comida, cocina por categorías'
  };
}

export default async function CategoriesPage() {
  const categories = await fetchCategories()

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Categorías de Recetas
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Explora nuestras deliciosas categorías y encuentra la receta perfecta para cada ocasión
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-16">
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No hay categorías disponibles</h2>
            <p className="text-gray-600">Vuelve pronto para ver nuestras categorías de recetas.</p>
          </div>
        )}
      </div>
    </main>
  )
}