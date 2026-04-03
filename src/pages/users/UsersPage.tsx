import { useUsers } from '@/shared/api/users'
import { applyUserDraft, getArchivedUsers, getVisibleActiveUsers } from '@/entities/user/utils'
import {
    useArchivedUserIds,
    useEditedUsers,
    useHiddenUserIds,
    useResetUserState,
} from '@/store/userStore'
import { UserCard } from '@/features/user-card/UserCard'
import { useState } from 'react'
import { Loader } from '@/shared/ui'
import './users-page.scss'

export const UsersPage = () => {
    const { data, isLoading, isError, refetch, isFetching } = useUsers()
    const archived = useArchivedUserIds()
    const hidden = useHiddenUserIds()
    const editedUsers = useEditedUsers()
    const resetUserState = useResetUserState()
    const [openMenuUserId, setOpenMenuUserId] = useState<number | null>(null)
    const hasCustomState = archived.length > 0 || hidden.length > 0 || Object.keys(editedUsers).length > 0

    if (isLoading) return <Loader variant="users" />
    if (isError) {
        return (
            <section className="users-page">
                <div className="users-page__container">
                    <div className="users-page__status" role="alert">
                        <h1 className="users-page__status-title">Не удалось загрузить пользователей</h1>
                        <p className="users-page__status-text">
                            Проверь соединение или повтори запрос. Текущее состояние списка не обновилось.
                        </p>
                        <button
                            className="users-page__status-action"
                            type="button"
                            onClick={() => void refetch()}
                            disabled={isFetching}
                        >
                            Попробовать снова
                        </button>
                    </div>
                </div>
            </section>
        )
    }
    const preparedUsers = data?.map((user) => applyUserDraft(user, editedUsers[user.id])) ?? []

    const activeUsers = getVisibleActiveUsers(preparedUsers, archived, hidden)
    const archivedUsers = getArchivedUsers(preparedUsers, archived)

    return (
        <section className="users-page">
            <div className="users-page__container">
                <section className="users-page__section" aria-labelledby="active-users-title">
                    <div className="users-page__section-header">
                        <h1 className="users-page__section-title" id="active-users-title">
                            Активные
                        </h1>
                        {hasCustomState && (
                            <button
                                className="users-page__reset"
                                type="button"
                                onClick={() => {
                                    setOpenMenuUserId(null)
                                    resetUserState()
                                }}
                            >
                                Сбросить состояние
                            </button>
                        )}
                    </div>
                    <div className="users-page__divider" />

                    {activeUsers.length ? (
                        <div className="users-page__grid">
                            {activeUsers.map((user) => (
                                <UserCard
                                    key={user.id}
                                    user={user}
                                    isMenuOpen={openMenuUserId === user.id}
                                    onToggleMenu={(id) =>
                                        setOpenMenuUserId((currentId) => (currentId === id ? null : id))
                                    }
                                    onCloseMenu={() => setOpenMenuUserId(null)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="users-page__empty">
                            <div className="users-page__empty-title">Активных карточек пока нет</div>
                            <p className="users-page__empty-text">
                                Все пользователи скрыты или перенесены в архив. Верни карточку из архива, чтобы она
                                снова появилась в этом разделе.
                            </p>
                        </div>
                    )}
                </section>

                {Boolean(archivedUsers.length) && (
                    <section className="users-page__section" aria-labelledby="archived-users-title">
                        <h2 className="users-page__section-title" id="archived-users-title">
                            Архив
                        </h2>
                        <div className="users-page__divider" />

                        <div className="users-page__grid">
                            {archivedUsers.map((user) => (
                                <UserCard
                                    key={user.id}
                                    user={user}
                                    isArchived
                                    isMenuOpen={openMenuUserId === user.id}
                                    onToggleMenu={(id) =>
                                        setOpenMenuUserId((currentId) => (currentId === id ? null : id))
                                    }
                                    onCloseMenu={() => setOpenMenuUserId(null)}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </section>
    )
}
