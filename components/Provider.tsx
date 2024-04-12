'use client'

import { Session } from 'next-auth'
import { SessionProvider, useSession } from 'next-auth/react'
import React from 'react'

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default Provider