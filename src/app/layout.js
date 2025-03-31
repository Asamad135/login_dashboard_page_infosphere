import '@/styles/globals.css'
import '@/styles/carbonstyle.scss'
import { Providers } from './providers';

export const metadata = {
  title: 'IBM InfoSphere',
  description: 'IBM InfoSphere Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
