import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Nav } from '../features/nav/Nav'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="app">
          <Nav />
          <main>
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </QueryClientProvider>
  ),
})