import { z } from 'zod'

export const userSchema = z.object({
    name: z.string().trim().min(2).max(60),
    username: z.string().min(2).max(64),
    email: z.string().email(),
    city: z.string().min(2).max(64),
    phone: z
        .string()
        .trim()
        .min(1, 'Телефон обязателен')
        .refine((value) => /^[\d\s()+\-xX.]*$/.test(value), 'Телефон содержит недопустимые символы')
        .refine(
            (value) => value.replace(/\D/g, '').length <= 20,
            'Телефон должен содержать не более 20 цифр'
        )
        .refine(
            (value) => value.replace(/\D/g, '').length > 0,
            'Телефон должен содержать хотя бы одну цифру'
        ),
    company: z.string().min(2).max(64),
    avatar: z.string().trim().url('Введите корректную ссылку на изображение'),
})

export type UserFormValues = z.infer<typeof userSchema>
