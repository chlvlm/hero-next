import { Metadata } from 'next'

type Props = {
  params: { fileName: string }
}
const domain = 'https://hero-next-opal.vercel.app'
export function generateMetadata({ params }: Props): Metadata {
  const imageUrl = `${domain}/api/share/${params.fileName}`
  const title = 'Share a Position on Twitter'
  const description =
    'Share your position picture and referral link on Twitter.'
  return {
    title,
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

export default function SharePage({ params }: Props) {
  const imageUrl = `${domain}/api/share/${params.fileName}`
  return (
    <div className="flex justify-center items-center h-screen">
      <img
        src={imageUrl}
        alt="Share a Position on Twitter"
        className="h-auto max-w-full"
      />
    </div>
  )
}
