import { Metadata } from 'next'

type Props = {
  params: { fileName: string }
}
export function generateMetadata({ params }: Props): Metadata {
  const domain = 'https://hero-next-red.vercel.app'
  const imageUrl = `${domain}/api/share/${params.fileName}`
  const title = 'Share a Position on Twitter'
  const description =
    'Share your position picture and referral link on Twitter.'
  return {
    description,
    openGraph: {
      images: [imageUrl],
    },
    twitter: {
      card: 'summary_large_image', // 重要，告诉 Twitter 这是一个包含大图的卡片
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
