'use client'

export default function Page() {
  const domain = 'https://hero-next-opal.vercel.app'
  const imageUrl = `${domain}/share/BTC-AZT-true-17.46-loss-5.89-marmot88-101333.8503-104425.6167.png`
  return (
    <div>
      <div
        className="rounded-md bg-blue-500 p-2 w-fit my-20 flex text-white justify-center items-center cursor-pointer mx-auto"
        onClick={() => {
          // 推文文本
          const tweetText = encodeURIComponent(
            `I just hopped into the @azex_io testnet! 🚀 
    
This might be the FIRST batch of #DeFi projects on #Berachain to publicly offer rewards and #BugBounty on its testnet! 😱
    
Invite link: `
          )

          // Twitter 分享链接，增加 `imageUrl` 作为分享内容
          const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(
            imageUrl
          )}`

          window.open(tweetUrl, '_blank')
        }}
      >
        Share Twitter
      </div>
    </div>
  )
}
