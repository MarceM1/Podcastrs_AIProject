'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'


function LeftSidebar() {
	const pathname = usePathname();
	const router = useRouter();
	const { signOut } = useClerk()
	

	return (
		<section className={cn('left_sidebar h-[clalc(100vh-5px)]')}>
			<nav className='flex flex-col gap-6'>
				<Link href={"/"} className='flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center'>
					<Image src={"/icons/logo.svg"} alt='Logo' width={23} height={27} />
					<h1 className='text-24 font-extrabold text-white-1 max-lg:hidden'>Podcastr</h1>
				</Link>

				{sidebarLinks.map(({ route, label, imgURL }) => {
					const isActive = pathname === route || pathname.startsWith(`${route}/`)
					return (
						<>

							<Link key={label} href={route} className={cn('flex gap-3 py-4 max-lg:px-4 justify-start', {
								'bg-nav-focus border-r-4 border-orange-1': isActive
							})}>
								<Image src={imgURL} alt='Navbar links images' width={24} height={24} />
								<p>{label}</p>
							</Link>
						</>)
				})}
			</nav>
			<SignedOut>
				<div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
					<Button asChild className='text-16 w-full bg-orange-1 font-extrabold'>
						<Link href={'/sign-in'}>
							Sign In
						</Link>
					</Button>
				</div>
			</SignedOut>
			<SignedIn>
				<div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
					<Button  className='text-16 w-full bg-orange-1 font-extrabold' onClick={() => signOut(() => router.push('/'))}>
						Log out
					</Button>
				</div>
			</SignedIn>
		</section>
	)
}

export default LeftSidebar