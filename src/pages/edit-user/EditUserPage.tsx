import { useParams, useNavigate } from 'react-router-dom'
import { useUser } from '@/shared/api/users'
import { applyUserDraft, getDefaultAvatar } from '@/entities/user/utils'
import { UserForm } from '@/features/user-form/UserForm'
import { useUserStore } from '@/store/userStore'
import arrowLeftIcon from '@/assets/arrow-left.svg'
import { Loader } from '@/shared/ui'
import './edit-user.scss'

export const EditUserPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { editedUsers } = useUserStore()
    const { data, isLoading } = useUser(id!)

    if (isLoading) return <Loader variant="edit" />
    if (!data) return <div>Error</div>
    const preparedUser = applyUserDraft(data, editedUsers[data.id])

    return (
        <div className="edit-user-page">
            <div className="edit-user-page__container">
                <button className="edit-user-page__back" type="button" onClick={() => navigate(-1)}>
                    <img className="edit-user-page__back-icon" src={arrowLeftIcon} alt="" aria-hidden="true" />
                    <span>Назад</span>
                </button>

                <div className="edit-user-page__wrapper">
                    <aside className="edit-user-page__sidebar">
                        <img
                            className="edit-user-page__avatar"
                            src={preparedUser.avatar ?? getDefaultAvatar(preparedUser.id)}
                            alt={preparedUser.name}
                        />

                        <nav className="edit-user-page__menu">
                            <div className="edit-user-page__menu-item edit-user-page__menu-item--active">
                                Данные профиля
                            </div>
                            <div className="edit-user-page__menu-item">Рабочее пространство</div>
                            <div className="edit-user-page__menu-item">Приватность</div>
                            <div className="edit-user-page__menu-item">Безопасность</div>
                        </nav>
                    </aside>

                    <section className="edit-user-page__content">
                        <div className="edit-user-page__title">Данные профиля</div>
                        <div className="edit-user-page__divider" />

                        <UserForm user={preparedUser} />
                    </section>
                </div>
            </div>
        </div>
    )
}
