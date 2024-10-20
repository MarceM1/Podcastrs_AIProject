import { EmptyStateProps } from '@/Types'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const EmptyState = ({ title, search, buttonLink, buttonText }: EmptyStateProps) => {
  return (
    <section className="flex-center size-full flex-col gap-3">
      <Image src={'/icons/emptyState.svg'} alt='Empty' width={250} height={250} />
      <div className='flex-center w-full max-w-[254px] flex-col gap-3' >
        <h1 className='text-16 text-center font-medium text-white-1'>{title}</h1>
        {search && (
          <p className='text-16 text-center font-medium text-white-2'>Try adjusting your search to find what are looking for</p>
        )}
        {buttonLink && (
          <Button className='bg-orange-1'>
            <Link href={buttonLink} className='flex gap-1'>
              <Image src={'/icons/discover.svg'} alt='Discover' width={20} height={20}/>
              <h2 className='text-16 font-extrabold text-white-1'>{buttonText}</h2>
            </Link>
          </Button>
        )}
      </div>
    </section>

  )
}

export default EmptyState