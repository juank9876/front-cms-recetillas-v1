import { Dot } from "lucide-react"

export function BreakingNews() {
    return (
        <div className="bg-[var(--color-secondary)] flex flex-row justify-center items-center gap-10 text-white py-2 px-4 overflow-hidden">

            <div className="flex items-center">
                <span className="inline-flex items-center justify-center bg-white text-[var(--color-secondary)] pr-2 text-xs font-bold rounded mr-3">
                    <Dot className="w-6 h-6 text-red-600" /><p className="text-sm text-red-600">DIRECTO</p>
                </span>
                <div className="flex-1 overflow-hidden">
                    <div className="animate-marquee whitespace-nowrap">
                        <span className="text-sm text-white">
                            <strong className="text-white">Tercera Guerra Mundial: Rusia y EE.UU. se enfrentan en el mar</strong>
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center">
                <span className="inline-flex items-center justify-center bg-white text-[var(--color-secondary)] pr-2 text-xs font-bold rounded mr-3">
                    <Dot className="w-6 h-6 text-blue-600" /><p className="text-sm text-blue-600">ÚLTIMA HORA</p>
                </span>
                <div className="flex-1 overflow-hidden">
                    <div className="animate-marquee whitespace-nowrap">
                        <span className="text-sm text-white">
                            <strong className="text-white">ChatGPT se rebela contra su creador</strong>
                        </span>
                    </div>
                </div>
            </div>


        </div>
    )
}