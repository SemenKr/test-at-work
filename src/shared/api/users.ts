import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { User } from '@/entities/user/types'

const PRIMARY_API_URL = 'https://jsonplaceholder.typicode.com/users'
const FALLBACK_API_URL = 'https://randomuser.me/api/?results=50&seed=test-at-work'
const USERS_QUERY_KEY = ['users'] as const
const USERS_STALE_TIME = 5 * 60 * 1000

type UsersQueryOptions = {
    enabled?: boolean
}

type RandomUserApiResponse = {
    results: RandomUser[]
}

type RandomUser = {
    name: {
        first: string
        last: string
    }
    login: {
        username: string
    }
    email: string
    phone: string
    cell: string
    picture: {
        large: string
    }
    location: {
        city: string
        state: string
    }
}

const mapFallbackUser = (user: RandomUser, index: number): User => ({
    id: 1001 + index,
    name: `${user.name.first} ${user.name.last}`,
    username: user.login.username,
    email: user.email,
    phone: user.phone || user.cell,
    avatar: user.picture.large,
    address: {
        city: user.location.city,
    },
    company: {
        name: user.location.state || 'Remote Team',
    },
})

const fetchUsers = async () => {
    const [{ data: primaryUsers }, { data: fallbackUsers }] = await Promise.all([
        axios.get<User[]>(PRIMARY_API_URL),
        axios.get<RandomUserApiResponse>(FALLBACK_API_URL),
    ])

    return [...primaryUsers, ...fallbackUsers.results.map(mapFallbackUser)]
}

export const useUsers = ({ enabled = true }: UsersQueryOptions = {}) => {
    return useQuery<User[]>({
        queryKey: USERS_QUERY_KEY,
        queryFn: fetchUsers,
        staleTime: USERS_STALE_TIME,
        enabled,
    })
}

export const useUser = (id: string) => {
    return useQuery<User[], Error, User | undefined>({
        queryKey: USERS_QUERY_KEY,
        queryFn: fetchUsers,
        select: (users) => users.find((user) => user.id === Number(id)),
        staleTime: USERS_STALE_TIME,
        enabled: !!id,
    })
}
