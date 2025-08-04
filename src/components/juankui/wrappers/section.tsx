import { ReactNode } from "react";
import { ParticlesFull } from "../hero/particles";
import { isParticles } from "@/config/options";
import { AsideList } from "../aside-items/aside-list";

interface SectionProps {
  children: ReactNode,
  title?: string,
  description?: string,
  gradientBackground?: 'bg-gradient-middle' | 'bg-gradient-top' | 'bg-gradient-bottom' | ''
  className?: string
}

export function Section({ children, className }: SectionProps) {
  function ChildrenDiv() {
    return (
      <div className='flex w-full flex-col lg:flex-[0.7]'>
        {children}
      </div>
    )
  }
  return (
    <section className={`${className} relative flex w-full items-center justify-center`}>
      {isParticles && <ParticlesFull />}

      <article className="gap-15 flex flex-col w-[90vw] items-stretch justify-center rounded-lg lg:w-[70vw] lg:flex-row">
        <ChildrenDiv />
        <div className="hidden h-auto w-px self-stretch bg-[var(--color-secondary)] lg:block" />
        <AsideList />
      </article>
    </section>
  )
}