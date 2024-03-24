import { ThemeProvider } from '@emotion/react'
import './App.css'
import { Contacts } from './features/contacts/Contacts'
import { Nav } from './features/nav/Nav'
import { CssBaseline, createTheme } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

export function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="app">
        <Nav />
        <main>
          <Contacts />
        </main>
      </div>
    </ThemeProvider>
  )
}