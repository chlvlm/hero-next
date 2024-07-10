import Image from 'next/image'
import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
interface CarouselProps {
  images: string[]
}
export default function Carousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1)
    setIsTransitioning(true)
  }
  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1)
    setIsTransitioning(true)
  }
  // 监听过渡结束事件
  const handleTransitionEnd = () => {
    setIsTransitioning(false)
    if (currentIndex === images.length) {
      setCurrentIndex(0)
    } else if (currentIndex === -1) {
      setCurrentIndex(images.length - 1)
    }
  }
  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  })
  const transitionStyle = isTransitioning
    ? 'transition-transform ease-out duration-500'
    : ''
  return (
    <div className="sm:hidden w-full">
      <div
        {...handlers}
        className="w-full h-full overflow-hidden aspect-w-16 aspect-h-9"
      >
        <div
          className={`flex ${transitionStyle}`}
          style={{
            transform: `translateX(-${(currentIndex + 1) * 100}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          <div className="w-full flex-shrink-0 relative aspect-w-16 aspect-h-9">
            <Image
              src={images[images.length - 1]}
              alt={`Slide ${images.length - 1}`}
              width={375}
              height={210}
              className="pointer-events-none w-full h-full"
            />
          </div>
          {images.map((src, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 relative aspect-w-16 aspect-h-9"
            >
              <Image
                src={src}
                alt={`Slide ${index}`}
                width={375}
                height={210}
                className="pointer-events-none w-full h-full"
              />
            </div>
          ))}
          <div className="w-full flex-shrink-0 relative aspect-w-16 aspect-h-9">
            <Image
              src={images[0]}
              alt={`Slide 0`}
              width={375}
              height={210}
              className="pointer-events-none w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="flex space-x-2 mt-4 items-center justify-center">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-[6px] h-[6px] rounded-full ${
              index === currentIndex % images.length
                ? 'bg-[#4289C9]'
                : 'bg-[#B2B2B2]'
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}
