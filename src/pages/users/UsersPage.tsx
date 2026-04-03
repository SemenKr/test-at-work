import { useUsers } from '@/shared/api/users'

export const UsersPage = () => {
    const { data, isLoading, isError } = useUsers()

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error loading users</div>

    return (
        <div>
            <h1>Users</h1>

            {data?.map((user) => (
                <div key={user.id}>
                    <p>{user.username}</p>
                    <p>{user.address.city}</p>
                    <p>{user.company.name}</p>
                </div>
            ))}
        </div>
    )
}
