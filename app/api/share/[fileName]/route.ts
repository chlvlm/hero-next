import { generateImage } from '@/utils/imageGenerator'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { fileName: string } }
) {
  const ip = request.headers.get('X-Forwarded-For')
  console.log('ip', ip)

  try {
    // Validate filename format
    if (!params.fileName.endsWith('.png')) {
      return new Response('Invalid file format', { status: 400 })
    }

    const parts = params.fileName.replace('.png', '').split('-')
    if (parts.length !== 10) {
      return new Response('Invalid filename format', { status: 400 })
    }

    const [
      account,
      market,
      collateral,
      timestamp,
      isLong,
      roe,
      trend,
      leverage,
      marketPrice,
      entryPrice,
    ] = parts

    // Validate required parameters
    if (!account || !market || !roe || !entryPrice || !marketPrice) {
      return new Response('Missing required parameters', { status: 400 })
    }

    const dataUrl = await generateImage({
      account,
      market,
      collateral,
      timestamp,
      isLong,
      roe,
      trend,
      leverage,
      marketPrice,
      entryPrice,
    })
    // 将 base64 数据 URL 转换为 Buffer
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '')
    const imageBuffer = Buffer.from(base64Data, 'base64')
    return new Response(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  } catch (error) {
    console.error('Image generation failed:', error)
    return new Response(String(error), { status: 500 })
  }
}
