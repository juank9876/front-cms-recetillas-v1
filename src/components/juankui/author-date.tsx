import { capitalize } from "@/utils/capitalize";

export function AuthorDate({ isTextCenter = false, author, date }: { isTextCenter?: boolean, author: string, date: string }) {
    return (
        <div className={`flex items-center gap-2 text-gray-500 text-sm ${isTextCenter ? "justify-center" : "justify-start items-start"}`}>
            <span className="text-gray-500 text-sm">{author.toUpperCase()}</span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-500 text-sm">{date}</span>
        </div>
    )
}