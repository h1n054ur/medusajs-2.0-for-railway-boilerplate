import { useState, useCallback } from 'react'

export interface ToggleState {
  state: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export function useToggleState(defaultState: boolean = false): ToggleState {
  const [state, setState] = useState(defaultState)

  const open = useCallback(() => {
    setState(true)
  }, [])

  const close = useCallback(() => {
    setState(false)
  }, [])

  const toggle = useCallback(() => {
    setState((prev) => !prev)
  }, [])

  return {
    state,
    open,
    close,
    toggle,
  }
}