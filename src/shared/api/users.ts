import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { User } from '@/entities/user/types'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

export const useUsers = () => {
    return useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axios.get<User[]>(API_URL)
            return data.slice(0, 6)
        },
    })
}

export const useUser = (id: string) => {
    return useQuery<User>({
        queryKey: ['user', id],
        queryFn: async () => {
            const { data } = await axios.get<User>(`${API_URL}/${id}`)
            return data
        },
        enabled: !!id,
    })
}
