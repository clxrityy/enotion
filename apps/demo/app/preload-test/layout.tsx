import { ContextProvider } from "@/components/ContextProvider"

export default function PreloadLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ContextProvider>
      {children}
    </ContextProvider>
  )
}
