import { SuccessModal } from '@/shared/ui/SuccessModal'
import { toUserDraft } from '@/entities/user/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, UserFormValues } from '@/entities/user/schema'
import { User } from '@/entities/user/types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store/userStore'
import './user-form.scss'

type Props = {
    user: User
}

export const UserForm = ({ user }: Props) => {
    const initialDraft = toUserDraft(user)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const { saveUser } = useUserStore()
    const fields: Array<{
        name: keyof UserFormValues
        label: string
        type?: 'text' | 'email'
    }> = [
        { name: 'name', label: 'Имя' },
        { name: 'username', label: 'Никнейм' },
        { name: 'email', label: 'Почта', type: 'email' },
        { name: 'city', label: 'Город' },
        { name: 'phone', label: 'Телефон' },
        { name: 'company', label: 'Название компании' },
    ]

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: initialDraft,
    })

    const onSubmit = (data: UserFormValues) => {
        saveUser(user.id, {
            ...data,
            phone: data.phone.replace(/\D/g, ''),
        })
        setOpen(true)
    }

    const handleCloseModal = () => {
        setOpen(false)
        navigate('/')
    }

    return (
        <div className="user-form">
            <form className="user-form__form" onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('avatar')} />

                <div className="user-form__grid">
                    {fields.map((field) => (
                        <label className="user-form__field" key={field.name}>
                            <span className="user-form__label">{field.label}</span>
                            <input
                                className={`user-form__input ${errors[field.name] ? 'user-form__input--error' : ''}`}
                                type={field.type ?? 'text'}
                                {...register(field.name)}
                            />
                            <span className="user-form__message">
                                {errors[field.name]?.message ?? ''}
                            </span>
                        </label>
                    ))}
                </div>

                <button className="user-form__submit" type="submit">
                    Сохранить
                </button>
            </form>

            {open && <SuccessModal onClose={handleCloseModal} />}
        </div>
    )
}
