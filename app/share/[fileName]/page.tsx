type Props = {
  params: { fileName: string }
}
const domain = 'https://hero-next-opal.vercel.app'

export default function SharePage({ params }: Props) {
  const imageUrl = `${domain}/api/share/${params.fileName}`
  return (
    <div className="w-full h-full bg-black">
      <img src={imageUrl} alt="" className="h-full w-full object-contain" />
    </div>
  )
}
