import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { PeopleCards } from './features/people/PeopleCards'
import { Nav } from './features/nav/Nav'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const queryClient = new QueryClient()
const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="app">
          <Nav />
          <main>
            <PeopleCards />
          </main>
        </div>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}