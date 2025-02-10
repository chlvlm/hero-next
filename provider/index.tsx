import { getSession } from '@/auth'
import { ReactNode } from 'react'
import NextAuthProvider from './auth-provider'
import HeroUIProviderClient from './hero-ui'

export default async function Provider({ children }: { children: ReactNode }) {
  const session = await getSession()
  return (
    <HeroUIProviderClient>
      <NextAuthProvider session={session}>{children}</NextAuthProvider>
    </HeroUIProviderClient>
  )
}
