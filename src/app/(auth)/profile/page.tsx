'use client'
import { useTransition } from 'react'
import toast from 'react-hot-toast'

import { changeEmail } from '@/actions/change-email'
import Button from '@/components/button'
// import UserInformationList from '@/components/user-information-list'
import { toggleTwoFactor } from '@/actions/toggle-two-factor'
import SwitchComponent from '@/components/switch'
import { useCurrentUser } from '@/services/get-user-from-client'

export const dynamic = 'force-dynamic'

const Profile = () => {
  const [isPending, startTransition] = useTransition()
  const user = useCurrentUser()
  const emailChangeHandler = (email: string) => {
    startTransition(() => {
      changeEmail({ email }).then(data => {
        if (data?.error) {
          toast.error(data.error)
        } else {
          toast.success(data?.success)
        }
      })
    })
  }

  const twoFactorChangeHandler = (value: boolean) => {
    startTransition(() => {
      toggleTwoFactor({ value }).then(data => {
        if (data?.error) {
          toast.error(data.error)
        } else if (data?.success) {
          toast.success(data.success)
        }
      })
    })
  }

  return (
    <section id="profile">
      <ul className="mx-auto flex w-11/12 flex-col rounded-lg px-8 py-10 shadow sm:max-w-lg">
        {user ? (
          <>
            <li className="flex items-center justify-between gap-6 border-b border-gray-100 py-3">
              <span className="font-medium first-letter:capitalize">Id:</span>
              <span className="inline-flex items-center truncate rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                {user.id}
              </span>
            </li>
            <li className="flex items-center justify-between gap-6 border-b border-gray-100 py-3">
              <span className="font-medium first-letter:capitalize">Name:</span>
              <span className="inline-flex items-center truncate rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                {user.name}
              </span>
            </li>
            <li className="flex items-center justify-between gap-6 border-b border-gray-100 py-3">
              <span className="font-medium first-letter:capitalize">Email:</span>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <span className="inline-flex items-center truncate rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                  {user.email}
                </span>
              </div>
            </li>
            <li className="flex items-center justify-between gap-6 border-b border-gray-100 py-3">
              <span className="font-medium first-letter:capitalize">Image:</span>
              <span className="inline-flex items-center truncate rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                {user.image ? 'Set' : 'Not set'}
              </span>
            </li>
            <li className="flex items-center justify-between gap-6 border-b border-gray-100 py-3">
              <span className="font-medium first-letter:capitalize">Role:</span>
              <span className="inline-flex items-center truncate rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                {user.role}
              </span>
            </li>
            <li className="flex items-center justify-between gap-6 border-b border-gray-100 py-3">
              <span className="font-medium first-letter:capitalize">Is 2FA Activated?:</span>
              <div className="flex items-center gap-2">
                <SwitchComponent onChange={twoFactorChangeHandler} initialValue={user.isTwoFactorEnabled} disabled={isPending} />
              </div>
            </li>
            {!user.isOAuth && (
              <div className="mt-4 flex justify-end gap-6">
                <Button href="/change-password" label="Change Password" disabled={isPending} className="w-fit" />
                <Button label="Change Email" disabled={isPending} className="w-fit" onClick={() => emailChangeHandler(user?.email ?? '')} />
              </div>
            )}
          </>
        ) : (
          <div>User Data Not Found</div>
        )}
      </ul>
    </section>
  )
}

export default Profile
