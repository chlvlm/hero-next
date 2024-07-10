import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function Comments({
  getTopNumber,
}: {
  getTopNumber: (n: number) => void
}) {
  /** 评论数据 */
  const list = [
    {
      id: 1,
      name: 'Ian Grossberg',
      date: '1 day ago',
      comment:
        'Such a no-brainer that this should exist (and maybe even be a part of Figma already), divRIOTS knocked it out of the park, has worked like a charm',
      reply: {
        name: 'divRIOTS',
        date: '1 day ago',
        content:
          'Hello, please check your payment method and your location is supported by Figma payments, otherwise you can contact directly the support of figma support@figma.com for payment issue. Best. Greg.',
      },
    },
    {
      id: 2,
      name: 'Ashkan자 흐라',
      date: '3 day ago',
      comment:
        'Seven days have passed, and my issue remains unresolved. I am extremely frustrated, I did not use your service but had to pay you for nothing. It was my fault to connect my card to your payment gateway. ',
      reply: {
        name: 'divRIOTS',
        date: '4 day ago',
        content:
          'Hello @iangrossberg  thanks for the kind words :pray: Happy it worked for you like a charm. Best. Greg.',
      },
    },
    {
      id: 3,
      name: 'Luis Margolles Romero',
      date: '5 day ago',
      comment:
        "Hello, I can no longer load a Figma layout. The progress bar is stuck and I can't even close the modal. It forces me to restart Figma everytime I try",
      reply: {
        name: 'divRIOTS',
        date: '6 day ago',
        content:
          'Hello @daninewman we are waiting the fix for your issue from the Figma payments teams you are in cc of the mails. Best.',
      },
    },
    {
      id: 4,
      name: 'Alexandre Le Guerneuve',
      date: '7 day ago',
      comment:
        "Would love to upgrade but the text field isn't working to enter my payment info :'(",
      reply: {
        name: 'divRIOTS',
        date: '6 day ago',
        content:
          'Hello, could you please send us an email support@to.design ? Best. Greg',
      },
    },
    {
      id: 5,
      name: 'Lydia Dick',
      date: '11 day ago',
      comment:
        'I have a problem, the plugin is capturing the moment the site is loading. I need it to make the clone about 3 seconds after it opens... Is there any option for this?',
      reply: {
        name: 'divRIOTS',
        date: '6 day ago',
        content:
          'Hello, yes you can use the chrome extension https://html.to.design/chrome-extension it will capture at the moment you hit the capture button (selection or full page). Best. Greg.',
      },
    },
  ]
  const commentsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (commentsRef.current) {
      getTopNumber(commentsRef.current.offsetTop)
    }
  }, [])
  return (
    <div
      ref={commentsRef}
      className="max-w-[1216px] mx-auto flex justify-start"
    >
      <div className="max-w-[942px] text-[#000000E5] sm:px-8 max-sm:px-5">
        <div className="w-full h-[50px] border border-[#e6e6e6] rounded-lg flex items-center justify-between p-2">
          <div className="flex justify-center items-center">
            <div className="w-8 h-8 rounded-full bg-[#FFCD29] text-[#ffffff] text-base flex items-center justify-center">
              A
            </div>
            <input
              className="border-none bg-transparent pl-2 focus:border-none focus:outline-none focus:ring-0 focus:shadow-none text-[#000000e5] text-[12px] w-48 ml-1"
              placeholder="Add a comment"
            />
          </div>
          <div className="w-20 h-8 rounded-lg bg-[#B2B2B2] text-[11px] text-[#ffffff] flex items-center justify-center">
            Post
          </div>
        </div>
        <div className="my-5 text-[11px] font-medium">
          {list.length} comments
        </div>
        <ul>
          {list.map((item, index) => {
            return (
              <li key={item.id}>
                <div className="h-8 flex items-center">
                  <Image
                    alt=""
                    src={`/images/a-${index + 1}.jpg`}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="ml-[10px] text-[13px]">{item.name}</div>
                  <div className="max-sm:hidden text-[11px] ml-[5px]">
                    @mdsaidurrahman ·{' '}
                  </div>
                  <div className="ml-[5px] text-[11px]">{item.date}</div>
                </div>
                <div className="ml-[43px] mt-1 text-[13px] leading-6">
                  {item.comment}
                </div>
                <div className="pl-[43px] pt-4">
                  <div className="flex items-center">
                    <Image
                      alt=""
                      src="/images/picture.jpg"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="text-[13px] ml-[10px]">
                      {item.reply.name}
                    </div>
                    <div className="max-sm:hidden ml-[5px] text-[11px]">
                      @divriots
                    </div>
                    <div className="w-[42px] h-4 rounded-[3px] text-[#ffffff] text-[9px] bg-[#2c2c2c] px-[5px] ml-[5px] flex items-center justify-center">
                      Creator
                    </div>
                    <div className="mx-[5px]"> · </div>
                    <div className="text-[11px]">{item.reply.date}</div>
                  </div>
                  <div className="ml-[43px] mt-1 text-[13px] leading-6">
                    {item.reply.content}
                  </div>
                  <hr className="my-4" />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
