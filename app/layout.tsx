import { headers } from 'next/headers'
import './globals.scss'
import ContextProvider from '@/context'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookies = headers().get('cookie')
  return (
    <html lang="en">
      <head>
        {/* Twitter Card metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Join the @azex_io testnet! 🚀" />
        <meta
          name="twitter:description"
          content="This might be the FIRST batch of #DeFi projects on #Berachain to publicly offer rewards and #BugBounty on its testnet!"
        />
        <meta
          property="og:domain"
          content="https://hero-next-opal.vercel.app"
        />
        <meta
          name="twitter:url"
          content={
            'https://hero-next-opal.vercel.app/api/share/BTC-AZT-true-17.46-loss-5.89-marmot88-101333.8503-104425.6167.png'
          }
        />
        <meta
          name="twitter:image"
          content={
            'https://hero-next-opal.vercel.app/api/share/BTC-AZT-true-17.46-loss-5.89-marmot88-101333.8503-104425.6167.png'
          }
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </head>
      <body>
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  )
}
