import { Metadata } from 'next'

type Props = {
  params: { fileName: string }
}

export function generateMetadata({ params }: Props): Metadata {
  const imageUrl = `https://hero-next-opal.vercel.app/api/share/${params.fileName}`
  return {
    title: 'Trade Share',
    description: 'Check out this trading insight',
    openGraph: {
      images: [imageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Trade Share',
      description: 'Check out this trading insight',
      images: [imageUrl],
    },
  }
}

export default function SharePage({ params }: Props) {
  const imageUrl = `https://hero-next-opal.vercel.app/api/share/${params.fileName}`
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <img
        src={imageUrl}
        alt="Trade Share Image"
        className="max-w-full h-auto"
      />
    </div>
  )
}
