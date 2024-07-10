import Image from 'next/image'

export default function Header() {
  /** 导航文字 */
  const nav = [
    {
      id: 1,
      title: 'Design resources',
    },
    {
      id: 2,
      title: 'Plugins',
    },
    {
      id: 3,
      title: 'Whiteboarding',
    },
    {
      id: 4,
      title: 'Presentations',
    },
  ]
  return (
    <header className="h-12 w-full flex justify-center items-center border-b border-solid border-[#e6e6e6]">
      <div className="h-full flex items-center">
        <div className="w-32 h-12 cursor-pointer flex justify-between items-center lg:border-none max-lg:w-12 border-r border-solid border-[#e6e6e6]">
          <div className="flex-1 flex justify-center items-center">
            <Image alt="" src="/images/logo.png" width={12} height={18} />
          </div>
          <div className="text-sm font-semibold max-lg:hidden">Community</div>
        </div>
        <div className="max-lg:hidden">
          <ul className="flex text-[13px] mx-3">
            {nav.map((item) => {
              return (
                <li
                  key={item.id}
                  className="group px-3 flex items-center justify-center m-1 cursor-pointer hover:bg-[#F5F5F5] rounded-[4px] h-8 whitespace-nowrap"
                >
                  {item.title}
                  <Image
                    alt=""
                    src="/images/down.png"
                    width={8}
                    height={8}
                    className="ml-1 transform translate-y-[1px] transition-transform duration-300 group-hover:rotate-[-180deg]"
                  />
                </li>
              )
            })}
          </ul>
        </div>
        <div className="lg:hidden flex items-center px-3">
          <Image
            alt=""
            src="/images/nav.png"
            width={16}
            height={16}
            className="w-4 h-4"
          />
          <span className="text-[13px] px-3">Browse</span>
        </div>
      </div>
      <div className="text-[#000000e5] h-full flex-1 flex justify-end items-center pr-3">
        {/* 搜索 */}
        <div className="max-[1060px]:hidden">
          <div className="w-60 flex items-center bg-[#f5f5f5] rounded-3xl h-8 mr-6">
            <Image
              alt=""
              src="/images/search.png"
              width={15}
              height={15}
              className="ml-2"
            />
            <input
              className="border-none bg-transparent focus:border-none focus:outline-none focus:ring-0 focus:shadow-none text-[#000000e5] text-[12px] w-48 ml-1"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="min-[1060px]:hidden w-9 h-9 rounded-[50%] flex justify-center items-center bg-[#F5F5F5] mr-6">
          <Image
            alt=""
            src="/images/search-active.png"
            width={15}
            height={15}
          />
        </div>
        {/* 登录按钮 */}
        <div className="h-8 w-28 flex justify-between items-center text-[11px]">
          <div className="">Log in</div>
          <div className="border border-[#000000e5] border-solid rounded-md flex justify-center items-center w-[67px] h-8">
            Sign up
          </div>
        </div>
      </div>
    </header>
  )
}
