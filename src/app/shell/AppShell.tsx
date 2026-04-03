import { Link, Outlet, useMatch } from 'react-router-dom'
import { applyUserDraft, getDefaultAvatar } from '@/entities/user/utils'
import { useUser, useUsers } from '@/shared/api/users'
import { useUserStore } from '@/store/userStore'
import favoriteIcon from '@/assets/favorite.svg'
import logo from '@/assets/logo.png'
import notificationIcon from '@/assets/notification.svg'
import './app-shell.scss'

export const AppShell = () => {
  const editMatch = useMatch('/edit/:id')
  const { archived, hidden, editedUsers } = useUserStore()
  const { data: users } = useUsers()
  const { data: currentUser } = useUser(editMatch?.params.id ?? '')
  const preparedUsers = users?.map((user) => applyUserDraft(user, editedUsers[user.id]))
  const preparedCurrentUser = currentUser ? applyUserDraft(currentUser, editedUsers[currentUser.id]) : undefined

  const firstVisibleUser =
    preparedUsers?.find((user) => !archived.includes(user.id) && !hidden.includes(user.id)) ?? preparedUsers?.[0]
  const headerUser = preparedCurrentUser ?? firstVisibleUser

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div className="app-shell__container">
          <Link className="app-shell__brand" to="/" aria-label="Go to home page">
            <img className="app-shell__logo" src={logo} alt="at-work" />
          </Link>

          <div className="app-shell__actions">
            <button className="app-shell__icon-button" type="button" aria-label="Favorites">
              <img className="app-shell__icon" src={favoriteIcon} alt="" aria-hidden="true" />
            </button>
            <button className="app-shell__icon-button" type="button" aria-label="Notifications">
              <img className="app-shell__icon" src={notificationIcon} alt="" aria-hidden="true" />
            </button>
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
    </div>
  )
}
