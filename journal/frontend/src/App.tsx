import { ThemeProvider } from '@emotion/react'
import './App.css'
import { Contacts } from './features/contacts/Contacts'
import { Nav } from './features/nav/Nav'
import { CssBaseline, createTheme } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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