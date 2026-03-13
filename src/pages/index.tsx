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
      { threshold: 0.15 }
    )

    const elements = node.querySelectorAll('.scroll-reveal, .scroll-reveal-scale')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return ref
}

const circleSteps = [
  { label: 'Idea', icon: HiOutlineLightBulb },
  { label: 'Proposal', icon: HiOutlineBookOpen },
  { label: 'Prototype', icon: HiOutlineBeaker },
  { label: 'Project', icon: HiOutlineRocketLaunch },
  { label: 'Contribution', icon: HiOutlineHeart },
]

const spaces = [
  {
    name: 'Itio Codex',
    desc: 'A shared library of ideas, philosophy, and knowledge.',
    icon: HiOutlineBookmarkSquare,
    color: 'from-violet-500/20 to-purple-600/20',
    border: 'border-violet-500/30',
  },
  {
    name: 'Yai Forge',
    desc: 'A place to design language specifications and technical ideas.',
    icon: HiOutlineCpuChip,
    color: 'from-cyan-500/20 to-blue-600/20',
    border: 'border-cyan-500/30',
  },
  {
    name: 'DevSpace Lab',
    desc: 'A sandbox for building and experimenting with software.',
    icon: HiOutlineCode,
    color: 'from-emerald-500/20 to-green-600/20',
    border: 'border-emerald-500/30',
  },
  {
    name: 'Omega Factory',
    desc: 'A space for simulation, systems thinking, and digital creation.',
    icon: HiOutlineCube,
    color: 'from-amber-500/20 to-orange-600/20',
    border: 'border-amber-500/30',
  },
]

const philosophies = [
  { text: 'Small tribes can create big change', icon: HiOutlineSparkles },
  { text: 'Knowledge should be shared', icon: HiOutlineGlobeAlt },
  { text: 'Technology should empower people', icon: HiOutlineBolt },
  { text: 'Collaboration multiplies impact', icon: HiOutlineUsers },
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
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        <TwinkleStars />

        {/* Space line art — left constellation */}
        <div className="absolute left-0 top-0 h-full w-2/5 pointer-events-none select-none hidden lg:flex items-center opacity-35">
          <Constellation className="w-full max-w-md" />
        </div>

        {/* Space line art — right planet */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 xl:w-80 pointer-events-none select-none hidden lg:block opacity-30">
          <PlanetWithRings className="w-full" />
        </div>

        {/* Nebula glow behind hero text */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-40">
          <NebulaCloud className="w-full h-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-violet-400 tracking-widest uppercase text-sm mb-6 font-medium">
            Itio Space
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-8 bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent">
            A Digital Space for Small Tribes Building Big Ideas
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed">
            A collaborative digital environment where people gather to share
            knowledge, build ideas, and contribute to meaningful projects.
          </p>
          <p className="text-gray-500 italic text-base mb-12">
            &ldquo;He kaha o te iti — The small have strength.&rdquo;
          </p>
          <Link
            href="/itio-space"
            onClick={handleGoToSpace}
            className="inline-block px-10 py-4 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-lg transition-all duration-300 animate-pulse-glow"
          >
            Enter the Space
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* Comet divider */}
      <div className="relative overflow-hidden h-16 pointer-events-none select-none opacity-60">
        <CometTrail className="absolute top-1/2 -translate-y-1/2 w-full max-w-2xl left-1/2 -translate-x-1/2" />
      </div>

      {/* ===== WHAT HAPPENS ===== */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="scroll-reveal text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              What Happens in Itio Space
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Designed for thinking, building, and contributing. Instead of
              conversations disappearing in chat, knowledge becomes structured
              and preserved.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: HiOutlineLightBulb, title: 'Share Ideas', desc: 'Share ideas and insights with your tribe' },
              { icon: HiOutlineCode, title: 'Develop Projects', desc: 'Develop projects and experiments together' },
              { icon: HiOutlineUsers, title: 'Co-create Knowledge', desc: 'Co-create knowledge with others' },
              { icon: HiOutlineBookOpen, title: 'Document Discoveries', desc: 'Document discoveries and lessons learned' },
              { icon: HiOutlineHeart, title: 'Contribute', desc: 'Contribute to community initiatives' },
            ].map((item, i) => (
              <div
                key={item.title}
                className="scroll-reveal group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-violet-500/40 transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <item.icon className="text-violet-400 text-3xl mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== KNOWLEDGE SPACE ===== */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="scroll-reveal text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              A Knowledge Space Built for Collaboration
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Using a knowledge workspace powered by Anytype, every contribution
              becomes a living artifact.
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-16">
            {[
              'Ideas',
              'Research Notes',
              'Experiments',
              'Prototypes',
              'Project Proposals',
              'Community Knowledge',
            ].map((artifact, i) => (
              <div
                key={artifact}
                className="scroll-reveal-scale p-5 rounded-xl bg-gradient-to-br from-violet-900/30 to-purple-900/20 border border-violet-500/20 text-center hover:border-violet-400/50 transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <p className="text-sm font-medium text-violet-200">{artifact}</p>
              </div>
            ))}
          </div>

          <div className="scroll-reveal text-center">
            <p className="text-2xl sm:text-3xl font-light text-gray-300">
              Ideas connect{' '}
              <span className="text-violet-400 mx-2">&rarr;</span> Knowledge
              grows <span className="text-violet-400 mx-2">&rarr;</span>{' '}
              Projects emerge
            </p>
          </div>
        </div>
      </section>

      {/* ===== CIRCLE OF CONTRIBUTION ===== */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="scroll-reveal text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              The Circle of Contribution
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Creation happens through a continuous cycle. An infinite
              collaboration loop where knowledge continuously evolves.
            </p>
          </div>

          <div className="scroll-reveal flex flex-wrap items-center justify-center gap-4 sm:gap-2">
            {circleSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 sm:gap-4">
                <div className="flex flex-col items-center gap-2 p-4 sm:p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-violet-900/20 hover:border-violet-500/40 transition-all duration-300 min-w-[100px]">
                  <step.icon className="text-violet-400 text-2xl sm:text-3xl" />
                  <span className="text-sm sm:text-base font-medium">{step.label}</span>
                </div>
                {i < circleSteps.length - 1 && (
                  <span className="text-violet-500 text-2xl hidden sm:block">&rarr;</span>
                )}
              </div>
            ))}
          </div>

          <div className="scroll-reveal flex justify-center mt-8">
            <HiOutlineArrowPath className="text-violet-500/60 text-4xl animate-spin" style={{ animationDuration: '8s' }} />
          </div>
        </div>

        {/* Decorative orbit diagram */}
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-64 opacity-12 pointer-events-none select-none hidden xl:block">
          <OrbitDiagram className="w-full" />
        </div>
        {/* Decorative reticle */}
        <div className="absolute -left-8 bottom-12 w-24 opacity-15 pointer-events-none select-none hidden lg:block">
          <SpaceReticle className="w-full" />
        </div>
      </section>

      {/* ===== SPACES FOR EXPLORATION ===== */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="scroll-reveal text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
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
                className={`scroll-reveal p-8 rounded-2xl bg-gradient-to-br ${space.color} border ${space.border} hover:scale-[1.02] transition-all duration-300`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <space.icon className="text-3xl mb-4 text-white/80" />
                <h3 className="text-2xl font-bold mb-3">{space.name}</h3>
                <p className="text-gray-300 leading-relaxed">{space.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative constellation bottom-left */}
        <div className="absolute -left-20 bottom-0 w-80 opacity-10 pointer-events-none select-none hidden xl:block">
          <Constellation className="w-full" />
        </div>
      </section>

      {/* ===== LIVING KNOWLEDGE NETWORK ===== */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="scroll-reveal text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              A Living Knowledge Network
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Unlike traditional platforms that only host discussions, Itio Space
              builds a persistent knowledge network. Over time, the community
              grows a living library of collective intelligence.
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: 'Connected', icon: HiOutlineLink },
              { label: 'Searchable', icon: HiOutlineMagnifyingGlass },
              { label: 'Reusable', icon: HiOutlineArrowPath },
              { label: 'Expandable', icon: HiOutlineArrowsPointingOut },
            ].map((item, i) => (
              <div
                key={item.label}
                className="scroll-reveal-scale flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-violet-900/20 transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <item.icon className="text-violet-400 text-3xl" />
                <span className="font-semibold text-lg">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ITIONIAN WAY ===== */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="scroll-reveal text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Built for the Itionian Way
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Through curiosity, creativity, and contribution, members help
              shape a knowledge-driven future.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {philosophies.map((p, i) => (
              <div
                key={i}
                className="scroll-reveal flex items-center gap-4 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p.icon className="text-violet-400 text-2xl flex-shrink-0" />
                <span className="text-lg">{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA / JOIN ===== */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <div className="scroll-reveal">
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">
              Join the Space
            </h2>
            <p className="text-gray-400 text-lg mb-12 leading-relaxed">
              Itio Space welcomes builders, thinkers, creators, and explorers.
              Whether you want to share knowledge, develop ideas, build
              meaningful projects, or collaborate with others — there is a place
              for you in the circle.
            </p>

            <div className="space-y-4 text-2xl sm:text-3xl font-light text-gray-300 mb-14">
              <p>Enter the Space.</p>
              <p>Build with the tribe.</p>
              <p className="text-violet-400 font-medium">
                Create the future together.
              </p>
            </div>

            <Link
              href="/itio-space"
              onClick={handleGoToSpace}
              className="inline-block px-12 py-5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xl transition-all duration-300 animate-pulse-glow"
            >
              Enter the Space
            </Link>
          </div>
        </div>

        {/* Decorative planet CTA */}
        <div className="absolute -right-24 bottom-0 w-72 opacity-15 pointer-events-none select-none hidden xl:block">
          <PlanetWithRings className="w-full" />
        </div>
        {/* Decorative reticle CTA */}
        <div className="absolute left-8 top-12 w-20 opacity-18 pointer-events-none select-none hidden lg:block">
          <SpaceReticle className="w-full" />
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-20" />
    </main>
  )
}
