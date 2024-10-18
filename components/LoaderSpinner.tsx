import { Loader } from 'lucide-react'
import React from 'react'

const LoaderSpinner = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
        <Loader className='animation-spin text-orange-1' size={30}/>
    </div>
  )
}

export default LoaderSpinner