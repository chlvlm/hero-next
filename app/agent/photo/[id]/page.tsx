import { photos } from '../../_data'
import PhotoPage from '../../photo-page'

export default function Photo({ params: { id } }: { params: { id: string } }) {
  const photo = photos.find((p) => p.id === id)
  return <PhotoPage src={photo?.src} />
}
