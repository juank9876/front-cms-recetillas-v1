'use client'

import { motion } from 'motion/react'
import { Coffee, Sun, Moon, Cookie, Salad, Pizza, Fish, Soup, ChefHat, Utensils } from 'lucide-react'
import Link from 'next/link'
import { Category } from '@/types/types'

// Icon mapping for categories
const getIconForCategory = (categoryName: string) => {
  const name = categoryName.toLowerCase()
  if (name.includes('desayuno')) return Coffee
  if (name.includes('almuerzo') || name.includes('comida')) return Sun
  if (name.includes('cena')) return Moon
  if (name.includes('postre') || name.includes('dulce')) return Cookie
  if (name.includes('ensalada') || name.includes('verdura')) return Salad
  if (name.includes('pizza') || name.includes('italiana')) return Pizza
  if (name.includes('marisco') || name.includes('pescado')) return Fish
  if (name.includes('sopa') || name.includes('caldo')) return Soup
  if (name.includes('bebida') || name.includes('drink')) return Coffee
  return ChefHat // Default icon
}

// Color mapping for categories
const getColorForCategory = (categoryName: string) => {
  const name = categoryName.toLowerCase()
  if (name.includes('desayuno')) return 'from-yellow-400 to-orange-500'
  if (name.includes('almuerzo') || name.includes('comida')) return 'from-green-400 to-blue-500'
  if (name.includes('cena')) return 'from-purple-400 to-pink-500'
  if (name.includes('postre') || name.includes('dulce')) return 'from-pink-400 to-red-500'
  if (name.includes('ensalada') || name.includes('verdura')) return 'from-green-400 to-teal-500'
  if (name.includes('pizza') || name.includes('italiana')) return 'from-red-400 to-orange-500'
  if (name.includes('marisco') || name.includes('pescado')) return 'from-blue-400 to-cyan-500'
  if (name.includes('sopa') || name.includes('caldo')) return 'from-orange-400 to-red-500'
  if (name.includes('bebida') || name.includes('drink')) return 'from-cyan-400 to-blue-500'
  return 'from-gray-400 to-gray-600' // Default color
}

interface RecipeCategoriesProps {
  categories: Category[]
}

export function RecipeCategories({ categories }: RecipeCategoriesProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Explora por Categorías
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Encuentra exactamente lo que buscas navegando por nuestras categorías organizadas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = getIconForCategory(category.name)
            const color = getColorForCategory(category.name)
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/categories/${category.seo_url}`}>
                  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                    
                    <div className="relative p-6 text-center">
                      {/* Icon */}
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {category.description || 'Descubre deliciosas recetas en esta categoría'}
                      </p>
                      
                      {/* Recipe Count */}
                      <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 font-medium">
                        {category.total_posts || category.post_count || '0'} recetas
                      </div>
                    </div>
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-gray-200 rounded-2xl transition-colors"></div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
