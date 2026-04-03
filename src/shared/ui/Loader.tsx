import './loader.scss'

type LoaderProps = {
    variant?: 'users' | 'edit'
}

const userCards = Array.from({ length: 6 }, (_, index) => index)
const menuItems = Array.from({ length: 4 }, (_, index) => index)
const formFields = Array.from({ length: 6 }, (_, index) => index)

export const Loader = ({ variant = 'users' }: LoaderProps) => {
    if (variant === 'edit') {
        return (
            <div className="loader loader--edit" role="status" aria-live="polite" aria-busy="true">
                <span className="loader__sr-only">Загрузка страницы редактирования пользователя</span>
                <div className="loader__edit-container" aria-hidden="true">
                    <div className="loader__back" />

                    <div className="loader__edit-layout">
                        <div className="loader__sidebar-card">
                            <div className="loader__sidebar-image" />

                            <div className="loader__menu">
                                {menuItems.map((item) => (
                                    <div className="loader__menu-item" key={item} />
                                ))}
                            </div>
                        </div>

                        <div className="loader__form-card">
                            <div className="loader__title" />
                            <div className="loader__divider" />

                            <div className="loader__fields">
                                {formFields.map((field) => (
                                    <div className="loader__field" key={field}>
                                        <div className="loader__field-label" />
                                        <div className="loader__field-input" />
                                    </div>
                                ))}
                            </div>

                            <div className="loader__button" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="loader loader--users" role="status" aria-live="polite" aria-busy="true">
            <span className="loader__sr-only">Загрузка списка пользователей</span>
            <div className="loader__users-container" aria-hidden="true">
                <div className="loader__users-section">
                    <div className="loader__section-title" />
                    <div className="loader__users-divider" />

                    <div className="loader__users-grid">
                        {userCards.map((card) => (
                            <div className="loader__user-card" key={card}>
                                <div className="loader__user-image" />
                                <div className="loader__user-body">
                                    <div className="loader__user-top">
                                        <div className="loader__user-text">
                                            <div className="loader__user-name" />
                                            <div className="loader__user-company" />
                                        </div>
                                        <div className="loader__user-menu" />
                                    </div>
                                    <div className="loader__user-city" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
