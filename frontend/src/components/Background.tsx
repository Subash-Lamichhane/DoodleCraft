export default function Background({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-purple-500 to-pink-500 opacity-20 rounded-full blur-3xl"></div>
                <div className="absolute right-0 bottom-0 w-[800px] h-[800px] bg-gradient-to-t from-blue-500 to-purple-500 opacity-20 rounded-full blur-3xl"></div>
            </div>
            {children}
        </div>
    )
}

