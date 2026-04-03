import { QueryProvider } from './app/providers/query-provider'
import { AppRouter } from './app/providers/router-provider'

export const App = () => {
  return (
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
  )
}
