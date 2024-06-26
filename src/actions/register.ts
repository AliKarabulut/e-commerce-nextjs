'use server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

import client from '@/libs/prismadb'
import { generateVerificationToken } from '@/libs/token'
import { getUserByEmail } from '@/libs/user'
import { RegisterSchema } from '@/schemas'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateValues = RegisterSchema.safeParse(values)

  if (!validateValues.success) {
    return { error: 'Invalid credentials!' }
  }

  const { email, password, name } = validateValues.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'User already is exist!' }
  }

  await client.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })

  const verificationToken = await generateVerificationToken(email)

  if (!verificationToken) {
    return { error: 'An error occurred while attempting to send the verification email. Please try again.' }
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-confirmation-mail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: verificationToken?.email, token: verificationToken?.token }),
  })

  const data = await response.json()

  if (response.ok) {
    return { success: data.message }
  } else {
    return { error: data.error }
  }
}
