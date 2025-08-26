import { fetchHomePage, fetchSiteSettings } from '@/api-fetcher/fetcher'
import { createMetadata } from '@/app/seo/createMetadata'
import HtmlRenderer from '@/components/html-transform/html-renderer'
import { PreHomePage } from '@/components/juankui/pre-rendered/pre-home'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await fetchHomePage()
  return await createMetadata(homePage);
}



export default async function Home() {
  const homePage = await fetchHomePage()
  const settings = await fetchSiteSettings()
  console.log("homePage", homePage)



  if (homePage) return (
    <PreHomePage
      settings={settings}
    >
      <HtmlRenderer cssContent={homePage.css_content} html={homePage.html_content} />
    </PreHomePage>

  )
  return (
    <PreHomePage
      settings={settings}
    >
      <div className="text-2xl font-bold">No home page found</div>
    </PreHomePage>
  )
}
