import {UsersPage} from '@/pages/users/UsersPage';
import { createBrowserRouter } from 'react-router-dom'

const EditUserPage = () => <div>Edit User Page</div>

export const router = createBrowserRouter([
    {
        path: '/',
        element: <UsersPage />,
    },
    {
        path: '/edit/:id',
        element: <EditUserPage />,
    },
])
