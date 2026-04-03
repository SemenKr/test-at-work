import { useUsers } from '@/shared/api/users'
import { applyUserDraft } from '@/entities/user/utils'
import { useUserStore } from '@/store/userStore'
import { UserCard } from '@/features/user-card/UserCard'
import { useState } from 'react'
import { Loader } from '@/shared/ui'

export const UsersPage = () => {
    const { data, isLoading, isError } = useUsers()
    const { archived, hidden, editedUsers } = useUserStore()
    const [openMenuUserId, setOpenMenuUserId] = useState<number | null>(null)

    if (isLoading) return <Loader variant="users" />
    if (isError) return <div>Error loading users</div>
    const preparedUsers = data?.map((user) => applyUserDraft(user, editedUsers[user.id]))

    const activeUsers = preparedUsers?.filter(
        (u) => !archived.includes(u.id) && !hidden.includes(u.id)
    )

    const archivedUsers = preparedUsers?.filter((u) =>
        archived.includes(u.id)
    )

    return (
        <div className="page page--users">
            <div className="container">
                <div className="section">
                    <div className="section-title">Активные</div>
                    <div className="divider" />

                    <div className="grid">
                        {activeUsers?.map((user) => (
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
                </div>

                {Boolean(archivedUsers?.length) && (
                    <div className="section">
                        <div className="section-title">Архив</div>
                        <div className="divider" />

                        <div className="grid">
                            {archivedUsers?.map((user) => (
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
                    </div>
                )}
            </div>
        </div>
    )
}
