import { AuthOptions, getServerSession } from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'

const authOptions: AuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_ID!,
      clientSecret: process.env.TWITTER_SECRET!,
      version: '2.0',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth-login',
    error: '/auth-login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
        }
      }
      console.log('token :>> ', token)
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.username = token.username as string
      session.user.accessToken = token.accessToken as string
      console.log('session :>> ', session)
      return session
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  theme: {
    colorScheme: 'auto',
    brandColor: '#00acee',
    logo: '/twitter.svg',
  },
  cookies: {
    sessionToken: {
      name: `${
        process.env.NODE_ENV === 'production' ? '__Secure-' : ''
      }next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
}

const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }
