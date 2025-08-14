'use client'

import { capitalize } from '@/utils/capitalize'
import { useState } from 'react';
import { Category, NavItemType } from '@/types/types';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Link } from '@/components/juankui/optionals/link';
import { NavLink } from './nav-link';
import { Slug } from '@/api-fetcher/fetcher';


type ListItemProps = {
  title: string;
  href: string;
  children?: React.ReactNode;
  className?: string
  isChild?: boolean
  childCategories?: NavItemType[]
  parentSlug?: string
}

function ListItem({ title, href, className, isChild = false, childCategories, parentSlug }: ListItemProps) {
  const hasSubcategories = childCategories && childCategories.length > 0;
  const [open, setOpen] = useState(false);
  const parentSlugFull = parentSlug + href;

  return (
    <li
      className={hasSubcategories ? 'relative' : ''}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink
        href={parentSlug ? `${parentSlug}${href}` : href}
        className={`flex items-center px-4 py-2 text-base font-normal uppercase tracking-wide text-slate-900 hover:underline hover:underline-offset-8 transition-colors duration-150 ${isChild ? 'pl-8 text-sm' : ''}`}
      >
        {title}
        {hasSubcategories && (
          <ChevronRight className="text-black ml-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
        )}
      </NavLink>
      {/* Renderizar subcategorías si existen */}
      {hasSubcategories && (
        <ul className={`absolute right-full top-0 mt-0 ml-0 w-[220px] bg-white rounded-lg shadow-lg z-30 ${open ? 'block' : 'hidden'}`}>
          {childCategories!.map((subcat) => (
            <ListItem
              key={subcat.id}
              title={capitalize(subcat.title)}
              href={subcat.url}
              childCategories={subcat.children}
              parentSlug={parentSlugFull || undefined}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

// ... existing code ...
export function RenderMenu({ normalizedItems, allSlugs }: { normalizedItems: NavItemType[], categoriesItems: Category[], allSlugs: Slug[] }) {
  // Return null if no items to render
  if (!normalizedItems || normalizedItems.length === 0) {
    return null;
  }

  return (
    <nav>
      <ul className="flex flex-row gap-2 items-center justify-center w-full bg-white border-0 shadow-none py-0 mx-auto">
        {normalizedItems.map((item) => (
          <li key={item.id} className="relative group/menu">
            {item.children && item.children.length > 0 ? (
              <>
                <span className="flex items-center gap-1 px-4 py-2 text-base font-normal uppercase tracking-wide text-slate-900  hover:underline hover:underline-offset-8 cursor-pointer">
                  {capitalize(item.title)}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </span>
                <div className="absolute left-0 top-full min-w-[180px] bg-white border border-slate-200 z-20 hidden group-hover/menu:block py-5">
                  <ul className="py-0">
                    {item.children.map((category) => {

                      const foundCategory = Object.entries(allSlugs).find(([slug, data]) => {
                        return '/' + slug === category.url;
                      });
                      // Construir href
                      const isCategory = foundCategory ? `/categories` : "";

                      return (
                        <ListItem
                          key={category.id}
                          title={capitalize(category.title)}
                          href={category.url}
                          childCategories={category.children}
                          parentSlug={isCategory} />
                      )
                    })}
                  </ul>
                </div>
              </>
            ) : (
              <NavLink
                href={item.url}
                className="px-4 py-2 text-base font-normal uppercase tracking-wide text-slate-900  hover:underline hover:underline-offset-8 transition-colors duration-150"
              >
                {item.title}
              </NavLink>
            )}
          </li>
        ))}

      </ul>
    </nav>
  )
}
// ... existing code ...