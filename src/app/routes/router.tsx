import { AppShell } from '@/app/shell/AppShell'
import { EditUserPage } from '@/pages/edit-user/EditUserPage'
import { UsersPage } from '@/pages/users/UsersPage'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <UsersPage />,
      },
      {
        path: 'edit/:id',
        element: <EditUserPage />,
      },
    ],
  },
])
