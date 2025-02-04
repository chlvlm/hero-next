export const metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js',
    description: 'The React Framework for the Web',
    siteId: '1467726470533754880',
    creator: '@nextjs',
    creatorId: '1467726470533754880',
    images: [
      'https://hero-next-opal.vercel.app/api/share/BTC-AZT-true-17.46-loss-5.89-marmot88-101333.8503-104425.6167.png',
    ], // Must be an absolute URL
  },
}
export default function TwitterLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>{children}</div>
}
