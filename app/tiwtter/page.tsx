'use client'

export default function page() {
  const imageUrl =
    'https://hero-next-opal.vercel.app/api/share/BTC-AZT-true-17.46-loss-5.89-marmot88-101333.8503-104425.6167.png'
  return (
    <div>
      <div
        className="rounded-md bg-blue-500 p-2 w-20 my-20 flex text-white justify-center items-center cursor-pointer mx-auto"
        onClick={() => {
          const tweetText = encodeURIComponent(`on its testnet! 😱`)

          const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(
            imageUrl
          )}`

          window.open(tweetUrl, '_blank')
        }}
      >
        Share
      </div>
    </div>
  )
}
