import { NextResponse, URLPattern } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/incentive-testnet')) {
    return NextResponse.redirect(new URL('/incentive-testnet', request.url))
  }

  // 方法1：使用 URL 对象的 pathname
  if (request.nextUrl.pathname.startsWith('/share/')) {
    // 获取最后一个斜杠后的内容作为 fileName
    const fileName = request.nextUrl.pathname.split('/').pop()

    // 或者使用正则表达式
    // const fileName = request.nextUrl.pathname.match(/\/share\/(.+)/)?.[1];

    console.log('fileName:', fileName)
    return NextResponse.redirect(new URL(`/api/share/${fileName}`, request.url))
  }

  // 方法2：使用 URLPattern（更灵活的方式）
  const pattern = new URLPattern({ pathname: '/share/:fileName' })
  const match = pattern.exec(request.url)
  if (match) {
    const { fileName } = match.pathname.groups
    return NextResponse.redirect(new URL(`/api/share/${fileName}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
