import client from '@/libs/prismadb'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await client.user.findUnique({ where: { email } })

    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await client.user.findUnique({ where: { id } })

    return user
  } catch {
    return null
  }
}

export const getUserAccounts = async (id: string) => {
  const accounts = await client.account.findFirst({
    where: {
      userId: id,
    },
  })

  return accounts
}
