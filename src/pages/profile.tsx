import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { RootState } from '@/redux/store'
import { Avatar, Divider } from '@mui/material'
import { HiOutlineEnvelope, HiOutlineUser, HiOutlineShieldCheck } from 'react-icons/hi2'

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.user)
  const router = useRouter()

  useEffect(() => {
    if (!user.token) {
      router.push('/login?redirect=/profile')
    }
  }, [user.token, router])

  if (!user.token) return null

  const initial = user.email ? user.email[0].toUpperCase() : 'U'
  const displayName = user.displayName || user.email?.split('@')[0] || 'User'

  return (
    <div className="min-h-screen flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-lg">
        {/* Profile card */}
        <div className="glass-card rounded-2xl p-8 border border-white/10">
          {/* Avatar and name */}
          <div className="flex flex-col items-center mb-8">
            <Avatar
              src={user.photoURL || undefined}
              sx={{
                width: 96,
                height: 96,
                fontSize: '2.5rem',
                fontWeight: 600,
                bgcolor: 'rgba(139, 92, 246, 0.7)',
                mb: 2,
              }}
            >
              {!user.photoURL && initial}
            </Avatar>
            <h1 className="text-2xl font-bold text-white">{displayName}</h1>
            <p className="text-gray-400 text-sm mt-1">{user.email}</p>
          </div>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 3 }} />

          {/* Account details */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Account Details</h2>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-violet-500/15">
                <HiOutlineUser className="text-violet-400 text-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Display Name</p>
                <p className="text-sm text-white">{displayName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-cyan-500/15">
                <HiOutlineEnvelope className="text-cyan-400 text-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm text-white">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-500/15">
                <HiOutlineShieldCheck className="text-emerald-400 text-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Sign-in Provider</p>
                <p className="text-sm text-white">Google</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
