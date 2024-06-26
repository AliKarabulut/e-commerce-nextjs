'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { newPassword } from '@/actions/new-password'
import Button from '@/components/button'
import FormContainer from '@/components/form-container'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import Input from '@/components/input'
import { NewPasswordScheme } from '@/schemas'

const NewPasswordForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof NewPasswordScheme>>({
    resolver: zodResolver(NewPasswordScheme),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (values: z.infer<typeof NewPasswordScheme>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      newPassword(values, token).then(data => {
        if (data?.error) {
          setError(data.error)
        } else if (data?.success) {
          setSuccess(data.success)
        }
      })
    })
  }

  return (
    <FormContainer title="New Password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
        <Input
          label="Repeat Password"
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <div>
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button label="Reset Password" disabled={isPending} />
        </div>
      </form>
    </FormContainer>
  )
}

export default NewPasswordForm
