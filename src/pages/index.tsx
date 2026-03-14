import { useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import TwinkleStars from '@/components/common/TwinkleStars'
import {
  Constellation,
  PlanetWithRings,
  OrbitDiagram,
  CometTrail,
  NebulaCloud,
  SpaceReticle,
  GalaxySpiral,
} from '@/components/common/SpaceLineArt'
import UserProfile from '@/components/auth/UserProfile'
import {
  HiOutlineLightBulb,
  HiOutlineCode,
  HiOutlineUsers,
  HiOutlineBookOpen,
  HiOutlineHeart,
} from 'react-icons/hi'
import {
  HiOutlineBookmarkSquare,
  HiOutlineBeaker,
  HiOutlineCpuChip,
  HiOutlineRocketLaunch,
  HiOutlineCube,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowPath,
  HiOutlineArrowsPointingOut,
  HiOutlineLink,
  HiOutlineSparkles,
  HiOutlineGlobeAlt,
  HiOutlineBolt,
} from 'react-icons/hi2'

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = node.querySelectorAll('.scroll-reveal, .scroll-reveal-scale')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return ref
}

const circleSteps = [
  { label: 'Idea', icon: HiOutlineLightBulb, color: '#a78bfa', glow: 'rgba(167,139,250,0.25)' },
  { label: 'Proposal', icon: HiOutlineBookOpen, color: '#818cf8', glow: 'rgba(129,140,248,0.25)' },
  { label: 'Prototype', icon: HiOutlineBeaker, color: '#67e8f9', glow: 'rgba(103,232,249,0.25)' },
  { label: 'Project', icon: HiOutlineRocketLaunch, color: '#34d399', glow: 'rgba(52,211,153,0.25)' },
  { label: 'Contribution', icon: HiOutlineHeart, color: '#f472b6', glow: 'rgba(244,114,182,0.25)' },
]

const spaces = [
  {
    name: 'Itio Codex',
    desc: 'A shared library of ideas, philosophy, and knowledge.',
    icon: HiOutlineBookmarkSquare,
    gradient: 'from-violet-600/20 via-purple-900/15 to-transparent',
    glow: 'rgba(139, 92, 246, 0.18)',
    accent: '#8b5cf6',
    tag: 'Knowledge',
  },
  {
    name: 'Yai Forge',
    desc: 'A place to design language specifications and technical ideas.',
    icon: HiOutlineCpuChip,
    gradient: 'from-cyan-600/20 via-blue-900/15 to-transparent',
    glow: 'rgba(6, 182, 212, 0.18)',
    accent: '#06b6d4',
    tag: 'Design',
  },
  {
    name: 'DevSpace Lab',
    desc: 'A sandbox for building and experimenting with software.',
    icon: HiOutlineCode,
    gradient: 'from-emerald-600/20 via-green-900/15 to-transparent',
    glow: 'rgba(16, 185, 129, 0.18)',
    accent: '#10b981',
    tag: 'Build',
  },
  {
    name: 'Omega Factory',
    desc: 'A space for simulation, systems thinking, and digital creation.',
    icon: HiOutlineCube,
    gradient: 'from-amber-600/20 via-orange-900/15 to-transparent',
    glow: 'rgba(245, 158, 11, 0.18)',
    accent: '#f59e0b',
    tag: 'Create',
  },
]

const philosophies = [
  { text: 'Small tribes can create big change', icon: HiOutlineSparkles, color: '#a78bfa' },
  { text: 'Knowledge should be shared', icon: HiOutlineGlobeAlt, color: '#67e8f9' },
  { text: 'Technology should empower people', icon: HiOutlineBolt, color: '#34d399' },
  { text: 'Collaboration multiplies impact', icon: HiOutlineUsers, color: '#f472b6' },
]

// Pentagon positions (% from top-left of container)
const pentagonPositions = [
  { x: 50, y: 4 },   // top
  { x: 96, y: 37 },  // top-right
  { x: 79, y: 90 },  // bottom-right
  { x: 21, y: 90 },  // bottom-left
  { x: 4, y: 37 },   // top-left
]

export default function Index() {
  const router = useRouter()
  const user = useSelector((state: RootState) => state.user)
  const pageRef = useScrollReveal()

  const handleGoToSpace = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      router.push(user.token ? '/itio-space' : '/login?redirect=/itio-space')
    },
    [router, user.token]
  )

  return (
    <main className="main" ref={pageRef}>
      {/* User profile */}
      <div className="fixed top-4 right-4 z-50">
        <UserProfile />
      </div>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <TwinkleStars />

        {/* Aurora blobs */}
        <div
          className="aurora-blob w-96 h-96"
          style={{ background: 'rgba(139, 92, 246, 0.22)', top: '-80px', left: '-80px' }}
        />
        <div
          className="aurora-blob w-80 h-80"
          style={{ background: 'rgba(59, 130, 246, 0.15)', top: '30%', right: '-60px', animationDelay: '5s' }}
        />
        <div
          className="aurora-blob w-72 h-72"
          style={{ background: 'rgba(236, 72, 153, 0.1)', bottom: '-40px', left: '35%', animationDelay: '9s' }}
        />

        {/* Galaxy spiral background art */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <GalaxySpiral className="w-full max-w-3xl opacity-15" />
        </div>

        {/* Left constellation */}
        <div
          className="absolute left-0 top-0 h-full w-2/5 pointer-events-none select-none hidden lg:flex items-center"
          style={{ opacity: 0.2 }}
        >
          <Constellation className="w-full max-w-md" />
        </div>

        {/* Right planet */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-72 xl:w-80 pointer-events-none select-none hidden lg:block"
          style={{ opacity: 0.22 }}
        >
          <PlanetWithRings className="w-full" />
        </div>

        {/* Nebula glow */}
        <div className="absolute inset-0 pointer-events-none select-none" style={{ opacity: 0.35 }}>
          <NebulaCloud className="w-full h-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Label badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-violet-300 tracking-widest uppercase text-xs font-semibold">Itio Space</span>
          </div>

          <h1 className="font-bold leading-[1.1] mb-8">
            <span
              className="block text-5xl sm:text-6xl md:text-8xl bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #ddd6fe 50%, #a78bfa 100%)' }}
            >
              A Digital Space
            </span>
            <span
              className="block text-3xl sm:text-4xl md:text-5xl mt-2 bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 40%, #67e8f9 100%)' }}
            >
              for Small Tribes Building Big Ideas
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed">
            A collaborative digital environment where people gather to share
            knowledge, build ideas, and contribute to meaningful projects.
          </p>
          <p className="text-gray-500 italic text-base mb-12">
            &ldquo;He kaha o te iti — The small have strength.&rdquo;
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/itio-space"
              onClick={handleGoToSpace}
              className="inline-block px-10 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 animate-pulse-glow"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                boxShadow: '0 0 40px rgba(139, 92, 246, 0.4), 0 4px 20px rgba(0,0,0,0.4)',
              }}
            >
              Enter the Space
            </Link>
            <a
              href="#explore"
              className="inline-block px-10 py-4 rounded-full border border-white/12 hover:border-violet-400/40 hover:bg-white/5 text-gray-300 font-semibold text-lg transition-all duration-300"
            >
              Explore ↓
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* Comet divider */}
      <div className="relative overflow-hidden h-16 pointer-events-none select-none" style={{ opacity: 0.5 }}>
        <CometTrail className="absolute top-1/2 -translate-y-1/2 w-full max-w-2xl left-1/2 -translate-x-1/2" />
      </div>

      {/* ===== WHAT HAPPENS ===== */}
      <section id="explore" className="relative py-32 px-6">
        {/* Section ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'rgba(139, 92, 246, 0.04)', filter: 'blur(100px)' }}
        />

        <div className="max-w-5xl mx-auto">
          <div className="scroll-reveal text-center mb-16">
            <p className="text-violet-400 tracking-widest uppercase text-xs mb-3 font-semibold">Core Activities</p>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #d1d5db 100%)' }}
            >
              What Happens in Itio Space
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Designed for thinking, building, and contributing. Instead of
              conversations disappearing in chat, knowledge becomes structured
              and preserved.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: HiOutlineLightBulb, title: 'Share Ideas', desc: 'Share ideas and insights with your tribe', color: '#a78bfa', glow: 'rgba(167,139,250,0.15)' },
              { icon: HiOutlineCode, title: 'Develop Projects', desc: 'Develop projects and experiments together', color: '#67e8f9', glow: 'rgba(103,232,249,0.12)' },
              { icon: HiOutlineUsers, title: 'Co-create Knowledge', desc: 'Co-create knowledge with others', color: '#34d399', glow: 'rgba(52,211,153,0.12)' },
              { icon: HiOutlineBookOpen, title: 'Document Discoveries', desc: 'Document discoveries and lessons learned', color: '#f472b6', glow: 'rgba(244,114,182,0.12)' },
              { icon: HiOutlineHeart, title: 'Contribute', desc: 'Contribute to community initiatives', color: '#fb923c', glow: 'rgba(251,146,60,0.12)' },
            ].map((item, i) => (
              <div
                key={item.title}
                className="scroll-reveal group relative p-6 rounded-2xl glass-card hover:border-white/15 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Hover radial glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${item.glow}, transparent 70%)` }}
                />

                {/* Icon with glow background */}
                <div
                  className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: item.glow, boxShadow: `0 0 20px ${item.glow}` }}
                >
                  <item.icon style={{ color: item.color, fontSize: '1.4rem' }} />
                </div>

                <h3 className="relative text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="relative text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reversed comet divider */}
      <div
        className="relative overflow-hidden h-16 pointer-events-none select-none"
        style={{ opacity: 0.35, transform: 'scaleX(-1)' }}
      >
        <CometTrail className="absolute top-1/2 -translate-y-1/2 w-full max-w-2xl left-1/2 -translate-x-1/2" />
      </div>

      {/* ===== KNOWLEDGE SPACE ===== */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="scroll-reveal text-center mb-16">
            <p className="text-cyan-400 tracking-widest uppercase text-xs mb-3 font-semibold">Living Artifacts</p>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #d1d5db 100%)' }}
            >
              A Knowledge Space Built for Collaboration
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Using a knowledge workspace powered by Anytype, every contribution
              becomes a living artifact.
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-16">
            {[
              { label: 'Ideas', color: '#a78bfa', glow: 'rgba(167,139,250,0.2)' },
              { label: 'Research Notes', color: '#67e8f9', glow: 'rgba(103,232,249,0.18)' },
              { label: 'Experiments', color: '#34d399', glow: 'rgba(52,211,153,0.18)' },
              { label: 'Prototypes', color: '#f472b6', glow: 'rgba(244,114,182,0.18)' },
              { label: 'Project Proposals', color: '#fb923c', glow: 'rgba(251,146,60,0.18)' },
              { label: 'Community Knowledge', color: '#fbbf24', glow: 'rgba(251,191,36,0.18)' },
            ].map((artifact, i) => (
              <div
                key={artifact.label}
                className="scroll-reveal-scale group relative p-5 rounded-xl glass-card text-center hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${artifact.glow}, transparent 70%)` }}
                />
                <div className="relative">
                  <div
                    className="w-2 h-2 rounded-full mx-auto mb-2"
                    style={{ background: artifact.color, boxShadow: `0 0 8px ${artifact.color}` }}
                  />
                  <p className="text-sm font-semibold" style={{ color: artifact.color }}>{artifact.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-reveal text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 text-base sm:text-xl font-light text-gray-300 p-5 sm:p-6 rounded-2xl glass-card">
              <span>Ideas connect</span>
              <span className="text-violet-400 font-bold">&rarr;</span>
              <span>Knowledge grows</span>
              <span className="text-violet-400 font-bold">&rarr;</span>
              <span>Projects emerge</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CIRCLE OF CONTRIBUTION ===== */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'rgba(139, 92, 246, 0.05)', filter: 'blur(80px)' }}
        />

        <div className="max-w-5xl mx-auto">
          <div className="scroll-reveal text-center mb-16">
            <p className="text-emerald-400 tracking-widest uppercase text-xs mb-3 font-semibold">Infinite Loop</p>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #d1d5db 100%)' }}
            >
              The Circle of Contribution
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Creation happens through a continuous cycle. An infinite
              collaboration loop where knowledge continuously evolves.
            </p>
          </div>

          {/* Pentagon arrangement */}
          <div className="scroll-reveal relative w-full max-w-md mx-auto" style={{ aspectRatio: '1 / 1' }}>
            {/* Spinning orbit rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg
                viewBox="0 0 200 200"
                className="w-3/4 h-3/4"
                style={{ opacity: 0.18, animation: 'spin 24s linear infinite' }}
              >
                <ellipse cx="100" cy="100" rx="95" ry="38" stroke="rgba(139,92,246,0.8)" strokeWidth="1" fill="none" strokeDasharray="5 4" />
                <ellipse cx="100" cy="100" rx="95" ry="38" stroke="rgba(139,92,246,0.4)" strokeWidth="0.6" fill="none" transform="rotate(40, 100, 100)" />
              </svg>
            </div>

            {/* Center hub */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(139,92,246,0.12)',
                boxShadow: '0 0 35px rgba(139,92,246,0.35)',
                border: '1px solid rgba(139,92,246,0.35)',
              }}
            >
              <HiOutlineArrowPath
                className="text-violet-400 text-2xl"
                style={{ animation: 'spin 9s linear infinite' }}
              />
            </div>

            {/* Steps */}
            {circleSteps.map((step, i) => {
              const pos = pentagonPositions[i]
              return (
                <div
                  key={step.label}
                  className="absolute flex flex-col items-center"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center gap-1 glass-card hover:scale-110 transition-transform duration-300 cursor-default"
                    style={{
                      border: `1px solid ${step.color}50`,
                      boxShadow: `0 0 22px ${step.glow}`,
                    }}
                  >
                    <step.icon style={{ color: step.color, fontSize: '1.4rem' }} />
                    <span className="text-[9px] sm:text-[11px] font-semibold" style={{ color: step.color }}>
                      {step.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Decorative orbit diagram */}
        <div
          className="absolute -right-16 top-1/2 -translate-y-1/2 w-64 pointer-events-none select-none hidden xl:block"
          style={{ opacity: 0.12 }}
        >
          <OrbitDiagram className="w-full" />
        </div>
        {/* Decorative reticle */}
        <div
          className="absolute -left-8 bottom-12 w-24 pointer-events-none select-none hidden lg:block"
          style={{ opacity: 0.14 }}
        >
          <SpaceReticle className="w-full" />
        </div>
      </section>

      {/* ===== SPACES FOR EXPLORATION ===== */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="scroll-reveal text-center mb-16">
            <p className="text-indigo-400 tracking-widest uppercase text-xs mb-3 font-semibold">Workshops</p>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #d1d5db 100%)' }}
            >
              Spaces for Exploration
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Different circles inside Itio Space focus on different areas of
              exploration. Each space becomes a workshop for collaboration and
              innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {spaces.map((space, i) => (
              <div
                key={space.name}
                className="scroll-reveal group relative p-8 rounded-2xl glass-card hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-8 right-8 h-[1.5px]"
                  style={{
                    background: `linear-gradient(to right, transparent, ${space.accent}, transparent)`,
                    borderRadius: '0 0 4px 4px',
                  }}
                />

                {/* Hover gradient wash */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${space.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                />

                {/* Inner glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ boxShadow: `inset 0 0 60px ${space.glow}` }}
                />

                <div className="relative">
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: space.glow, border: `1px solid ${space.accent}30` }}
                    >
                      <space.icon style={{ color: space.accent, fontSize: '1.4rem' }} />
                    </div>
                    <span
                      className="text-xs font-mono font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: space.glow,
                        color: space.accent,
                        border: `1px solid ${space.accent}30`,
                      }}
                    >
                      {space.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{space.name}</h3>
                  <p className="text-gray-400 leading-relaxed">{space.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative constellation */}
        <div
          className="absolute -left-20 bottom-0 w-80 pointer-events-none select-none hidden xl:block"
          style={{ opacity: 0.08 }}
        >
          <Constellation className="w-full" />
        </div>
      </section>

      {/* ===== LIVING KNOWLEDGE NETWORK ===== */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="scroll-reveal text-center mb-16">
            <p className="text-pink-400 tracking-widest uppercase text-xs mb-3 font-semibold">Network</p>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #d1d5db 100%)' }}
            >
              A Living Knowledge Network
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Unlike traditional platforms that only host discussions, Itio Space
              builds a persistent knowledge network. Over time, the community
              grows a living library of collective intelligence.
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-2 sm:grid-cols-4 gap-5">
            {[
              { label: 'Connected', icon: HiOutlineLink, color: '#a78bfa', glow: 'rgba(167,139,250,0.22)' },
              { label: 'Searchable', icon: HiOutlineMagnifyingGlass, color: '#67e8f9', glow: 'rgba(103,232,249,0.22)' },
              { label: 'Reusable', icon: HiOutlineArrowPath, color: '#34d399', glow: 'rgba(52,211,153,0.22)' },
              { label: 'Expandable', icon: HiOutlineArrowsPointingOut, color: '#f472b6', glow: 'rgba(244,114,182,0.22)' },
            ].map((item, i) => (
              <div
                key={item.label}
                className="scroll-reveal-scale group flex flex-col items-center gap-4 p-6 rounded-2xl glass-card hover:-translate-y-2 transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ background: item.glow, boxShadow: `0 0 28px ${item.glow}` }}
                >
                  <item.icon style={{ color: item.color, fontSize: '1.6rem' }} />
                </div>
                <span className="font-semibold text-base text-white">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ITIONIAN WAY ===== */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="scroll-reveal text-center mb-16">
            <p className="text-amber-400 tracking-widest uppercase text-xs mb-3 font-semibold">Philosophy</p>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #d1d5db 100%)' }}
            >
              Built for the Itionian Way
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Through curiosity, creativity, and contribution, members help
              shape a knowledge-driven future.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {philosophies.map((p, i) => (
              <div
                key={i}
                className="scroll-reveal group flex items-center gap-4 p-6 rounded-2xl glass-card hover:border-white/14 hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${p.color}22`, boxShadow: `0 0 15px ${p.color}22` }}
                >
                  <p.icon style={{ color: p.color, fontSize: '1.2rem' }} />
                </div>
                <span className="text-gray-200 font-medium leading-snug">{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA / JOIN ===== */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background glows */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'rgba(139, 92, 246, 0.1)', filter: 'blur(100px)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'rgba(59, 130, 246, 0.07)', filter: 'blur(120px)' }}
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="scroll-reveal">
            <div
              className="relative p-10 sm:p-14 rounded-3xl glass-card overflow-hidden"
              style={{ border: '1px solid rgba(139, 92, 246, 0.2)' }}
            >
              {/* Inner top glow */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.6), transparent)' }}
              />
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.12), transparent 65%)' }}
              />

              <div className="relative">
                <p className="text-violet-400 tracking-widest uppercase text-xs mb-4 font-semibold">Ready to Explore?</p>
                <h2
                  className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #ffffff 30%, #a78bfa 100%)' }}
                >
                  Join the Space
                </h2>
                <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
                  Itio Space welcomes builders, thinkers, creators, and explorers.
                  Whether you want to share knowledge, develop ideas, build
                  meaningful projects, or collaborate with others — there is a place
                  for you in the circle.
                </p>

                <div className="space-y-2 text-xl sm:text-2xl font-light text-gray-400 mb-12">
                  <p>Enter the Space.</p>
                  <p>Build with the tribe.</p>
                  <p
                    className="font-medium"
                    style={{ background: 'linear-gradient(135deg, #a78bfa, #67e8f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    Create the future together.
                  </p>
                </div>

                <Link
                  href="/itio-space"
                  onClick={handleGoToSpace}
                  className="inline-block px-12 py-5 rounded-full text-white font-semibold text-xl transition-all duration-300 animate-pulse-glow hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                    boxShadow: '0 0 50px rgba(139, 92, 246, 0.45), 0 8px 30px rgba(0,0,0,0.4)',
                  }}
                >
                  Enter the Space
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative planet */}
        <div
          className="absolute -right-24 bottom-0 w-72 pointer-events-none select-none hidden xl:block"
          style={{ opacity: 0.14 }}
        >
          <PlanetWithRings className="w-full" />
        </div>
        {/* Decorative reticle */}
        <div
          className="absolute left-8 top-12 w-20 pointer-events-none select-none hidden lg:block"
          style={{ opacity: 0.16 }}
        >
          <SpaceReticle className="w-full" />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-600 text-sm">
          <span className="text-gray-500 font-medium">Itio Space</span>
          <span className="font-mono text-gray-700 tracking-wide">v0.2.1</span>
          <span className="text-gray-600">Built for the Itionian way</span>
        </div>
      </footer>
    </main>
  )
}
