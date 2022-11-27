import React from "react"
export const MainWrapper = ({ children }: { children: React.ReactNode }) => (
  <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c]">
    <div className="container flex flex-col items-center justify-start gap-12 px-4 py-16 ">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        <span className="text-[hsl(280,100%,70%)]">SW</span> API
      </h1>

      {children}
    </div>
  </main>
)
