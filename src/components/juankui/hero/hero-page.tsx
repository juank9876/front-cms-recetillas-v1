import { Page } from "@/types/types"
import { Breadcrumbs } from "./breadcrumbs"

export function HeroPage({ title, meta_description, breadcrumbs }: Page) {
    return (
        <section className="itju-center mb-20 mt-5 flex w-full overflow-hidden bg-transparent">
            <div className="w-custom flex w-full items-start justify-start">
                <Breadcrumbs className="flex" breadcrumbs={breadcrumbs} />
            </div>
        </section>
    )
}