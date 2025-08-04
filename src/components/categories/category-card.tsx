'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { Coffee, Sun, Moon, Cookie, Salad, Pizza, Fish, Soup, ChefHat } from 'lucide-react'
import { Category } from '@/types/types'

// Icon mapping for categories (moved to client component)
const getIconForCategory = (categoryName: string) => {
  const name = categoryName.toLowerCase()
  if (name.includes('desayuno') || name.includes('breakfast')) return Coffee
  if (name.includes('almuerzo') || name.includes('lunch')) return Sun
  if (name.includes('cena') || name.includes('dinner')) return Moon
  if (name.includes('postre') || name.includes('dessert')) return Cookie
  if (name.includes('ensalada') || name.includes('salad')) return Salad
  if (name.includes('pizza') || name.includes('italiana')) return Pizza
  if (name.includes('pescado') || name.includes('mariscos')) return Fish
  if (name.includes('sopa') || name.includes('soup')) return Soup
  return ChefHat // default icon
}

// Color mapping for categories (moved to client component)
const getColorForCategory = (categoryName: string) => {
  const name = categoryName.toLowerCase()
  if (name.includes('desayuno')) return 'from-yellow-400 to-orange-500'
  if (name.includes('almuerzo')) return 'from-orange-400 to-red-500'
  if (name.includes('cena')) return 'from-purple-400 to-blue-500'
  if (name.includes('postre')) return 'from-pink-400 to-red-500'
  if (name.includes('ensalada')) return 'from-green-400 to-emerald-500'
  if (name.includes('pizza')) return 'from-red-400 to-orange-500'
  if (name.includes('pescado')) return 'from-blue-400 to-cyan-500'
  if (name.includes('sopa')) return 'from-amber-400 to-yellow-500'
  return 'from-orange-400 to-red-500' // default color
}

interface CategoryCardProps {
  category: Category
  index: number
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  const IconComponent = getIconForCategory(category.name)
  const color = getColorForCategory(category.name)
  return (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/categories/${category.seo_url}`}>
        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          {/* Background Image */}
          <div className="h-48 bg-cover bg-center relative bg-gray-200">
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-80 group-hover:opacity-90 transition-opacity`}></div>

            {/* Icon */}
            <div className="absolute top-4 left-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Recipe Count */}
            <div className="absolute top-4 right-4">
              <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                {category.total_posts || category.post_count || '0'} recetas
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
              {category.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {category.description || 'Descubre deliciosas recetas en esta categoría'}
            </p>
          </div>

          {/* Hover Effect Border */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-200 rounded-2xl transition-colors"></div>
        </div>
      </Link>
    </motion.div>
  )
}
