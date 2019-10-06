import { useEffect, useRef } from 'react'
import mousetrap from 'mousetrap'
import 'mousetrap-global-bind'

const noop = () => {}

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(noop)

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    const tick = () => savedCallback.current()
    if (delay !== null) {
      const id = setInterval(tick, delay)

      return () => clearInterval(id)
    }
  }, [delay])
}

export function useKey(key: string, handlerCallback: () => void) {
  let actionRef = useRef(noop)
  actionRef.current = handlerCallback

  useEffect(() => {
    mousetrap.bindGlobal(key, () => {
      if (!actionRef.current) return
      actionRef.current()
    })
    return () => mousetrap.unbind(key)
  }, [key])
}
