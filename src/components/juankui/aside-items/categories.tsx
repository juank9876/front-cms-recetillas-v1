import { Category } from "@/types/types";
import { DivAccent } from "./div-accent";
import { Link } from "../optionals/link";

export function Categories({ categories, className }: { categories: Category[], className?: string }) {
  if (!categories || categories.length === 0) {
    return (
      <div className={`flex flex-col space-y-3 ${className}`}>
        <h2 className='text-2xl font-bold'>Categorias populares</h2>
        <p className='text-muted-foreground'>No hay categorias disponibles.</p>
      </div>
    );
  }

  const sortedCategories = categories.sort(
    (a, b) => Number(b.post_count ?? 0) - Number(a.post_count ?? 0)
  );

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      <h2 className='text-2xl font-bold'>Categorias populares</h2>
      <DivAccent />
      <ul className='flex flex-col '>
        {sortedCategories.map((category) => {
          const url = category.parent_slug ? category.parent_slug + '/' + category.slug : category.slug
          return (
            <li key={category.id}>
              <Link
                href={`/categories/${url}`}
                className="group relative flex w-full flex-col overflow-hidden  border-b-2 border-black"
              >
                {/* Contenido textual */}
                <div className="flex flex-col pl-1">
                  <h4 className="line-clamp-2 text-base font-semibold">{category.name}</h4>
                  <p className="text-muted-foreground mt-1 text-sm">{category.post_count} articulos</p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}