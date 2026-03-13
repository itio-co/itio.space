import { useEffect, useState } from 'react'

interface StarData {
  top: string
  left: string
  width: string
  height: string
  animationDelay: string
  animationDuration: string
  opacity: number
}

interface ShootingStarData {
  top: string
  animationDelay: string
  animationDuration: string
}

const TwinkleStars = () => {
  const [stars, setStars] = useState<StarData[]>([])
  const [shootingStars, setShootingStars] = useState<ShootingStarData[]>([])

  useEffect(() => {
    const sizes = [1, 1, 1, 1.5, 1.5, 2, 2, 2.5, 3]

    const generated: StarData[] = Array.from({ length: 160 }, () => {
      const size = sizes[Math.floor(Math.random() * sizes.length)]
      return {
        top: `${(Math.random() * 100).toFixed(2)}%`,
        left: `${(Math.random() * 100).toFixed(2)}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${(Math.random() * 5).toFixed(2)}s`,
        animationDuration: `${(Math.random() * 3 + 2).toFixed(2)}s`,
        opacity: parseFloat((Math.random() * 0.55 + 0.3).toFixed(2)),
      }
    })
    setStars(generated)

    const shooting: ShootingStarData[] = Array.from({ length: 6 }, () => ({
      top: `${(Math.random() * 55).toFixed(2)}%`,
      animationDelay: `${(Math.random() * 14).toFixed(2)}s`,
      animationDuration: `${(Math.random() * 2 + 3).toFixed(2)}s`,
    }))
    setShootingStars(shooting)
  }, [])

  return (
    <div className="twinkle-stars">
      {stars.map((star, i) => (
        <div
          key={i}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.width,
            height: star.height,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration,
            opacity: star.opacity,
          }}
        />
      ))}
      {shootingStars.map((s, i) => (
        <div
          key={`shoot-${i}`}
          className="shooting-star"
          style={{
            top: s.top,
            animationDelay: s.animationDelay,
            animationDuration: s.animationDuration,
          }}
        />
      ))}
    </div>
  )
}

export default TwinkleStars
