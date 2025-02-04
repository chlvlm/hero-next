'use client'
import Head from 'next/head'
import React from 'react'

export default function page() {
  const imageUrl =
    'https://hero-next-opal.vercel.app/api/share/BTC-AZT-true-17.46-loss-5.89-marmot88-101333.8503-104425.6167.png'
  return (
    <>
      <Head>
        {/* Twitter Card metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Join the @azex_io testnet! 🚀" />
        <meta
          name="twitter:description"
          content="This might be the FIRST batch of #DeFi projects on #Berachain to publicly offer rewards and #BugBounty on its testnet!"
        />
        <meta name="twitter:image" content={imageUrl} />

        {/* Open Graph metadata */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Join the @azex_io testnet! 🚀" />
        <meta
          property="og:description"
          content="This might be the FIRST batch of #DeFi projects on #Berachain to publicly offer rewards and #BugBounty on its testnet!"
        />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content="https://hero-next-opal.vercel.app" />
      </Head>
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
    </>
  )
}
