import { SuccessModal } from '@/shared/ui/SuccessModal'
import { toUserDraft } from '@/entities/user/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, UserFormValues } from '@/entities/user/schema'
import { User } from '@/entities/user/types'
import { useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store/userStore'
import './user-form.scss'

type Props = {
    user: User
}

export const UserForm = ({ user }: Props) => {
    const initialDraft = toUserDraft(user)
    const formId = useId()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const { saveUser } = useUserStore()
    const fields: Array<{
        name: keyof UserFormValues
        label: string
        type?: 'text' | 'email' | 'tel'
        autoComplete?: string
        inputMode?: 'text' | 'email' | 'tel'
    }> = [
        { name: 'name', label: 'Имя', autoComplete: 'name' },
        { name: 'username', label: 'Никнейм', autoComplete: 'username' },
        { name: 'email', label: 'Почта', type: 'email', autoComplete: 'email', inputMode: 'email' },
        { name: 'city', label: 'Город', autoComplete: 'address-level2' },
        { name: 'phone', label: 'Телефон', type: 'tel', autoComplete: 'tel', inputMode: 'tel' },
        { name: 'company', label: 'Название компании', autoComplete: 'organization' },
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
            phone: data.phone.trim(),
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
                        <div className="user-form__field" key={field.name}>
                            <label className="user-form__label" htmlFor={`${formId}-${field.name}`}>
                                {field.label}
                            </label>
                            <input
                                id={`${formId}-${field.name}`}
                                className={`user-form__input ${errors[field.name] ? 'user-form__input--error' : ''}`}
                                type={field.type ?? 'text'}
                                autoComplete={field.autoComplete}
                                inputMode={field.inputMode}
                                aria-invalid={errors[field.name] ? 'true' : 'false'}
                                aria-describedby={errors[field.name] ? `${formId}-${field.name}-error` : undefined}
                                {...register(field.name)}
                            />
                            <span
                                id={`${formId}-${field.name}-error`}
                                className="user-form__message"
                                role={errors[field.name] ? 'alert' : undefined}
                            >
                                {errors[field.name]?.message ?? ''}
                            </span>
                        </div>
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
