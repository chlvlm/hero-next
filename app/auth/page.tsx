'use client'
import { TwitterIcon } from '@/components/icons'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from '@heroui/react'
import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'

export default function AuthLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const session = useSession()

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/auth',
      })
      console.log('result :>> ', result)
    } catch (error) {
      console.error('登录失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="my-auto flex h-full flex-col w-full items-center justify-center py-72">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-2 p-6">
          <h1 className="text-center text-2xl font-bold">Login</h1>
          <p className="text-center text-sm">Please login to continue</p>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-6">
          <form onSubmit={handleCustomLogin} className="flex flex-col gap-4">
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              radius="full"
              type="submit"
              color="primary"
              isLoading={isLoading}
              className="w-full"
            >
              Login
            </Button>
          </form>

          <div className="my-4 flex items-center gap-2">
            <Divider className="flex-1" />

            <span className="text-sm text-gray-500">or</span>

            <Divider className="flex-1" />
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onPress={() => signIn('twitter', { callbackUrl: '/' })}
              className="w-full"
              color="default"
              variant="bordered"
              startContent={<TwitterIcon />}
              radius="full"
            >
              Login with Twitter
            </Button>
          </div>
        </CardBody>
      </Card>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}
