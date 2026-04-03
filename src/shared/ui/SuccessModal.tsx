import { useEffect } from 'react'
import checkedBoxIcon from '@/assets/checked-box.png'
import closeIcon from '@/assets/close.svg'
import './success-modal.scss'

type Props = {
    onClose: () => void
}

export const SuccessModal = ({ onClose }: Props) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000)
        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div className="success-modal" onClick={onClose}>
            <div className="success-modal__card" onClick={(e) => e.stopPropagation()}>
                <button className="success-modal__close" type="button" onClick={onClose}>
                    <img className="success-modal__close-icon" src={closeIcon} alt="" aria-hidden="true" />
                </button>
                <img
                    className="success-modal__status-icon"
                    src={checkedBoxIcon}
                    alt=""
                    aria-hidden="true"
                />
                <div className="success-modal__title">Изменения сохранены!</div>
            </div>
        </div>
    )
}
