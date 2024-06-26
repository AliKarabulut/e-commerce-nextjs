'use server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

import { getPassordResetTokenByToken } from '@/libs/password-reset-token'
import client from '@/libs/prismadb'
import { getUserByEmail } from '@/libs/user'
import { NewPasswordScheme } from '@/schemas'

export const newPassword = async (values: z.infer<typeof NewPasswordScheme>, token: string | null) => {
  if (!token) {
    return {
      error: 'Token is required',
    }
  }

  const validateValues = NewPasswordScheme.safeParse(values)

  if (!validateValues.success) {
    return { error: 'Invalid Password!' }
  }

  const { password } = validateValues.data

  const existingToken = await getPassordResetTokenByToken(token)

  if (!existingToken) {
    return {
      error: "Token doesn't exist",
    }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return {
      error: 'Token has expired',
    }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return {
      error: "User doesn't exist",
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await client.user.update({
      where: {
        id: 'existingUser.id',
      },
      data: {
        password: hashedPassword,
      },
    })
  } catch (error) {
    return { error: 'An error occurred while changing the password. Please try again.' }
  }

  try {
    await client.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  } catch (error) {
    throw new Error('An error occurred while attempting to delete the password reset token')
  }
  return { success: 'Password reset successfully' }
}
