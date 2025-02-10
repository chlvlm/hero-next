import { HeroUIProvider } from '@heroui/react'

export default function HeroUIProviderClient({
  children,
}: {
  children: React.ReactNode
}) {
  return <HeroUIProvider>{children}</HeroUIProvider>
}
