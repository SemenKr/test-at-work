import { useEffect, useId, useRef } from 'react'
import checkedBoxIcon from '@/assets/checked-box.png'
import closeIcon from '@/assets/close.svg'
import './success-modal.scss'

type Props = {
    onClose: () => void
}

export const SuccessModal = ({ onClose }: Props) => {
    const titleId = useId()
    const cardRef = useRef<HTMLDivElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const timer = setTimeout(onClose, 4000)
        return () => clearTimeout(timer)
    }, [onClose])

    useEffect(() => {
        const { body } = document
        const previousOverflow = body.style.overflow
        const previousTouchAction = body.style.touchAction

        body.style.overflow = 'hidden'
        body.style.touchAction = 'none'

        return () => {
            body.style.overflow = previousOverflow
            body.style.touchAction = previousTouchAction
        }
    }, [])

    useEffect(() => {
        const previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null
        closeButtonRef.current?.focus()

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault()
                onClose()
                return
            }

            if (event.key !== 'Tab' || !cardRef.current) {
                return
            }

            const focusableElements = cardRef.current.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )

            if (!focusableElements.length) {
                event.preventDefault()
                return
            }

            const elements = Array.from(focusableElements).filter((element) => !element.hasAttribute('disabled'))
            const firstElement = elements[0]
            const lastElement = elements[elements.length - 1]

            if (!firstElement || !lastElement) {
                return
            }

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault()
                lastElement.focus()
            }

            if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault()
                firstElement.focus()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            previousActiveElement?.focus()
        }
    }, [onClose])

    return (
        <div className="success-modal" onClick={onClose}>
            <div
                ref={cardRef}
                className="success-modal__card"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    ref={closeButtonRef}
                    className="success-modal__close"
                    type="button"
                    aria-label="Закрыть уведомление"
                    onClick={onClose}
                >
                    <img className="success-modal__close-icon" src={closeIcon} alt="" aria-hidden="true" />
                </button>
                <img
                    className="success-modal__status-icon"
                    src={checkedBoxIcon}
                    alt=""
                    aria-hidden="true"
                />
                <div id={titleId} className="success-modal__title">
                    Изменения сохранены!
                </div>
            </div>
        </div>
    )
}
