// src/shared/ui/Dropdown.tsx
import { type ReactNode, type RefObject, useEffect, useRef } from 'react'
import './dropdown.scss'

type Props = {
    open: boolean
    menuId: string
    labelledBy: string
    onClose: () => void
    triggerRef: RefObject<HTMLButtonElement | null>
    children: ReactNode
}

const MENU_ITEM_SELECTOR = '[role="menuitem"]'

export const Dropdown = ({ open, menuId, labelledBy, onClose, triggerRef, children }: Props) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) {
            return
        }

        const menu = ref.current
        const firstItem = menu?.querySelector<HTMLElement>(MENU_ITEM_SELECTOR)
        firstItem?.focus()

        const handlePointerDown = (event: MouseEvent | PointerEvent) => {
            const target = event.target as Node

            if (menu?.contains(target) || triggerRef.current?.contains(target)) {
                return
            }

            onClose()
        }

        const handleDocumentKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') {
                return
            }

            event.preventDefault()
            onClose()
            triggerRef.current?.focus()
        }

        document.addEventListener('mousedown', handlePointerDown)
        document.addEventListener('keydown', handleDocumentKeyDown)

        return () => {
            document.removeEventListener('mousedown', handlePointerDown)
            document.removeEventListener('keydown', handleDocumentKeyDown)
        }
    }, [open, onClose, triggerRef])

    if (!open) return null

    const moveFocus = (direction: 'next' | 'prev' | 'first' | 'last') => {
        const items = ref.current?.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR)

        if (!items?.length) {
            return
        }

        const elements = Array.from(items)
        const activeIndex = elements.findIndex((item) => item === document.activeElement)

        if (direction === 'first') {
            elements[0]?.focus()
            return
        }

        if (direction === 'last') {
            elements[elements.length - 1]?.focus()
            return
        }

        const fallbackIndex = direction === 'next' ? 0 : elements.length - 1
        const currentIndex = activeIndex === -1 ? fallbackIndex : activeIndex
        const delta = direction === 'next' ? 1 : -1
        const nextIndex = (currentIndex + delta + elements.length) % elements.length

        elements[nextIndex]?.focus()
    }

    return (
        <div
            ref={ref}
            id={menuId}
            className="dropdown"
            role="menu"
            aria-labelledby={labelledBy}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
                switch (event.key) {
                    case 'ArrowDown':
                        event.preventDefault()
                        moveFocus('next')
                        break
                    case 'ArrowUp':
                        event.preventDefault()
                        moveFocus('prev')
                        break
                    case 'Home':
                        event.preventDefault()
                        moveFocus('first')
                        break
                    case 'End':
                        event.preventDefault()
                        moveFocus('last')
                        break
                    default:
                        break
                }
            }}
        >
            {children}
        </div>
    )
}
