import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { User } from '@/entities/user/types'

const API_URL = 'https://jsonplaceholder.typicode.com/users'
const USERS_QUERY_KEY = ['users'] as const
const USERS_STALE_TIME = 5 * 60 * 1000

type UsersQueryOptions = {
    enabled?: boolean
}

export const useUsers = ({ enabled = true }: UsersQueryOptions = {}) => {
    return useQuery<User[]>({
        queryKey: USERS_QUERY_KEY,
        queryFn: async () => {
            const { data } = await axios.get<User[]>(API_URL)
            return data.slice(0, 6)
        },
        staleTime: USERS_STALE_TIME,
        enabled,
    })
}

export const useUser = (id: string) => {
    return useQuery<User>({
        queryKey: ['user', id],
        queryFn: async () => {
            const { data } = await axios.get<User>(`${API_URL}/${id}`)
            return data
        },
        staleTime: USERS_STALE_TIME,
        enabled: !!id,
    })
}
