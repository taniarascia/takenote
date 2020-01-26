import mousetrap from 'mousetrap'
import { useEffect, useRef } from 'react'

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
    if (delay) {
      const id = setInterval(tick, delay)

      return () => clearInterval(id)
    }
  }, [delay])
}

export function useKey(key: string, action: () => void) {
  let actionRef = useRef(noop)
  actionRef.current = action

  useEffect(() => {
    mousetrap.bindGlobal(key, (event: Event) => {
      event.preventDefault()
      if (actionRef.current) {
        actionRef.current()
      }
    })
    return () => mousetrap.unbind(key)
  }, [key])
}
