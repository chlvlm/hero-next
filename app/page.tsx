'use client'
import { useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import Main from '@/components/Main'
import Footer from '@/components/Footer'
import Comments from '@/components/Comments'
import About from '@/components/About'
import Image from 'next/image'

export default function page() {
  const tabs = [
    {
      id: 1,
      name: 'About',
    },
    {
      id: 2,
      name: 'Comments',
    },
  ]
  const scrollRef = useRef<HTMLDivElement>(null)
  const tabRef = useRef<HTMLDivElement>(null)
  const commentsNumber = useRef(0)
  const [flag, setFlag] = useState(false)
  const [tabId, setTabId] = useState(1)
  const handlerScrollTop = (id: number) => {
    if (id === 1) {
      scrollRef.current!.scrollTop = Math.random()
    } else {
      scrollRef.current!.scrollTop = commentsNumber.current
    }
  }
  const getTopNumber = (num: number) => {
    console.log({ num })

    commentsNumber.current = num - 110
  }

  const renderInfo = () => {
    return (
      <>
        {flag && (
          <div className="sm:w-32 flex sm:flex-col justify-center">
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
        )}
      </>
    )
  }

  useEffect(() => {
    console.log(tabRef.current?.offsetTop)
  }, [])
  return (
    <div className="w-full h-full flex flex-col items-center overflow-hidden">
      {/* 头部 */}
      <Header />
      <div
        ref={scrollRef}
        className="w-full no-scrollbar-y flex-1"
        onScroll={(ev) => {
          const { scrollTop } = ev.currentTarget
          if (tabRef.current && scrollTop > tabRef.current.offsetTop - 100) {
            setFlag(true)
          } else {
            setFlag(false)
          }
          console.log({ scrollTop })
        }}
      >
        {/* 图文 */}
        <Main />
        {/* tab切换 */}
        <div
          ref={tabRef}
          className={[
            'w-full shadow-custom-shadow sticky top-0 bg-white',
            flag ? 'h-20 max-sm:h-40' : ' h-8',
          ].join(' ')}
        >
          <div className="max-w-[1216px] h-full mx-auto sm:px-8 max-sm:px-5 flex max-sm:flex-col items-center justify-between">
            <div className="w-full flex-1 overflow-hidden h-full">
              {flag && (
                <h1 className="w-full text-lg truncate text-[#000000E5] mt-4 font-semibold">
                  html.to.design — Import websites to Figma designs
                  (web,html,css)
                </h1>
              )}
              <div
                className={[
                  'sm:hidden w-full flex justify-start',
                  flag && 'my-5',
                ].join(' ')}
              >
                {renderInfo()}
              </div>
              <div className={['flex', flag && 'py-[4px]'].join(' ')}>
                {tabs.map((item) => {
                  return (
                    <div
                      className={[
                        'text-sm text-[#00000080] mr-8 cursor-default h-8',
                        tabId === item.id &&
                          'font-semibold text-[#000000e5] border-b-2 border-[#2c2c2c]',
                      ].join(' ')}
                      key={item.id}
                      onClick={() => {
                        setTabId(item.id)
                        handlerScrollTop(item.id)
                      }}
                    >
                      {item.name}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="max-sm:hidden">{renderInfo()}</div>
          </div>
        </div>
        {/* 简介 */}
        <About />
        {/* 评论 */}
        <Comments getTopNumber={getTopNumber} />
        {/* 结尾 */}
        <Footer />
      </div>
    </div>
  )
}
