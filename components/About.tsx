import Image from 'next/image'

export default function About() {
  /** 侧边tag数据 */
  const asideList = [
    {
      id: 1,
      title: 'Category',
      tags: ['Design tools', 'Import & export'],
    },
    {
      id: 2,
      title: 'Tags',
      tags: [
        'benchmark',
        'code',
        'design',
        'import',
        'html',
        'plugin',
        'website',
        'figma',
      ],
    },
  ]
  /** More by this creator */
  const creatorList = [
    {
      id: 1,
      desc: 'pdf.to.design - Import any PDF documents to Figma designs',
      color: '#E2A4A7',
    },
    {
      id: 2,
      desc: 'Lorem Ipsum',
      color: '#94BCEE',
    },
    {
      id: 3,
      desc: 'data.to.design - Design with your data from Google Sheets, CSV, JSON, Airtable or Notion',
      color: '#7FAE9A',
    },
  ]

  const renderCreator = () => {
    return (
      <div className="text-sm mt-8">
        <div className="w-full overflow-hidden">
          <h2 className="font-semibold">More by this creator</h2>
          <ul className="flex mt-4 no-scrollbar-x">
            {creatorList.map((item) => {
              return (
                <li
                  key={item.id}
                  className={[
                    'flex-1 min-w-[200px] mr-5 flex-shrink-0',
                    item.id == 3 && 'mr-0',
                  ].join(' ')}
                >
                  <div
                    className="w-full border border-[#e6e6e6] aspect-[16/9] flex items-center justify-center rounded-md"
                    style={{
                      backgroundImage: `radial-gradient(circle at top, ${item.color} 0%, #fff 100%)`,
                    }}
                  >
                    <Image
                      alt=""
                      src={`/images/t-${item.id}.png`}
                      width={56}
                      height={56}
                      className="w-14 h-14 rounded-[25%]"
                    />
                  </div>
                  <div className="truncate my-2">{item.desc}</div>
                </li>
              )
            })}
          </ul>
        </div>
        <hr className="my-6" />
        <div className="flex items-center h-12">
          <Image
            alt=""
            src="/images/p-1.png"
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg"
          />
          <div className="text-sm font-semibold ml-2">Version history</div>
        </div>
        <div className="text-[#b3b3b3] text-sm">
          Version 195 on 2024年7月8日
        </div>
        <div className="text-[#b3b3b3] text-sm">
          Version 194 on 2024年7月8日
        </div>
        <div className="text-[#0d99ff] mt-4 mb-8">See all</div>
      </div>
    )
  }

  return (
    <section className="max-w-[1216px] mx-auto sm:p-8 max-sm:p-5 flex justify-between max-[905px]:flex-col text-[#000000e5]">
      <div className="min-[905px]:mr-[50px] min-[905px]:w-calc-width">
        <h2 className="text-lg font-semibold">
          <span className="text-[#0d99ff]">html.to.design </span>
          converts any website into fully editable Figma designs.
        </h2>
        <div className="text-sm">
          Leverage an existing website and import its html to Figma to start
          your own designs, without building each element from scratch.
        </div>
        <h2 className="text-lg font-semibold mt-6">
          How to import a website into Figma?
        </h2>
        <ol className="list-decimal pl-8">
          <li className="text-sm leading-6">
            In Figma, go to the plugin menu and start html.to.design plugin
          </li>
          <li className="text-sm leading-6">
            Enter the url of the website to import into Figma
          </li>
          <li className="text-sm leading-6">
            Chose the viewports to import (mobile, desktop, tablet...)
          </li>
          <li className="text-sm leading-6">Click on import</li>
        </ol>
        <h2 className="text-lg font-semibold mt-6">Why use html.to.design?</h2>
        <ol className="list-disc pl-8">
          <li className="text-sm leading-6">
            Redesign an existing website, without building a single thing from
            scratch.
          </li>
          <li className="text-sm leading-6">
            Capture websites for a benchmark or moodboard in Figma, without a
            single screenshot.
          </li>
          <li className="text-sm leading-6">
            Load an editable webpage in Figma for collaboration, providing
            comments and feedback.
          </li>
          <li className="text-sm leading-6">
            Improve your UX writing with different copy, and get a snapshot of
            exactly how it’ll look.
          </li>
          <li className="text-sm leading-6">
            Scrap a website to import missing design assets for ongoing
            projects.
          </li>
        </ol>
        <div className="w-full max-[905px]:hidden">{renderCreator()}</div>
      </div>
      {/* 侧边栏 */}
      <aside className="w-56 max-[905px]:w-full max-[905px]:mt-8">
        <div className="w-full rounded-sm bg-[#F2F9FF] text-[11px] py-6 px-3">
          <strong>This is a Figma Community plugin.</strong>
          Community is a space for Figma users to share things they create.
          <span className="text-[#0d99ff]">
            Get started with a free account →
          </span>
        </div>
        {/* tag标签 */}
        {asideList.map((item) => {
          return (
            <div key={item.id} className="mt-8">
              <div className="mb-3 text-sm font-medium">{item.title}</div>
              <ul className="flex flex-wrap">
                {item.tags.map((tag, tagIndex) => {
                  return (
                    <li
                      key={tagIndex}
                      className="text-[13px] cursor-default py-1 px-3 mr-[10px] mb-[10px] shadow-custom-inset rounded"
                    >
                      {tag}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
        <hr className="my-4" />
        <div className="text-[13px] leading-6 max-[905px]:hidden">
          <div>Last updated 2 days ago</div>
          <div>
            Support：
            <span className="hover:underline cursor-default text-[#00000080]">
              support+h2d@to.design
            </span>
          </div>
          <div>In-app purchases: $18/month subscription</div>
          <div>
            Licensed under{' '}
            <span className="text-[#0d99ff]">
              Community Paid Resource License
            </span>
          </div>
        </div>
        <div className="max-[905px]:hidden mt-5 text-[#00000080] hover:underline cursor-default">
          Report resource
        </div>
      </aside>
      <div className="w-full min-[905px]:hidden">{renderCreator()}</div>
    </section>
  )
}
