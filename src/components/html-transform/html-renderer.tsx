import parse from 'html-react-parser'
import { options } from './transformer-map'
import DynamicStyle from '../juankui/css-content'
import { debug, debugLog } from '@/config/debug-log'

export default function HtmlRenderer({ html, cssContent }: { html: string, cssContent: string | null }) {
  debugLog(debug.cssContent, 'Rendering HTML content with CSS:', cssContent)
  return (
    <>
      {parse(html, options)}
      <DynamicStyle cssContent={cssContent} />
    </>
  )
}
