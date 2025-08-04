// components/HtmlTransform/transformers.ts
import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import { Button } from '../ui/button'
import Image from 'next/image'
import { CardShine } from '../juankui/legacy/card-shine'
import {
  //ArrowRight, Star, Sparkles, Flame, Bolt, 
  Circle
} from 'lucide-react'
import BrandlistyWidget from '../juankui/brandlisty/brandlisty-widget'
import { fixAttribs } from '@/lib/utils'

export function transformBrandlisty(el: Element) {
  const { apikey, listid, boton, limit, id } = el.attribs

  return (
    <div className={`flex h-full ${el.attribs.class || ''}`}>
      <BrandlistyWidget
        key={id}
        apiKey={apikey || el.attribs['data-apikey']}
        listId={listid || el.attribs['data-listid']}
        boton={boton || el.attribs['data-boton']}
        limit={limit || el.attribs['data-limit']}
      />
    </div>
  )
}

//Version upgraded chatgp
export function transformRow(el: Element, options: HTMLReactParserOptions) {
  const validChildren = el.children.filter(
    (child) => child.type === 'tag'
  ) as Element[]

  return (

    <div className="flex w-full flex-col lg:flex-row lg:flex-wrap">
      {domToReact(validChildren as DOMNode[], options)}
    </div>

  )
}

export function transformCol(el: Element, options: HTMLReactParserOptions) {
  const classStr = el.attribs?.class || ''

  const getTailwindWidth = (classStr: string): string | number => {
    const match = classStr.match(/col-(?:xs|sm|md|lg|xl)-(\d+)/)
    if (!match) return 'w-full'

    const value = parseInt(match[1])
    const fraction = value / 12

    if (fraction === 1) return 'w-full'
    if (fraction === 0.5) return 'w-1/2'
    if (fraction === 1 / 3) return 'w-1/3'
    if (fraction === 2 / 3) return 'w-2/3'
    if (fraction === 0.25) return 'w-1/4'
    if (fraction === 0.75) return 'w-3/4'

    const percent = +(fraction * 100).toFixed(0) // Redondeado a 2 decimales
    //return `w-[${percent}%]`
    return percent

  }

  const widthClass = getTailwindWidth(classStr)

  return (
    <>
      <div
        style={{ width: `${widthClass}%` }}
        className={`${widthClass} max-${widthClass} lg:flex lg:flex-col justify-center items-center h-full hidden`}
      >
        {domToReact(el.children as DOMNode[], options)}
      </div>

      <div
        className={`h-full w-full items-center justify-center lg:hidden`}
      >
        {domToReact(el.children as DOMNode[], options)}
      </div>
    </>
  )
}

//Version Bootstrap
export function transformCard(el: Element, options: HTMLReactParserOptions) {
  return (
    <CardShine className={`relative mx-auto my-5 flex w-full max-w-[350px] overflow-hidden transition duration-500 hover:scale-105 ${el.attribs.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </CardShine>
  )
}

export function transformCardBody(el: Element, options: HTMLReactParserOptions) {
  return (
    <div className={`flex flex-col space-y-3 ${el.attribs.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </div>
  )
}

export function transformTextElement(el: Element, options: HTMLReactParserOptions) {
  return (
    <div className={`text-element py-3 ${el.attribs.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </div>
  )
}

export function transformContainer(el: Element, options: HTMLReactParserOptions) {
  return (
    <div className={`border-primary container rounded-lg ${el.attribs.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </div>
  )
}


export function transformButton(el: Element, options: HTMLReactParserOptions) {
  return (
    <Button variant={'accent'} asChild>
      <a
        href={el.attribs.href || '#'}
        className={`${el.attribs.class || ''}`}
      >
        {domToReact(el.children as DOMNode[], options)}
      </a>
    </Button>
  )
}

export function transformImg(el: Element) {
  return (
    <div className='relative h-[200px] w-full'>
      <Image
        alt={el.attribs.alt || 'sample image'}
        //src={'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTKbWAJHSZvmB6idZtJ6VtB1O6pvq2K7UVgIzsSxcpyxmu2GOqZwBlgV-NJm1kSNLJl7fnqNRG4ep75DRePRSgWM_v99GQISy6BUURYHYHnOg'}
        src={el.attribs.src || 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTKbWAJHSZvmB6idZtJ6VtB1O6pvq2K7UVgIzsSxcpyxmu2GOqZwBlgV-NJm1kSNLJl7fnqNRG4ep75DRePRSgWM_v99GQISy6BUURYHYHnOg'}
        fill
        className="rounded-lg object-contain"
      />

    </div>
  )
}

export function transformH2(el: Element, options: HTMLReactParserOptions) {
  return (
    <div className='flex flex-col space-y-5 pb-3 pt-10'>
      <h2 className={`pt-10 pb-3 ${el.attribs.class || ''}`}>
        {domToReact(el.children as DOMNode[], options)}
      </h2>
    </div>
  )
}

export function transformH3(el: Element, options: HTMLReactParserOptions) {
  //const icons = [ArrowRight, Star, Sparkles, Flame, Bolt]
  //const RandomIcon = icons[Math.floor(Math.random() * icons.length)]

  return (
    <div className=' flex flex-row items-center justify-start'>
      <h3 className={`pt-10 pb-3 ${el.attribs.class || ''}`}>
        {domToReact(el.children as DOMNode[], options)}
      </h3>
    </div>
  )
}

export function transformLi(el: Element, options: HTMLReactParserOptions) {
  return (
    <li className="relative mt-1 flex flex-row items-center justify-start space-x-2 pl-5 leading-relaxed">
      <span className="relative">
        <Circle className="size-3" />
      </span>

      <div className={`prose max-w-none [&>*]:inline [&>code]:inline [&>strong]:inline [&>strong]:font-bold ${el.attribs.class || ''}`}>
        {domToReact(el.children as DOMNode[], options)}
      </div>
    </li>
  )
}

export function transformP(el: Element, options: HTMLReactParserOptions) {
  //console.log(el.attribs)
  return (
    <p className={`[&>*]:inline [&>code]:inline [&>strong]:inline [&>strong]:font-bold ${el.attribs.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </p>
  )
}

export function transformPre(el: Element, options: HTMLReactParserOptions) {

  return (
    <pre className={`overflow-x-auto rounded-md bg-zinc-900 p-4 text-white ${el.attribs.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </pre>
  );
}

export function transformForm(el: Element, options: HTMLReactParserOptions) {
  return (
    <form className={`flex flex-col border border-gray-700 rounded-lg p-5 gap-y-3 justify-between ${el.attribs.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </form>
  )
}

export function transformInput(el: Element, options: HTMLReactParserOptions) {
  const attribs = fixAttribs(el.attribs);
  return (
    <input
      type={attribs.type || 'text'}
      placeholder={attribs.placeholder || ' '}
      {...attribs}
      className={`w-full p-2 border border-gray-300 ${attribs.className || ''}`}
    />
  )
}
export function transformTextarea(el: Element, options: HTMLReactParserOptions) {
  const attribs = fixAttribs(el.attribs);

  return (
    <textarea
      {...attribs}
      className={`w-full p-2 border border-gray-300 ${attribs.className || ''}`}
    />
  )
}
export function transformCode(el: Element) {

  const getText = (nodes: DOMNode[]): string =>
    nodes
      .map((node) => {
        if ('data' in node && node.data) {
          // Reemplaza \u003C por < y \u003E por > y \r\n por salto de línea
          let text = node.data;
          text = text.replace(/\\u003C/g, '<');
          text = text.replace(/\\u003E/g, '>');
          text = text.replace(/\\r\\n/g, '\n');  // o solo \r\n según cómo venga
          return text;
        }
        if ('children' in node) return getText(node.children as DOMNode[]);
        return '';
      })
      .join('');

  const codeContent = getText(el.children as DOMNode[]).trim();

  if (!codeContent) return null; // ⛔ No renderizar si está vacío

  return (
    <code className={`mx-0.5 block items-end justify-start whitespace-pre ${el.attribs.class || ''}`}>
      {getText(el.children as DOMNode[])}
    </code>
  );
}

export function transformStrong(el: Element, options: HTMLReactParserOptions) {
  return (
    <strong className={`flex font-bold ${el.attribs.class || ''}`}>
      {domToReact(el.children as DOMNode[], options)}
    </strong>
  )
}
