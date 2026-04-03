import { fireEvent, render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { Dropdown } from './Dropdown'

const renderDropdown = (onClose = vi.fn()) => {
  const triggerRef = createRef<HTMLButtonElement>()
  const view = render(
    <div>
      <button ref={triggerRef} type="button">
        trigger
      </button>
      <Dropdown
        open
        menuId="menu"
        labelledBy="trigger-id"
        onClose={onClose}
        triggerRef={triggerRef}
      >
        <button role="menuitem" type="button">
          Edit
        </button>
        <button role="menuitem" type="button">
          Archive
        </button>
      </Dropdown>
    </div>
  )

  return { onClose, triggerRef, ...view }
}

describe('Dropdown', () => {
  it('moves focus inside menu and supports arrow navigation', () => {
    renderDropdown()

    const items = screen.getAllByRole('menuitem')
    expect(items[0]).toHaveFocus()

    fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowDown' })
    expect(items[1]).toHaveFocus()

    fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowUp' })
    expect(items[0]).toHaveFocus()
  })

  it('closes on Escape and outside click, restoring focus to trigger', () => {
    const { onClose, triggerRef } = renderDropdown()

    triggerRef.current?.focus()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(triggerRef.current).toHaveFocus()

    fireEvent.mouseDown(document.body)
    expect(onClose).toHaveBeenCalledTimes(2)
  })
})
