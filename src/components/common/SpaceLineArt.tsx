import React from 'react'

/** A constellation of connected stars */
export const Constellation = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <filter id="star-glow-lg">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="star-glow-sm">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Constellation connecting lines */}
    <g stroke="rgba(139, 92, 246, 0.38)" strokeWidth="0.75">
      <line x1="80" y1="120" x2="150" y2="70" />
      <line x1="150" y1="70" x2="230" y2="95" />
      <line x1="230" y1="95" x2="305" y2="52" />
      <line x1="230" y1="95" x2="265" y2="168" />
      <line x1="150" y1="70" x2="172" y2="185" />
      <line x1="172" y1="185" x2="265" y2="168" />
      <line x1="172" y1="185" x2="118" y2="268" />
      <line x1="265" y1="168" x2="325" y2="238" />
      <line x1="118" y1="268" x2="205" y2="328" />
      <line x1="205" y1="328" x2="325" y2="238" />
      <line x1="80" y1="120" x2="40" y2="185" />
      <line x1="40" y1="185" x2="118" y2="268" />
    </g>

    {/* Primary constellation stars */}
    <g filter="url(#star-glow-lg)">
      <circle cx="150" cy="70" r="4.5" fill="rgba(221, 214, 254, 1)" />
      <circle cx="172" cy="185" r="5" fill="rgba(221, 214, 254, 1)" />
      <circle cx="230" cy="95" r="3.5" fill="rgba(196, 181, 253, 0.95)" />
      <circle cx="265" cy="168" r="3" fill="rgba(196, 181, 253, 0.9)" />
      <circle cx="325" cy="238" r="3.5" fill="rgba(167, 139, 250, 0.9)" />
      <circle cx="205" cy="328" r="2.5" fill="rgba(196, 181, 253, 0.85)" />
      <circle cx="118" cy="268" r="2.5" fill="rgba(196, 181, 253, 0.85)" />
      <circle cx="80" cy="120" r="3" fill="rgba(167, 139, 250, 0.9)" />
      <circle cx="40" cy="185" r="2" fill="rgba(167, 139, 250, 0.8)" />
      <circle cx="305" cy="52" r="2" fill="rgba(196, 181, 253, 0.8)" />
    </g>

    {/* Scattered background stars */}
    <g fill="rgba(255, 255, 255, 0.45)" filter="url(#star-glow-sm)">
      <circle cx="25" cy="45" r="1" />
      <circle cx="355" cy="75" r="0.8" />
      <circle cx="35" cy="215" r="1.2" />
      <circle cx="375" cy="305" r="0.8" />
      <circle cx="195" cy="25" r="1" />
      <circle cx="95" cy="360" r="0.8" />
      <circle cx="345" cy="178" r="1" />
      <circle cx="48" cy="318" r="0.7" />
      <circle cx="278" cy="358" r="1" />
      <circle cx="18" cy="148" r="0.6" />
      <circle cx="380" cy="378" r="0.8" />
      <circle cx="330" cy="340" r="0.6" />
      <circle cx="215" cy="250" r="0.7" />
      <circle cx="62" cy="62" r="0.8" />
    </g>
  </svg>
)

/** Planet with rings, moon, and orbit path */
export const PlanetWithRings = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 280 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="planet-body" cx="38%" cy="35%" r="65%">
        <stop offset="0%" stopColor="rgba(139, 92, 246, 0.75)" />
        <stop offset="55%" stopColor="rgba(109, 40, 217, 0.65)" />
        <stop offset="100%" stopColor="rgba(76, 29, 149, 0.55)" />
      </radialGradient>
      <radialGradient id="planet-outer-glow" cx="50%" cy="50%" r="50%">
        <stop offset="58%" stopColor="transparent" />
        <stop offset="100%" stopColor="rgba(139, 92, 246, 0.18)" />
      </radialGradient>
      <radialGradient id="moon-grad" cx="35%" cy="35%" r="60%">
        <stop offset="0%" stopColor="rgba(221, 214, 254, 0.9)" />
        <stop offset="100%" stopColor="rgba(167, 139, 250, 0.6)" />
      </radialGradient>
    </defs>

    {/* Outer atmospheric glow */}
    <circle cx="140" cy="140" r="92" fill="url(#planet-outer-glow)" />

    {/* Ring back half (behind planet) */}
    <ellipse cx="140" cy="158" rx="108" ry="30"
      stroke="rgba(139, 92, 246, 0.38)" strokeWidth="1.2" fill="none"
    />
    <ellipse cx="140" cy="158" rx="122" ry="35"
      stroke="rgba(139, 92, 246, 0.22)" strokeWidth="0.8" fill="none"
    />

    {/* Planet body */}
    <circle cx="140" cy="140" r="65" fill="url(#planet-body)" />

    {/* Surface band lines */}
    <ellipse cx="140" cy="140" rx="65" ry="18"
      stroke="rgba(167, 139, 250, 0.22)" strokeWidth="0.8" fill="none" />
    <ellipse cx="140" cy="126" rx="56" ry="13"
      stroke="rgba(167, 139, 250, 0.16)" strokeWidth="0.7" fill="none" />
    <ellipse cx="140" cy="154" rx="59" ry="11"
      stroke="rgba(167, 139, 250, 0.16)" strokeWidth="0.7" fill="none" />

    {/* Atmosphere highlight */}
    <ellipse cx="116" cy="116" rx="22" ry="14" fill="rgba(221, 214, 254, 0.07)" />

    {/* Ring front half (in front of planet) */}
    <path d="M 32 158 Q 140 198 248 158"
      stroke="rgba(167, 139, 250, 0.55)" strokeWidth="1.4" fill="none" />
    <path d="M 18 158 Q 140 208 262 158"
      stroke="rgba(139, 92, 246, 0.28)" strokeWidth="0.8" fill="none" />

    {/* Moon orbit path (dashed) */}
    <ellipse cx="140" cy="118" rx="102" ry="38"
      stroke="rgba(139, 92, 246, 0.14)" strokeWidth="0.8" fill="none"
      strokeDasharray="3 5" />

    {/* Moon */}
    <circle cx="242" cy="98" r="9" fill="url(#moon-grad)" />
    <ellipse cx="242" cy="98" rx="9" ry="3.5"
      stroke="rgba(139, 92, 246, 0.35)" strokeWidth="0.6" fill="none" />
  </svg>
)

/** Multi-orbit solar system diagram */
export const OrbitDiagram = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 320 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="sun-body" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(253, 224, 71, 0.95)" />
        <stop offset="100%" stopColor="rgba(251, 146, 60, 0.8)" />
      </radialGradient>
      <radialGradient id="sun-halo" cx="50%" cy="50%" r="50%">
        <stop offset="50%" stopColor="transparent" />
        <stop offset="100%" stopColor="rgba(253, 224, 71, 0.14)" />
      </radialGradient>
    </defs>

    {/* Sun halo */}
    <circle cx="160" cy="160" r="46" fill="url(#sun-halo)" />

    {/* Orbit ellipses */}
    <ellipse cx="160" cy="160" rx="56" ry="22"
      stroke="rgba(139, 92, 246, 0.22)" strokeWidth="0.8" fill="none" />
    <ellipse cx="160" cy="160" rx="92" ry="37"
      stroke="rgba(139, 92, 246, 0.18)" strokeWidth="0.8" fill="none" />
    <ellipse cx="160" cy="160" rx="128" ry="52"
      stroke="rgba(139, 92, 246, 0.14)" strokeWidth="0.8" fill="none"
      strokeDasharray="3 3" />
    <ellipse cx="160" cy="160" rx="150" ry="62"
      stroke="rgba(139, 92, 246, 0.1)" strokeWidth="0.8" fill="none"
      strokeDasharray="2 4" />

    {/* Asteroid belt */}
    <ellipse cx="160" cy="160" rx="110" ry="44"
      stroke="rgba(156, 163, 175, 0.18)" strokeWidth="1" fill="none"
      strokeDasharray="1 5" />

    {/* Central sun */}
    <circle cx="160" cy="160" r="15" fill="url(#sun-body)" />
    <circle cx="160" cy="160" r="20" fill="rgba(253, 224, 71, 0.1)" />

    {/* Planet 1 — innermost */}
    <circle cx="216" cy="160" r="6" fill="rgba(99, 179, 237, 0.88)" />

    {/* Planet 2 — mid orbit with ring */}
    <circle cx="160" cy="123" r="8.5" fill="rgba(167, 139, 250, 0.9)" />
    <ellipse cx="160" cy="123" rx="15" ry="4.5"
      stroke="rgba(139, 92, 246, 0.55)" strokeWidth="0.9" fill="none" />

    {/* Planet 3 — outer orbit */}
    <circle cx="288" cy="160" r="7" fill="rgba(245, 158, 11, 0.85)" />

    {/* Planet 4 — outermost */}
    <circle cx="160" cy="98" r="5" fill="rgba(52, 211, 153, 0.85)" />
  </svg>
)

/** Comet with trailing tail */
export const CometTrail = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 420 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="tail-main" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
        <stop offset="100%" stopColor="rgba(221, 214, 254, 0.88)" />
      </linearGradient>
      <linearGradient id="tail-sub" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
        <stop offset="100%" stopColor="rgba(167, 139, 250, 0.45)" />
      </linearGradient>
      <filter id="comet-head-glow">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Main tail */}
    <line x1="0" y1="40" x2="372" y2="40"
      stroke="url(#tail-main)" strokeWidth="1.8" />
    {/* Upper secondary tail */}
    <line x1="60" y1="40" x2="372" y2="30"
      stroke="url(#tail-sub)" strokeWidth="0.9" />
    {/* Lower secondary tail */}
    <line x1="60" y1="40" x2="372" y2="50"
      stroke="url(#tail-sub)" strokeWidth="0.9" />
    {/* Wisp tails */}
    <line x1="130" y1="40" x2="372" y2="24"
      stroke="url(#tail-sub)" strokeWidth="0.4" opacity="0.55" />
    <line x1="130" y1="40" x2="372" y2="56"
      stroke="url(#tail-sub)" strokeWidth="0.4" opacity="0.55" />

    {/* Comet head */}
    <circle cx="380" cy="40" r="5.5" fill="rgba(221, 214, 254, 0.96)"
      filter="url(#comet-head-glow)" />
    <circle cx="380" cy="40" r="10" fill="rgba(167, 139, 250, 0.28)" />
  </svg>
)

/** Nebula cloud with layered glows and scattered stars */
export const NebulaCloud = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 500 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="nb-violet" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(139, 92, 246, 0.18)" />
        <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
      </radialGradient>
      <radialGradient id="nb-blue" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(59, 130, 246, 0.14)" />
        <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
      </radialGradient>
      <radialGradient id="nb-pink" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(236, 72, 153, 0.1)" />
        <stop offset="100%" stopColor="rgba(236, 72, 153, 0)" />
      </radialGradient>
    </defs>

    {/* Cloud layers */}
    <ellipse cx="220" cy="160" rx="190" ry="115" fill="url(#nb-violet)" />
    <ellipse cx="300" cy="120" rx="150" ry="95" fill="url(#nb-blue)" />
    <ellipse cx="170" cy="195" rx="130" ry="85" fill="url(#nb-pink)" />
    <ellipse cx="250" cy="155" rx="100" ry="70" fill="url(#nb-violet)" />

    {/* Nebula wisps */}
    <path d="M 60 200 Q 140 130 240 155 Q 330 178 410 115"
      stroke="rgba(139, 92, 246, 0.16)" strokeWidth="0.8" fill="none" />
    <path d="M 80 220 Q 180 170 270 190 Q 350 205 430 155"
      stroke="rgba(99, 102, 241, 0.12)" strokeWidth="0.6" fill="none" />
    <path d="M 50 150 Q 150 100 260 130 Q 360 155 450 100"
      stroke="rgba(167, 139, 250, 0.1)" strokeWidth="0.6" fill="none" />

    {/* Stars within the nebula */}
    <g fill="rgba(255, 255, 255, 0.7)">
      <circle cx="130" cy="108" r="1.3" />
      <circle cx="215" cy="85" r="0.9" />
      <circle cx="305" cy="130" r="1.6" />
      <circle cx="175" cy="195" r="1.1" />
      <circle cx="258" cy="168" r="0.9" />
      <circle cx="110" cy="172" r="0.7" />
      <circle cx="340" cy="108" r="1.1" />
      <circle cx="192" cy="232" r="0.9" />
      <circle cx="278" cy="215" r="1.3" />
      <circle cx="400" cy="140" r="0.8" />
      <circle cx="88" cy="238" r="0.7" />
    </g>
  </svg>
)

/** Simple crosshair / targeting reticle */
export const SpaceReticle = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Outer dashed ring */}
    <circle cx="60" cy="60" r="52"
      stroke="rgba(139, 92, 246, 0.3)" strokeWidth="0.8"
      strokeDasharray="4 4" />
    {/* Inner ring */}
    <circle cx="60" cy="60" r="32"
      stroke="rgba(139, 92, 246, 0.45)" strokeWidth="0.8" />
    {/* Cross lines */}
    <line x1="60" y1="8" x2="60" y2="26"
      stroke="rgba(167, 139, 250, 0.6)" strokeWidth="0.8" />
    <line x1="60" y1="94" x2="60" y2="112"
      stroke="rgba(167, 139, 250, 0.6)" strokeWidth="0.8" />
    <line x1="8" y1="60" x2="26" y2="60"
      stroke="rgba(167, 139, 250, 0.6)" strokeWidth="0.8" />
    <line x1="94" y1="60" x2="112" y2="60"
      stroke="rgba(167, 139, 250, 0.6)" strokeWidth="0.8" />
    {/* Center dot */}
    <circle cx="60" cy="60" r="3" fill="rgba(167, 139, 250, 0.8)" />
    <circle cx="60" cy="60" r="6" fill="rgba(139, 92, 246, 0.18)" />
  </svg>
)
