import { type AuthOptions, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import TwitterProvider from 'next-auth/providers/twitter'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

async function verifyUser(
  email: string,
  password: string,
  type: string,
  email_verify_code?: string
) {
  // const url = `${BASE_URL}/${type === 'login' ? 'login' : 'signup'}`
  // const basePrams = { email, password }
  // const params =
  //   type === 'login'
  //     ? basePrams
  //     : {
  //         ...basePrams,
  //         email_verify_code,
  //       }
  // try {
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     body: JSON.stringify(params),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   console.log('response :>> ', response)
  //   if (!response.ok) {
  //     return null
  //   }
  //   const data = await response.json()
  //   console.log('data :>> ', data)
  //   return data
  // } catch (error) {
  //   console.error('error :>> ', error)
  //   return null
  // }
  // 示例：根据 email 和 password 检查用户是否存在（实际实现需自行编写）
  if (type === 'login') {
    const user = { id: '1', name: '张三(login)', email } // 假设查询到该用户
    if (email === 'test@example.com' && password === '123456') {
      return user
    }
  } else {
    const user = { id: '1', name: '张三(signup)', email } // 假设查询到该用户
    if (
      email === 'test@example.com' &&
      password === '123456' &&
      email_verify_code === '1234'
    ) {
      return user
    }
  }
  return null
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email_Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        type: { label: 'Type', type: 'text' },
        email_verify_code: { label: 'Email Verify Code', type: 'text' },
      },
      async authorize(credentials, req) {
        console.log({
          credentials,
          req,
          BASE_URL,
        })

        // 检查用户凭据
        if (!credentials?.email || !credentials.password) {
          return null
        }
        const user = await verifyUser(
          credentials.email,
          credentials.password,
          credentials.type,
          credentials.email_verify_code
        )
        if (user) {
          // 返回 user 对象后，NextAuth 会把其信息存入 JWT 中
          return user
        }
        return null
      },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID!,
      clientSecret: process.env.TWITTER_SECRET!,
      version: '2.0',
      profile(profile, tokens) {
        return {
          id: profile.data.id,
          name: profile.data.name,
          screen_name: profile.data.username,
          image: profile.data.profile_image_url,
          ...tokens,
        }
      },
      client: {
        httpOptions: {
          timeout: 20000, // If there is an error in the terminal, the timeout time will be extended.
        },
      },
      authorization: {
        params: {
          scope:
            'tweet.read tweet.write users.read follows.read offline.access', // Access permissions
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('user :>> ', user)
      console.log('token :>> ', token)
      console.log('account :>> ', account)
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
        }
      }
      return token
    },
    async session({ session, token }) {
      console.log('session :>> ', session)
      console.log('token :>> ', token)
      session.user.username = token.username as string
      session.user.accessToken = token.accessToken as string
      return session
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
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
  debug: true, // process.env.NODE_ENV !== 'production'
}

const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }
