'use client'

export default function Page() {
  const imageUrl =
    'https://hero-next-opal.vercel.app/api/share/BTC-AZT-true-17.46-loss-5.89-marmot88-101333.8503-104425.6167.png'

  return (
    <div>
      <div
        className="rounded-md bg-blue-500 p-2 w-20 my-20 flex text-white justify-center items-center cursor-pointer mx-auto"
        onClick={() => {
          // 推文文本
          const tweetText = encodeURIComponent(
            `Check out this amazing image! 😱`
          )

          // Twitter 分享链接，增加 `imageUrl` 作为分享内容
          const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(
            'https://hero-next-opal.vercel.app/share/BTC-AZT-true-17.46-loss-5.89-marmot88-101333.8503-104425.6167'
          )}`

          window.open(tweetUrl, '_blank')
        }}
      >
        Share
      </div>
    </div>
  )
}
