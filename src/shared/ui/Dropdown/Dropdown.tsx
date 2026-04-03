// src/shared/ui/Dropdown.tsx
import {type ReactNode, useEffect, useRef} from 'react'
import './dropdown.scss'

type Props = {
    open: boolean
    onClose: () => void
    children: ReactNode
}

export const Dropdown = ({ open, onClose, children }: Props) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClose()
            }
        }

        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [onClose])

    if (!open) return null

    return (
        <div ref={ref} className="dropdown"  onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    )
}
