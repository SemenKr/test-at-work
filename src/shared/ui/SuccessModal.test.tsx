import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { SuccessModal } from './SuccessModal'

describe('SuccessModal', () => {
  afterEach(() => {
    document.body.style.overflow = ''
    document.body.style.touchAction = ''
  })

  it('locks page scroll and restores it after unmount', () => {
    const onClose = vi.fn()
    const { unmount } = render(<SuccessModal onClose={onClose} />)

    expect(document.body.style.overflow).toBe('hidden')
    expect(document.body.style.touchAction).toBe('none')
    expect(screen.getByRole('button', { name: 'Закрыть уведомление' })).toHaveFocus()

    unmount()

    expect(document.body.style.overflow).toBe('')
    expect(document.body.style.touchAction).toBe('')
  })

  it('closes on Escape and backdrop click', () => {
    const onClose = vi.fn()
    render(<SuccessModal onClose={onClose} />)

    fireEvent.keyDown(document, { key: 'Escape' })
    fireEvent.click(screen.getByRole('dialog').parentElement as HTMLElement)

    expect(onClose).toHaveBeenCalledTimes(2)
  })
})
