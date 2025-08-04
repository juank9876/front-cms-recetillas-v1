import { MainWrapper } from '@/components/juankui/wrappers/main-wrapper'
import { ReactNode } from 'react'
import { HeroCategory } from '../hero/hero-category'
import { Section } from '../wrappers/section'
//import { capitalize } from '@/utils/capitalize'
import { Category } from '@/types/types'
import { cn } from '@/lib/utils'
import { ParticlesFull } from '../hero/particles'
import { isParticles } from '@/config/options'

export function PreCategory({ children, category, className }: { children: ReactNode, className?: string, category: Category }) {
  return (
    <MainWrapper>
      {isParticles && <ParticlesFull />}
      <HeroCategory {...category} />
      <Section>
        <div className={cn('flex flex-wrap', className)}>
          {children}
        </div>
      </Section>
    </MainWrapper>
  )
}