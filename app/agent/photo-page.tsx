export default function PhotoPage({ src }: { src?: string }) {
  return (
    <img
      src={src ?? ''}
      alt="photo"
      className="h-[350px] w-[350px] mx-auto object-cover rounded-lg"
    />
  )
}
