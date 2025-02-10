'use client'
import { TwitterIcon } from '@/components/icons'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  cn,
  Divider,
  Input,
} from '@heroui/react'
import { Eye, EyeOff } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import { useMemo, useState } from 'react'

export enum EmailCardType {
  Login = 'Log In',
  SignUp = 'Sign Up',
}

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
        type: 'login',
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

  const [typeName, setTypeName] = useState(EmailCardType.Login)

  const isLogin = useMemo(() => typeName === EmailCardType.Login, [typeName])

  return (
    <div className="my-auto flex h-full flex-col w-full items-center justify-center py-20 gap-5">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-2 p-6 pb-0">
          <h1 className="text-center text-2xl font-bold">
            {isLogin ? 'Email Login' : 'Sign Up by Email'}
          </h1>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-6">
          <form onSubmit={handleCustomLogin} className="flex flex-col gap-4">
            <LoginInput label="Email" onChange={setEmail} />
            <div className="flex flex-col">
              <LoginInput
                label="Password"
                type="password"
                onChange={setPassword}
              />

              {typeName === EmailCardType.SignUp && (
                <div className={cn('p-1 text-xs text-default-400')}>
                  At least 8 characters, one number & one uppercase letter.
                </div>
              )}
            </div>
            {typeName === EmailCardType.SignUp && (
              <>
                <LoginInput
                  label="Confirm Password"
                  type="password"
                  onChange={() => {}}
                />
                <LoginInput
                  label="Verification Code"
                  onChange={() => {}}
                  endContent={
                    <Button
                      className="text-sm font-semibold text-primary-600 data-[active=true]:bg-transparent data-[hover=true]:bg-transparent"
                      variant="light"
                      onPress={() => {}}
                    >
                      Send
                    </Button>
                  }
                />
              </>
            )}

            <Button
              radius="full"
              type="submit"
              color="primary"
              isLoading={isLoading}
              className="w-full"
            >
              {typeName}
            </Button>
          </form>

          <div className="flex items-center justify-center gap-1 text-base text-default-400">
            {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
            <span
              className="cursor-pointer text-primary"
              onClick={() =>
                setTypeName(
                  isLogin ? EmailCardType.SignUp : EmailCardType.Login
                )
              }
            >
              {isLogin ? EmailCardType.SignUp : EmailCardType.Login}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Divider className="flex-1" />

            <span className="text-sm text-default-400">or</span>

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
    </div>
  )
}

export const LoginInput = ({
  label,
  endContent = null,
  type = 'text',
  onChange,
}: {
  label: string
  endContent?: React.ReactNode
  type?: 'text' | 'password'
  onChange: (value: string) => void
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  const [value, setValue] = useState('')
  return (
    <Input
      label={label}
      classNames={{ inputWrapper: 'h-[62px]' }}
      value={value}
      type={type === 'password' ? (isVisible ? 'text' : 'password') : type}
      onChange={(e) => {
        const val = e.target.value.replace(/[\u4e00-\u9fa5]/g, '')
        setValue(val)
        onChange(val)
      }}
      endContent={
        endContent ? (
          endContent
        ) : type === 'password' ? (
          <Button
            isIconOnly
            aria-label="toggle password visibility"
            className="data-[hover=true]:bg-transparent"
            variant="light"
            radius="full"
            onPress={toggleVisibility}
          >
            {isVisible ? (
              <EyeOff className="text-default-400" />
            ) : (
              <Eye className="text-default-400" />
            )}
          </Button>
        ) : null
      }
    />
  )
}
