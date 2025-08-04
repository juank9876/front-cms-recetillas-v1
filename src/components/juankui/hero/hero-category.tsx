import { Category } from "@/types/types";
import { DivAccent } from "../aside-items/div-accent";
import { Breadcrumbs } from "./breadcrumbs";

export function HeroCategory({ name, description, breadcrumbs }: Category) {
    return (
        <section className="w-full bg-white pb-8 flex flex-col items-center justify-center">
            <div className=" mb-2 w-[70vw]">
                <Breadcrumbs className="text-xs text-slate-500" breadcrumbs={breadcrumbs} />
            </div>
            <div className="w-full max-w-3xl flex flex-col items-center justify-center pt-5">
                <div className="flex flex-col items-center justify-center w-full">
                    <h1 className="text-4xl md:text-5xl font-serif font-extrabold uppercase tracking-widest text-center mb-2">
                        {name}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-700 text-center max-w-2xl mb-2">
                        {description}
                    </p>
                </div>
            </div>
            <DivAccent />
        </section>
    )
}