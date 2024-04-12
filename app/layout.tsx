import React from 'react'
import { Metadata } from 'next'
import './global.css'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Provider from '@/components/Provider';

export const metadata: Metadata = {
    title: 'Flexibble',
    description: 'Showcase and discover remarkable developer projects',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
        <body>
          <Provider>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
          </Provider>
        </body>
    </html>
  )
}

export default Layout