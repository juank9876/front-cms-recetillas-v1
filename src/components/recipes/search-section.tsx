'use client'

import { Search, Filter } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              ¿Qué quieres cocinar hoy?
            </h2>
            <p className="text-gray-600 text-lg">
              Busca entre miles de recetas o explora por categorías
            </p>
          </div>

          <div className="relative">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar recetas, ingredientes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
              >
                <Filter className="w-5 h-5" />
                Filtros
              </button>

              {/* Search Button */}
              <button className="px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium">
                Buscar
              </button>
            </div>

            {/* Quick Search Tags */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {['Pasta', 'Pollo', 'Vegetariano', 'Postres', 'Rápido', 'Saludable'].map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-orange-100 hover:text-orange-700 transition-colors text-sm font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-6 bg-gray-50 rounded-xl border"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiempo de preparación
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg">
                      <option>Cualquiera</option>
                      <option>Menos de 15 min</option>
                      <option>15-30 min</option>
                      <option>30-60 min</option>
                      <option>Más de 1 hora</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dificultad
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg">
                      <option>Cualquiera</option>
                      <option>Fácil</option>
                      <option>Intermedio</option>
                      <option>Difícil</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de dieta
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg">
                      <option>Cualquiera</option>
                      <option>Vegetariano</option>
                      <option>Vegano</option>
                      <option>Sin gluten</option>
                      <option>Keto</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
