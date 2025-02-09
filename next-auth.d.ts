import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      username?: string
      accessToken?: string
      email?: string
      image?: string
      name?: string
    }
  }

  interface JWT {
    username?: string
    accessToken?: string
    refreshToken?: string
  }
}
