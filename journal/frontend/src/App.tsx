import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { Contacts } from './features/people/PeopleCards'
import { Nav } from './features/nav/Nav'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const queryClient = new QueryClient()

export function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="app">
          <Nav />
          <main>
            <Contacts />
          </main>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  )
}