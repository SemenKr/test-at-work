import { Link, Outlet, useMatch } from 'react-router-dom'
import { applyUserDraft, getDefaultAvatar, getVisibleActiveUsers } from '@/entities/user/utils'
import { useUser, useUsers } from '@/shared/api/users'
import { useArchivedUserIds, useEditedUsers, useHiddenUserIds } from '@/store/userStore'
import favoriteIcon from '@/assets/favorite.svg'
import logo from '@/assets/logo.png'
import mailIcon from '@/assets/mail.svg'
import notificationIcon from '@/assets/notification.svg'
import telegramIcon from '@/assets/telegram.svg'
import './app-shell.scss'

const AUTHOR_NAME = 'Semen Kr'
const TELEGRAM_URL = 'https://t.me/SemenKrekotun'
const EMAIL_URL = 'mailto:samkrekotyn@gmail.com'

export const AppShell = () => {
    const editMatch = useMatch('/edit/:id')
    const archived = useArchivedUserIds()
    const hidden = useHiddenUserIds()
    const editedUsers = useEditedUsers()
    const { data: users } = useUsers({ enabled: !editMatch })
    const { data: currentUser } = useUser(editMatch?.params.id ?? '')
    const preparedUsers = users?.map((user) => applyUserDraft(user, editedUsers[user.id])) ?? []
    const preparedCurrentUser = currentUser ? applyUserDraft(currentUser, editedUsers[currentUser.id]) : undefined
    const visibleUsers = getVisibleActiveUsers(preparedUsers, archived, hidden)

    const firstVisibleUser = visibleUsers[0] ?? preparedUsers[0]
    const headerUser = preparedCurrentUser ?? firstVisibleUser

    return (
        <div className="app-shell">
            <header className="app-shell__header">
                <div className="app-shell__container">
                    <Link className="app-shell__brand" to="/" aria-label="Go to home page">
                        <img className="app-shell__logo" src={logo} alt="at-work" />
                    </Link>

                    <div className="app-shell__actions">
                        <span className="app-shell__icon-badge" aria-hidden="true">
                            <img className="app-shell__icon" src={favoriteIcon} alt="" aria-hidden="true" />
                        </span>
                        <span className="app-shell__icon-badge" aria-hidden="true">
                            <img className="app-shell__icon" src={notificationIcon} alt="" aria-hidden="true" />
                        </span>
                        <div className="app-shell__profile">
                            {headerUser ? (
                                <img
                                    className="app-shell__avatar-image"
                                    src={headerUser.avatar ?? getDefaultAvatar(headerUser.id)}
                                    alt={headerUser.username}
                                />
                            ) : (
                                <span className="app-shell__avatar">I</span>
                            )}
                            <span className="app-shell__profile-name">{headerUser?.username ?? 'Ivan1234'}</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="app-shell__content">
                <Outlet />
            </main>

            <footer className="app-shell__footer">
                <div className="app-shell__container app-shell__container--footer">
                    <div className="app-shell__footer-copy">Автор: {AUTHOR_NAME}</div>
                    <div className="app-shell__footer-links" aria-label="Ссылки автора">
                        <a
                            className="app-shell__footer-link"
                            href={TELEGRAM_URL}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Telegram"
                        >
                            <img className="app-shell__footer-link-icon" src={telegramIcon} alt="" aria-hidden="true" />
                        </a>
                        <a className="app-shell__footer-link" href={EMAIL_URL} aria-label="Email">
                            <img className="app-shell__footer-link-icon" src={mailIcon} alt="" aria-hidden="true" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
