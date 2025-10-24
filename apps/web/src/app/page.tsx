import React from 'react'
import { SignInButton, SignUpButton, SignOutButton } from '@clerk/nextjs'
function page() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-4 text-black'>
        <SignInButton/>
        <SignUpButton/>
        <SignOutButton />      
    </div>
  )
}

export default page