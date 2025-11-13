import { useEffect, useRef } from 'react'

export const useAnimation = (callback, dependencies = []) => {
  const frameRef = useRef()
  const lastTimeRef = useRef()

  const animate = (time) => {
    if (lastTimeRef.current !== undefined) {
      const delta = time - lastTimeRef.current
      callback(delta)
    }
    lastTimeRef.current = time
    frameRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, dependencies)
}