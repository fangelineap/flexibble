import { NavLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React, { use } from 'react'
import ProfileMenu from './ProfileMenu'

const Navbar = () => {
  return (
    <nav className='flexBetween navbar'>
        <div className='flex-1 flexStart gap-10'>
            <Link href="/">
                <Image 
                    src="/logo.svg" 
                    width={115} 
                    height={43} 
                    alt='flexibble'  
                />
            </Link>
            <ul className='xl:flex hidden text-small gap-7'>
                {NavLinks.map(link => (
                    <Link href={link.href} key={link.key}>
                        {link.text}
                    </Link>
                ))}
            </ul>
        </div>
        <div className='flexCenter gap-4'>
            <ProfileMenu />
        </div>
    </nav>
  )
}

export default Navbar