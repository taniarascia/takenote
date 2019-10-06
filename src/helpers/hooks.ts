import { useEffect, useRef } from 'react'

const noop = () => {}

export function useInterval(callback: () => void, delay: number | null, immediate?: boolean) {
  const savedCallback = useRef(noop)

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  })

  // Execute callback if immediate is set.
  useEffect(() => {
    if (!immediate) return
    if (delay === null) return

    savedCallback.current()
  }, [immediate])

  // Set up the interval.
  useEffect(() => {
    if (delay === null) return undefined
    const tick = () => savedCallback.current()
    const id = setInterval(tick, delay)

    return () => clearInterval(id)
  }, [delay])
}

export default useInterval
