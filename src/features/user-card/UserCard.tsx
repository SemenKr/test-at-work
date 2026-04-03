import { Dropdown } from '@/shared/ui'
import { getDefaultAvatar } from '@/entities/user/utils'
import { User } from '@/entities/user/types'
import { useUserStore } from '@/store/userStore'
import { useNavigate } from 'react-router-dom'
import './user-card.scss'

type Props = {
    user: User
    isArchived?: boolean
    isMenuOpen: boolean
    onToggleMenu: (id: number) => void
    onCloseMenu: () => void
}

export const UserCard = ({
    user,
    isArchived,
    isMenuOpen,
    onToggleMenu,
    onCloseMenu,
}: Props) => {
    const navigate = useNavigate()
    const { archiveUser, unarchiveUser, hideUser } = useUserStore()
    const photoUrl = user.avatar ?? getDefaultAvatar(user.id)

    const handleEdit = () => {
        onCloseMenu()
        navigate(`/edit/${user.id}`)
    }

    const handleArchive = () => {
        onCloseMenu()
        archiveUser(user.id)
    }

    const handleHide = () => {
        onCloseMenu()
        hideUser(user.id)
    }

    const handleRestore = () => {
        onCloseMenu()
        unarchiveUser(user.id)
    }

    return (
        <article
            className={[
                'user-card',
                isArchived ? 'user-card--archived' : '',
                isMenuOpen ? 'user-card--menu-open' : '',
            ]
                .filter(Boolean)
                .join(' ')}
        >
            <img
                className="user-card__avatar"
                src={photoUrl}
                alt={user.name}
                loading="lazy"
            />

            <div className="user-card__body">
                <div className="user-card__header">
                    <div className="user-card__content">
                        <div className="user-card__username" title={user.username}>
                            {user.username}
                        </div>
                        <div className="user-card__company" title={user.company.name}>
                            {user.company.name}
                        </div>
                    </div>

                    <button
                        className="user-card__menu"
                        type="button"
                        aria-label="Open actions"
                        aria-expanded={isMenuOpen}
                        onClick={(e) => {
                            e.stopPropagation()
                            onToggleMenu(user.id)
                        }}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>

                <div className="user-card__city" title={user.address.city}>
                    {user.address.city}
                </div>
            </div>

            <Dropdown open={isMenuOpen} onClose={onCloseMenu}>
                {!isArchived ? (
                    <>
                        <button className="dropdown__item" type="button" onClick={handleEdit}>
                            Редактировать
                        </button>

                        <button className="dropdown__item" type="button" onClick={handleArchive}>
                            Архивировать
                        </button>

                        <button className="dropdown__item" type="button" onClick={handleHide}>
                            Скрыть
                        </button>
                    </>
                ) : (
                    <button className="dropdown__item" type="button" onClick={handleRestore}>
                        Активировать
                    </button>
                )}
            </Dropdown>
        </article>
    )
}
