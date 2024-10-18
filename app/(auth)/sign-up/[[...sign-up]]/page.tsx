import { SignUp } from '@clerk/nextjs'
import React from 'react'

export default function page() {
  return (
    <div className='flex-center  glassmorphism-auth h-screen w-full'>
        <SignUp />
    </div>
  )
}
