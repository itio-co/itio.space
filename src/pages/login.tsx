import { LoginForm } from '@/components/auth'
import TwinkleStars from '@/components/common/TwinkleStars'

export default function LoginPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <TwinkleStars />

      {/* Aurora blobs */}
      <div
        className="aurora-blob"
        style={{
          width: 340,
          height: 340,
          background: 'rgba(139, 92, 246, 0.18)',
          top: '15%',
          left: '25%',
        }}
      />
      <div
        className="aurora-blob"
        style={{
          width: 280,
          height: 280,
          background: 'rgba(6, 182, 212, 0.14)',
          bottom: '20%',
          right: '20%',
          animationDelay: '4s',
        }}
      />

      <div className="relative z-10 w-full max-w-md mx-4">
        <LoginForm />
      </div>
    </main>
  )
}
