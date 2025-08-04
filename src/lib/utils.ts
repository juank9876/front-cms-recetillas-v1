import { fetchArticles, fetchCategories, fetchPages, fetchPermalink } from "@/api-fetcher/fetcher"
import { contextSiteSettings } from "@/app/context/getSiteSettings"
import { capitalize } from "@/utils/capitalize"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeUrl(url: string): string {
  return '/' + url.replace(/^\/+/, '')
}

export function formatDate(
  dateInput: string | Date,
  options?: {
    includeTime?: boolean
    uppercase?: boolean
    shortMonth?: boolean
    withTimeZone?: boolean
  }
): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput

  const { includeTime = false, uppercase = false, shortMonth = true, withTimeZone = false } = options || {}

  const datePart = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: shortMonth ? "short" : "long",
    year: "numeric",
  }).format(date)

  let result = datePart

  if (includeTime) {
    const timePart = date
      .toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })

    result = `${datePart} - ${timePart}${withTimeZone ? " CEST" : ""}`
  }

  return uppercase ? result.toUpperCase() : result
}

type PageMeta = {
  id: string
  slug: string
  parent_id: string | null
  // puedes añadir más campos si los necesitas
}

type SlugToIdMap = Record<string, string>

export async function getPageSlugToIdMap(): Promise<SlugToIdMap> {
  const pages = await fetchPages()
  //console.log(pages)
  const slugIds: PageMeta[] = pages

  const map: SlugToIdMap = {}
  for (const slugId of slugIds) {
    map[slugId.slug] = slugId.id
  }

  return map
}

export async function getCategorySlugToIdMap(): Promise<SlugToIdMap> {
  const categories = await fetchCategories()
  const slugIds: PageMeta[] = categories

  const map: SlugToIdMap = {}
  for (const slugId of slugIds) {
    map[slugId.slug] = slugId.id

  }

  return map
}

export async function getPostSlugToIdMap(): Promise<SlugToIdMap> {
  const posts = await fetchArticles()
  const slugIds: PageMeta[] = posts

  const map: SlugToIdMap = {}
  for (const slugId of slugIds) {
    map[slugId.slug] = slugId.id
  }

  return map
}

export function cleanSlug(slug: string) {
  return slug.replace(/^\/+|\/+$/g, '')
}

export async function permalinkPost(id: string): Promise<string> {
  const link = await fetchPermalink(id, "post")
  const url = '/categories' + link.permalink

  return url
}

export async function permalinkCategory(id: string): Promise<string> {
  const link = await fetchPermalink(id, "category")
  const url = '/categories/' + link.permalink

  return url
}

export function isNewArticle(createdAt: string | Date): boolean {
  const fechaCreacion = new Date(createdAt);
  const ahora = new Date();
  const diferenciaMs = ahora.getTime() - fechaCreacion.getTime();
  const dias = diferenciaMs / (1000 * 60 * 60 * 24);
  return dias < 30;
}

export function isLiveArticle(createdAt: string | Date): boolean {
  const fechaCreacion = new Date(createdAt);
  const ahora = new Date();
  const diferenciaMs = ahora.getTime() - fechaCreacion.getTime();
  const dias = diferenciaMs / (1000 * 60 * 60 * 24);
  return dias < 7;
}

export function fixAttribs(attribs: Record<string, any>) {
  const newAttribs = { ...attribs };
  if (newAttribs.class) {
    newAttribs.className = newAttribs.class;
    delete newAttribs.class;
  }
  return newAttribs;
}

export async function createPageTitle(pageMetaTitle: string | undefined, pageTitle: string | undefined) {
  const settings = await contextSiteSettings()

  if (!pageMetaTitle && pageTitle) {
    return capitalize(settings.site_title) + " | " + capitalize(pageTitle);
  }

  else if (!pageMetaTitle && !pageTitle) {
    return capitalize(settings.site_title);
  }

  else if (pageMetaTitle) return capitalize(settings.site_title) + " | " + capitalize(pageMetaTitle)

}

export function decodeHtmlEntities(str: string) {
  if (!str) return '';
  return str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#039;/g, "'") // para casos como &#039;
    .replace(/\\\\'/g, "'") // para \\'
    .replace(/\\'/g, "'");  // para \'
}

export function limitCharacters(text: string, limit: number): string {
  if (!text) return '';
  if (text.length <= limit) return text;

  return text.slice(0, limit) + '...';
}