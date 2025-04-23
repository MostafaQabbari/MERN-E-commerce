import React, { useEffect, useState } from 'react'

const images = [
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
  'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff'
]

export default function Slider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full overflow-hidden relative h-[27.3rem]">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={`${src}?auto=format&fit=crop&w=1920&h=873&q=80`}
          alt={`Slide ${idx}`}
          className={`w-[140%] h-[140%] object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  )
}
