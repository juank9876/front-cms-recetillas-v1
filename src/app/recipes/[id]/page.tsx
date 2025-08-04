'use client'

import { motion } from 'motion/react'
import { Clock, Users, Star, Heart, ChefHat, Utensils, Timer } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Metadata } from 'next'

// Mock recipe data - in a real app, this would come from an API
const mockRecipe = {
  id: 1,
  title: 'Paella Valenciana Tradicional',
  description: 'La auténtica paella valenciana con pollo, conejo, judías verdes y azafrán. Una receta tradicional que ha pasado de generación en generación.',
  image: '/api/placeholder/800/600',
  prepTime: '30 min',
  cookTime: '45 min',
  totalTime: '75 min',
  servings: 6,
  difficulty: 'Intermedio',
  rating: 4.8,
  reviewCount: 127,
  category: 'Almuerzos',
  chef: {
    name: 'María González',
    avatar: '/api/placeholder/100/100',
    bio: 'Chef especializada en cocina mediterránea con 15 años de experiencia.'
  },
  ingredients: [
    { name: 'Arroz bomba', amount: '400g', essential: true },
    { name: 'Pollo troceado', amount: '500g', essential: true },
    { name: 'Conejo troceado', amount: '400g', essential: false },
    { name: 'Judías verdes', amount: '200g', essential: true },
    { name: 'Garrofón', amount: '100g', essential: false },
    { name: 'Tomate rallado', amount: '2 unidades', essential: true },
    { name: 'Pimiento rojo', amount: '1 unidad', essential: true },
    { name: 'Azafrán', amount: '1 pizca', essential: true },
    { name: 'Aceite de oliva', amount: '100ml', essential: true },
    { name: 'Caldo de pollo', amount: '1 litro', essential: true },
    { name: 'Ajo', amount: '3 dientes', essential: true },
    { name: 'Sal y pimienta', amount: 'Al gusto', essential: true }
  ],
  instructions: [
    {
      step: 1,
      title: 'Preparar la paellera',
      description: 'Calentar el aceite de oliva en la paellera a fuego medio-alto. Sazonar el pollo y el conejo con sal y pimienta.',
      time: '5 min'
    },
    {
      step: 2,
      title: 'Dorar las carnes',
      description: 'Dorar el pollo y el conejo por todos los lados hasta que estén bien sellados. Retirar y reservar.',
      time: '10 min'
    },
    {
      step: 3,
      title: 'Preparar el sofrito',
      description: 'En el mismo aceite, sofreír el ajo picado, el tomate rallado y el pimiento rojo cortado en tiras.',
      time: '5 min'
    },
    {
      step: 4,
      title: 'Añadir las verduras',
      description: 'Incorporar las judías verdes y el garrofón. Cocinar durante 3-4 minutos removiendo ocasionalmente.',
      time: '4 min'
    },
    {
      step: 5,
      title: 'Agregar el arroz',
      description: 'Añadir el arroz y remover bien para que se impregne de todos los sabores. Tostar ligeramente.',
      time: '3 min'
    },
    {
      step: 6,
      title: 'Incorporar el caldo',
      description: 'Verter el caldo caliente y añadir el azafrán. Devolver las carnes a la paellera. No remover más.',
      time: '2 min'
    },
    {
      step: 7,
      title: 'Cocinar la paella',
      description: 'Cocinar a fuego medio durante 20 minutos. Los últimos 5 minutos a fuego alto para crear el socarrat.',
      time: '25 min'
    },
    {
      step: 8,
      title: 'Reposar y servir',
      description: 'Retirar del fuego y cubrir con un paño limpio. Dejar reposar 5 minutos antes de servir.',
      time: '5 min'
    }
  ],
  tips: [
    'El arroz bomba es esencial para una buena paella, absorbe más líquido sin romperse.',
    'No remuevas el arroz una vez añadido el caldo, esto es clave para la textura.',
    'El socarrat (la capa dorada del fondo) es la parte más valorada de la paella.',
    'Usa azafrán real, no colorante. La diferencia de sabor es notable.'
  ],
  nutrition: {
    calories: 420,
    protein: 28,
    carbs: 45,
    fat: 12,
    fiber: 3
  }
}

interface RecipePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([])

  const toggleIngredient = (index: number) => {
    setCheckedIngredients(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
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

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 lg:h-[500px] overflow-hidden">
        <Image
          src={mockRecipe.image}
          alt={mockRecipe.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white max-w-4xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-orange-500 rounded-full text-sm font-medium">
                  {mockRecipe.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(mockRecipe.difficulty)}`}>
                  {mockRecipe.difficulty}
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                {mockRecipe.title}
              </h1>
              
              <p className="text-xl text-white/90 mb-6 max-w-2xl">
                {mockRecipe.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{mockRecipe.totalTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{mockRecipe.servings} personas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span>{mockRecipe.rating} ({mockRecipe.reviewCount} reseñas)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-6 right-6 p-3 bg-white/90 rounded-full hover:bg-white transition-colors"
        >
          <Heart 
            className={`w-6 h-6 ${
              isFavorite 
                ? 'text-red-500 fill-current' 
                : 'text-gray-600'
            }`} 
          />
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Ingredients & Chef */}
          <div className="lg:col-span-1 space-y-8">
            {/* Ingredients */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Utensils className="w-6 h-6 text-orange-500" />
                Ingredientes
              </h2>
              
              <div className="space-y-3">
                {mockRecipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                      checkedIngredients.includes(index)
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={checkedIngredients.includes(index)}
                        onChange={() => toggleIngredient(index)}
                        className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                      />
                      <span className={`${
                        checkedIngredients.includes(index) 
                          ? 'line-through text-gray-500' 
                          : 'text-gray-900'
                      }`}>
                        {ingredient.name}
                      </span>
                      {ingredient.essential && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                          Esencial
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {ingredient.amount}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Chef Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-orange-500" />
                Chef
              </h3>
              
              <div className="flex items-center gap-4">
                <Image
                  src={mockRecipe.chef.avatar}
                  alt={mockRecipe.chef.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{mockRecipe.chef.name}</h4>
                  <p className="text-sm text-gray-600">{mockRecipe.chef.bio}</p>
                </div>
              </div>
            </motion.div>

            {/* Nutrition Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Información Nutricional
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-500">{mockRecipe.nutrition.calories}</div>
                  <div className="text-sm text-gray-600">Calorías</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-500">{mockRecipe.nutrition.protein}g</div>
                  <div className="text-sm text-gray-600">Proteína</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-500">{mockRecipe.nutrition.carbs}g</div>
                  <div className="text-sm text-gray-600">Carbohidratos</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-500">{mockRecipe.nutrition.fat}g</div>
                  <div className="text-sm text-gray-600">Grasas</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Instructions */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <Timer className="w-7 h-7 text-orange-500" />
                Instrucciones
              </h2>

              <div className="space-y-6">
                {mockRecipe.instructions.map((instruction, index) => (
                  <div
                    key={index}
                    className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer ${
                      activeStep === index
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        activeStep === index
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {instruction.step}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {instruction.title}
                          </h3>
                          <span className="text-sm text-gray-500 font-medium">
                            {instruction.time}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {instruction.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tips Section */}
              <div className="mt-12 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  💡 Consejos del Chef
                </h3>
                <ul className="space-y-2">
                  {mockRecipe.tips.map((tip, index) => (
                    <li key={index} className="text-gray-700 flex items-start gap-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
