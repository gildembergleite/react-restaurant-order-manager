import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './providers/theme-provider'
import { router } from './routes'

export function App() {
  return (
    <ThemeProvider defaultTheme='light'>
      <HelmetProvider>
        <Helmet titleTemplate="%s | pizza.shop" />
        <Toaster position='top-right' richColors />
        <RouterProvider router={router} />
      </HelmetProvider>
    </ThemeProvider>
  )
}
