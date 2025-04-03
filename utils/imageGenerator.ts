import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas'
import path from 'path'
import QRCode from 'qrcode'
import moment from 'moment'
const domain = 'https://hero-next-red.vercel.app'
GlobalFonts.registerFromPath(
  path.join(process.cwd(), 'public', 'Alexandria-Bold.ttf'),
  'Alexandria-Bold'
)
GlobalFonts.registerFromPath(
  path.join(process.cwd(), 'public', 'Alexandria-Medium.ttf'),
  'Alexandria-Medium'
)

export async function generateImage(params: {
  market: string
  collateral: string
  timestamp: string | number
  isLong: string
  roe: string
  trend: string
  leverage: string
  referralCode: string
  marketPrice: string
  entryPrice: string
}): Promise<Buffer> {
  const scaleFactor = 2
  const originalWidth = 1024
  const originalHeight = 582
  const canvas = createCanvas(
    originalWidth * scaleFactor,
    originalHeight * scaleFactor
  )
  const ctx = canvas.getContext('2d')
  ctx.scale(scaleFactor, scaleFactor)

  const netPnl =
    params.trend === 'profit' ? `+${params.roe}%` : `-${params.roe}%`
  const pnlColor = params.trend === 'profit' ? '#04ca96' : '#f43f5e'
  const whiteColor = '#ffffff'
  const grayColor = '#52525B'
  let qrCodeDataUrl
  try {
    qrCodeDataUrl = await QRCode.toDataURL(
      `${domain}/perp?ref=${params.referralCode}`
    )
  } catch (qrCodeError) {
    console.error('QR code generation failed:', qrCodeError)
    return Buffer.alloc(0)
  }

  try {
    const bgImage = await loadImage(
      path.join(process.cwd(), 'public', `share-${params.trend}-twitter.png`)
    )
    ctx.drawImage(bgImage, 0, 0, 1024, 582)
  } catch (imageError) {
    console.error('Background image loading failed:', imageError)
    return Buffer.alloc(0)
  }
  const marketTxt = `${params.market} / ${params.collateral} Perp`
  const marketWidth = ctx.measureText(marketTxt).width

  // 绘制文字
  ctx.font = 'bold 36px Alexandria-Bold'
  ctx.fillStyle = whiteColor
  ctx.fillText(marketTxt, 44, 170)

  ctx.font = 'bold 68px Alexandria-Bold'
  ctx.fillStyle = pnlColor
  ctx.fillText(`${netPnl}`, 44, 268)

  ctx.fillStyle =
    params.isLong === 'true'
      ? 'rgba(131, 247, 164, 0.10)'
      : 'rgba(244, 63, 94, 0.10)'
  const x = 400 // 设置x值
  const y = 142 // 设置y值
  const text = `${params.isLong === 'true' ? 'LONG' : 'SHORT'} ${
    params.leverage
  }X`
  // 获取文字宽度
  ctx.font = 'bold 16px Alexandria-Bold'
  const textWidth = ctx.measureText(text).width

  // 计算右边距，使其与左边距对等，并缩小10
  const padding = 2 // 左右边距缩小10
  const totalWidth = textWidth + padding * 2

  ctx.beginPath()
  ctx.moveTo(x, y) // 左上角起点
  ctx.lineTo(x + totalWidth, y) // 右上角
  ctx.arcTo(x + totalWidth + 12, y, x + totalWidth + 12, y + 12, 11) // 右上角圆角
  ctx.lineTo(x + totalWidth + 12, y + 23) // 右下角，缩小内边距
  ctx.arcTo(x + totalWidth + 12, y + 35, x + totalWidth, y + 35, 11) // 右下角圆角
  ctx.lineTo(x, y + 35) // 左下角
  ctx.arcTo(x - 12, y + 35, x - 12, y + 23, 11) // 左下角圆角
  ctx.lineTo(x - 12, y + 12) // 左上角
  ctx.arcTo(x - 12, y, x, y, 11) // 左上角圆角
  ctx.closePath()
  ctx.fill()
  // 绘制文字
  console.log('y', y)

  ctx.fillStyle = params.isLong === 'true' ? '#04ca96' : '#f43f5e'
  ctx.fillText(text, x + padding, y + 24)

  ctx.font = 'normal 20px Alexandria-Medium'
  ctx.fillStyle = grayColor
  ctx.fillText(`Entry Price`, 44, 330)

  ctx.font = 'normal 20px Alexandria-Medium'
  ctx.fillStyle = whiteColor
  ctx.fillText(`$${params.entryPrice}`, 44, 360)

  ctx.font = 'normal 20px Alexandria-Medium'
  ctx.fillStyle = grayColor
  ctx.fillText(`Mark Price`, 210, 330)

  ctx.font = 'normal 20px Alexandria-Medium'
  ctx.fillStyle = whiteColor
  ctx.fillText(`$${params.marketPrice}`, 210, 360)

  ctx.font = 'normal 16px Alexandria-Medium'
  ctx.fillStyle = grayColor
  ctx.fillText(`Referral Code`, 160, 458)

  ctx.font = 'bold 20px Alexandria-Bold'
  ctx.fillStyle = whiteColor
  ctx.fillText(`${params.referralCode}`, 160, 495)

  ctx.font = 'normal 16px Alexandria-Medium'
  ctx.fillStyle = grayColor
  ctx.fillText(`Enjoy the lowest trading fees now!`, 160, 528)

  ctx.font = 'bold 16px Alexandria-Medium'
  ctx.fillStyle = grayColor
  ctx.fillText(
    moment(Number(params.timestamp)).format('YYYY-MM-DD HH:mm'),
    840,
    530
  )

  // 插入图片
  try {
    const rectX = 44,
      rectY = 440,
      rectSize = 92,
      cornerRadius = 10
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(rectX + cornerRadius, rectY)
    ctx.arcTo(
      rectX + rectSize,
      rectY,
      rectX + rectSize,
      rectY + cornerRadius,
      cornerRadius
    )
    ctx.arcTo(
      rectX + rectSize,
      rectY + rectSize,
      rectX + rectSize - cornerRadius,
      rectY + rectSize,
      cornerRadius
    )
    ctx.arcTo(
      rectX,
      rectY + rectSize,
      rectX,
      rectY + rectSize - cornerRadius,
      cornerRadius
    )
    ctx.arcTo(rectX, rectY, rectX + cornerRadius, rectY, cornerRadius)
    ctx.closePath()
    ctx.clip()
    const insertImage = await loadImage(qrCodeDataUrl)
    ctx.drawImage(insertImage, rectX, rectY, rectSize, rectSize)
  } catch (insertImageError) {
    console.error('Inserted image failed to load:', insertImageError)
    return Buffer.alloc(0)
  }

  return canvas.toBuffer('image/png')
}
