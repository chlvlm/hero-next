'use client'
import { photos } from '@/app/agent/_data'
import PhotoPage from '@/app/agent/photo-page'
import { Modal, ModalContent } from '@heroui/react'
import { useRouter } from 'next/navigation'

export default function PhotoModal({ params }: { params: { id: string } }) {
  const router = useRouter()
  const photo = photos.find((p) => p.id === params.id)

  console.log('Intercepted Route Params:', params)
  console.log('Found Photo:', photo)
  console.log('Current Path:', window.location.pathname)

  const onClose = () => {
    router.back()
  }

  return (
    <Modal isOpen={true} onClose={onClose} className="p-4" hideCloseButton>
      <ModalContent>
        <PhotoPage src={photo?.src} />
      </ModalContent>
    </Modal>
  )
}
