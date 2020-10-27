import mousetrap from 'mousetrap'
import { useEffect, useRef } from 'react'

import 'mousetrap-global-bind'

const noop = () => {}

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(noop)

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval
  useEffect(() => {
    const tick = () => savedCallback.current()
    if (delay) {
      const id = setInterval(tick, delay)

      return () => clearInterval(id)
    }
  }, [delay])
}

export function useKey(key: string, action: () => void) {
  const actionRef = useRef(noop)
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

export function useBeforeUnload(handler: Function = () => {}) {
  if (process.env.NODE_ENV !== 'production' && typeof handler !== 'function') {
    throw new TypeError(`Expected "handler" to be a function, not ${typeof handler}.`)
  }

  const handlerRef = useRef(handler)

  // Remember the latest callback
  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  // Set up the before unload event
  useEffect(() => {
    const handleBeforeunload = (event: BeforeUnloadEvent) => {
      let returnValue

      if (typeof handlerRef.current === 'function') {
        returnValue = handlerRef.current(event)
      }

      if (event.defaultPrevented) {
        event.returnValue = ''
      }

      if (typeof returnValue === 'string') {
        event.returnValue = returnValue

        return returnValue
      }
    }

    window.addEventListener('beforeunload', handleBeforeunload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload)
    }
  }, [])
}
