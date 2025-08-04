'use client'

import { motion } from 'motion/react'
import { Clock, Users, Star, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Post } from '@/types/types'

interface FeaturedRecipesProps {
  recipes: Post[]
}

export function FeaturedRecipes({ recipes }: FeaturedRecipesProps) {
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (recipeId: string) => {
    setFavorites(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'text-green-600 bg-green-100'
      case 'Intermedio': return 'text-yellow-600 bg-yellow-100'
      case 'Difícil': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  // Helper function to extract difficulty from custom fields or default
  const getRecipeDifficulty = (post: Post): string => {
    // You can customize this logic based on how difficulty is stored in your posts
    // For now, we'll use a simple default
    return 'Intermedio'
  }

  // Helper function to extract prep time from custom fields or default
  const getRecipePrepTime = (post: Post): string => {
    // You can customize this logic based on how prep time is stored in your posts
    return '30 min'
  }

  // Helper function to extract servings from custom fields or default
  const getRecipeServings = (post: Post): number => {
    // You can customize this logic based on how servings are stored in your posts
    return 4
  }

  // Helper function to generate a rating (you might want to implement a real rating system)
  const getRecipeRating = (post: Post): number => {
    // For now, generate a random rating between 4.0 and 5.0
    return Math.round((4 + Math.random()) * 10) / 10
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Recetas Destacadas
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Las recetas más populares y mejor valoradas por nuestra comunidad de cocineros
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.slice(0, 6).map((recipe, index) => {
            const difficulty = getRecipeDifficulty(recipe)
            const prepTime = getRecipePrepTime(recipe)
            const servings = getRecipeServings(recipe)
            const rating = getRecipeRating(recipe)
            
            return (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Recipe Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={recipe.featured_image || '/api/placeholder/400/300'}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(recipe.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 ${
                        favorites.includes(recipe.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </button>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 text-white text-sm rounded-full">
                    {recipe.category_name || recipe.primary_category?.name || 'Receta'}
                  </div>
                </div>

                {/* Recipe Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <Link href={`/${recipe.seo_url}`}>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-2">
                        {recipe.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {recipe.excerpt}
                    </p>
                  </div>

                  {/* Recipe Meta */}
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{prepTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{servings}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{rating}</span>
                    </div>
                  </div>

                  {/* Difficulty and Chef */}
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
                      {difficulty}
                    </span>
                    <span className="text-sm text-gray-500">
                      Por {recipe.author_name}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/recipes"
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium text-lg"
          >
            Ver Todas las Recetas
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
