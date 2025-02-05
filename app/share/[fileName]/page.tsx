'use client'
import { useRouter } from 'next/navigation'

type Props = {
  params: { fileName: string }
}
const domain = 'https://hero-next-opal.vercel.app'

export default function SharePage({ params }: Props) {
  const imageUrl = `${domain}/api/share/${params.fileName}`
  const router = useRouter()
  router.push(imageUrl)
  return (
    <div className="flex justify-center items-center h-screen">
      <img src={imageUrl} alt="" className="h-full max-w-full" />
    </div>
  )
}
