import { RouterProvider } from 'react-router-dom'
import { router } from '../routes/router'

export const AppRouter = () => {
    return <RouterProvider router={router} />
}
