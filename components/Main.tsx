'use client'
import { scrollDistance } from '@/utils'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Carousel from './Carousel'

export default function Main() {
  const images = [
    '/images/p-1.png',
    '/images/p-2.png',
    '/images/p-3.png',
    '/images/p-4.png',
    '/images/p-5.png',
  ]

  const [photo, setPhoto] = useState(0)
  const imgRef = useRef<HTMLDivElement | null>(null)
  const liList = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (imgRef.current) {
      liList.current = Array.from(imgRef.current.children) as HTMLDivElement[]
    }
  }, [])

  return (
    <main className="max-w-[1216px] mx-auto sm:px-8 sm:pt-10 sm:pb-12 max-sm:pb-4 flex flex-col justify-center">
      <section className="w-full sm:py-10 flex max-sm:flex-col items-center my-0 mx-auto">
        {/* 轮播图 */}
        <Carousel images={images} />
        {/* 描述 */}
        <div className="flex-[3.2] pr-8 max-sm:px-5 max-sm:pt-4">
          <div className="flex items-center">
            <Image
              alt=""
              src="/images/picture.jpg"
              width={32}
              height={32}
              className="rounded-full mr-2"
            />
            <span className="hover:underline">divRIOTS</span>
          </div>
          <div className="text-2xl my-2 sm:ellipsis-3 max-sm:ellipsis-2 font-semibold">
            html.to.design — Import websites to Figma designs (web,html,css)
          </div>
          <div className="text-[13px] text-[#00000080] mb-4">
            Plugin • 15.2k • 1m users
          </div>
          <div className="sm:w-32 flex sm:flex-col justify-start">
            <div className="max-sm:w-56 text-[14px] h-10 rounded-md bg-[#0D99FF] flex items-center justify-center text-[#ffffff]">
              <span className="max-sm:hidden">Open in Figma</span>
              <div className="sm:hidden flex items-center">
                <Image
                  alt=""
                  src="/images/bookmark.png"
                  width={14}
                  height={14}
                  className="mx-1"
                />
                Save for later
              </div>
            </div>
            <div className="sm:hidden mx-2 w-10 h-10 flex items-center justify-center border border-[#e6e6e6 rounded-md">
              <Image alt="" src="/images/love.png" width={20} height={20} />
            </div>
            <div className="max-sm:hidden text-[11px] text-center mt-2 text-[#00000080]">
              In-app purchases
            </div>
          </div>
        </div>
        <div className="max-sm:hidden flex-[6.8] flex flex-col relative">
          {/* 展示图 */}
          <div className="w-full">
            <Image
              alt=""
              src={`/images/p-${photo + 1}.png`}
              width={840}
              height={472}
              className="rounded-lg object-cover"
            />
          </div>
          {/* 上一张 */}
          <div className="cursor-pointer w-8 h-[116px] flex items-center z-50 shadow-gradient-left min-[1230px]:hidden absolute bottom-0 left-0">
            {photo !== 0 && (
              <div
                className=" w-8 h-8 shadow-2xl rounded-full bg-[#F5F5F5] flex items-center justify-center translate-x-[-14px]"
                onClick={() => {
                  setPhoto((prev: number) => {
                    if (prev > 0) {
                      return prev - 1
                    }
                    return 0
                  })
                  const target = liList.current[photo - 1]
                  scrollDistance(target, imgRef.current!)
                  console.log({ photo })
                }}
              >
                <Image
                  alt=""
                  src="/images/left.png"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </div>
            )}
          </div>
          {/* 下一张 */}
          <div className="cursor-pointer w-8 h-[116px] flex items-center z-50 shadow-gradient-right min-[1230px]:hidden absolute bottom-0 right-0">
            {photo !== 4 && (
              <div
                className="cursor-pointer w-8 h-8 shadow-2xl rounded-full bg-[#F5F5F5] flex items-center justify-center translate-x-[14px]"
                onClick={() => {
                  setPhoto((prev: number) => {
                    if (prev < 4) {
                      return prev + 1
                    }
                    return 4
                  })
                  console.log({ photo })
                  const target = liList.current[photo + 1]
                  scrollDistance(target, imgRef.current!)
                }}
              >
                <Image
                  alt=""
                  src="/images/right.png"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </div>
            )}
          </div>
          {/* 列表图 */}
          <div ref={imgRef} className="no-scrollbar-x flex flex-nowrap py-4">
            {images.map((img, index) => {
              return (
                <div
                  className={[
                    'cursor-default flex-shrink-[0] mx-2 border-[2px] rounded-md',
                    photo === index
                      ? 'border-[2px] border-[#0D99FF]'
                      : 'border-transparent',
                  ].join(' ')}
                  key={index}
                  onClick={(e) => {
                    const clickedItem = e.currentTarget
                    if (imgRef.current) {
                      scrollDistance(clickedItem, imgRef.current)
                    }
                    setPhoto(index)
                  }}
                >
                  <Image
                    alt=""
                    src={img}
                    width={140}
                    height={84}
                    className="w-[140px] h-[84px] rounded-md overflow-hidden"
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
