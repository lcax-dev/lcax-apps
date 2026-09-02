import { useCallback, useEffect, type RefObject } from 'react'
import { useBeforeUnload, useBlocker } from 'react-router'

type DiscardGuardProps = {
  dirty: boolean
  allowLeaveRef?: RefObject<boolean>
}

export const DiscardGuard = ({ dirty, allowLeaveRef }: DiscardGuardProps) => {
  const blocker = useBlocker(() => {
    if (allowLeaveRef?.current) return false
    return dirty
  })

  useBeforeUnload(
    useCallback(
      (event) => {
        if (allowLeaveRef?.current || !dirty) return
        event.preventDefault()
      },
      [allowLeaveRef, dirty],
    ),
  )

  useEffect(() => {
    if (blocker.state !== 'blocked') return
    const confirmed = window.confirm('Discard unsaved changes?')
    if (confirmed) blocker.proceed()
    else blocker.reset()
  }, [blocker])

  return null
}
