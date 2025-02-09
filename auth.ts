import { AuthOptions, getServerSession } from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'

const authOptions: AuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_ID!,
      clientSecret: process.env.TWITTER_SECRET!,
      version: '2.0',
      profile(profile) {
        return {
          id: profile.data.id,
          name: profile.data.name,
          screen_name: profile.data.username,
          image: profile.data.profile_image_url,
        }
      },
      authorization: {
        params: {
          scope: 'tweet.read users.read follows.read offline.access', // 访问权限
        },
      },
      client: {
        httpOptions: {
          timeout: 20000, // 若终端里有超时报错，则延长超时时间
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth',
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
      name: `next-auth.session-token`,
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
