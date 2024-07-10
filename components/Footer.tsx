export default function Footer() {
  const list = [
    {
      id: '001',
      title: 'Popular searches',
      items: [
        'Resume templates',
        'Mobile apps',
        'Presentation templates',
        'UI kits',
        'Standup templates',
      ],
    },
    {
      id: '002',
      title: 'Most used',
      items: [
        'Material Design Icons',
        'Apple Design Resources',
        'Figma auto layout playground',
        'Anima-Figma to React, HTML',
        'Ant Design Open Source',
      ],
    },
    {
      id: '003',
      title: 'Top collections',
      items: [
        'Instagram templates',
        'Landing page',
        'Email design inspiration',
        'Laptop mockups',
        'Arrow designs',
      ],
    },
    {
      id: '004',
      title: 'Top categories',
      items: [
        'Design templates',
        'Libraries',
        'Icons',
        'Development',
        'Brainstorming',
      ],
    },
  ]
  return (
    <footer className="w-full text-[13px] text-[#000000e5]">
      <div className="max-w-[1216px] my-0 mx-auto px-6 pt-6 pb-8 border-t border-[#e6e6e6]">
        <ul className="w-full grid gap-6 grid-cols-2 lg:grid-cols-4 mb-12">
          {list.map((item) => {
            return (
              <li key={item.id}>
                <h3 className="font-semibold">{item.title}</h3>
                {item.items.map((el, elIndex) => {
                  return (
                    <div
                      className="w-full mt-2 leading-6 cursor-default hover:underline"
                      key={elIndex}
                    >
                      {el}
                    </div>
                  )
                })}
              </li>
            )
          })}
        </ul>
        <div className="w-full font-semibold text-lg">Figma</div>
        <div className="mt-4 w-full">
          © 2024 Figma, Inc. • Site map • Community guidelines • Terms of
          service
        </div>
      </div>
    </footer>
  )
}
