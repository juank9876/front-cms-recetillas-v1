'use client'

import { useState } from 'react'
import { Search, ChefHat } from 'lucide-react'
import { SiteSettings, Post, Category } from '@/types/types'
import { Link } from '../juankui/optionals/link'

interface RecipeHeroProps {
  siteSettings?: SiteSettings
  totalRecipes?: number
  featuredRecipe?: Post
  categories?: Category[]
}

export function RecipeHero({ siteSettings, totalRecipes = 1000, featuredRecipe, categories = [] }: RecipeHeroProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className="bg-white border-b border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Horizontal Search Layout */}
        <div className="bg-white border border-gray-300 rounded-lg p-4">
          <div className="flex items-center gap-4">
            {/* Chef Icon and Title */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-800 hidden sm:block">
                ¿Qué te gustaría cocinar?
              </h2>
            </div>

            {/* Search Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Buscar aquí..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Search Button */}
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex-shrink-0">
              <Search className="w-5 h-5" />
            </button>

            {/* Popular Searches - Desktop */}
            <div className="hidden lg:flex lg:flex-col items-start gap-2 pl-5 flex-shrink-0">
              <span className="text-sm font-medium text-gray-700">Categorías</span>
              <div className="flex gap-2">
                {categories.slice(0, 5).map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
                {categories.length === 0 && (
                  <>
                    <button className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition-colors">
                      Pollo
                    </button>
                    <button className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition-colors">
                      Smoothies
                    </button>
                    <button className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition-colors">
                      Pan de Plátano
                    </button>
                    <button className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition-colors">
                      Lasaña
                    </button>
                    <button className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition-colors">
                      Panqueques
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Popular Searches */}
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 w-full mb-2">Categorías</span>
              {categories.length > 0 ? (
                categories.slice(0, 8).map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))
              ) : (
                <>
                  <button className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition-colors">
                    Pollo
                  </button>
                  <button className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition-colors">
                    Smoothies
                  </button>
                  <button className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition-colors">
                    Pan de Plátano
                  </button>
                  <button className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition-colors">
                    Lasaña
                  </button>
                  <button className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition-colors">
                    Panqueques
                  </button>
                  <button className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition-colors">
                    Albóndigas
                  </button>
                  <button className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition-colors">
                    Galletas
                  </button>
                  <button className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition-colors">
                    Chili
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
