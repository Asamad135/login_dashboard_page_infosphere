import '@/styles/globals.css'
import '@/styles/carbonstyle.scss'

export const metadata = {
  title: 'IBM InfoSphere',
  description: 'IBM InfoSphere Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
