'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import { SignedIn, SignedOut, useClerk, UserButton, useUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button"
import Header from "./Header"
import Carousel from './Carousel'
import LoaderSpinner from "./LoaderSpinner"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"



function MobileNav() {
  const pathname = usePathname()
  const { signOut } = useClerk()
  const router = useRouter()
  const { user } = useUser();
  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount)

  if (!topPodcasters) return <LoaderSpinner />

  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image src={'/icons/hamburger.svg'} alt="Menu" width={30} height={30} className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent side='left' className="border-none bg-black-1">
          <Link href={"/"} className='flex cursor-pointer items-center gap-1 pb-10 pl-4'>
            <Image src={"/icons/logo.svg"} alt='Logo' width={23} height={27} />
            <h1 className='text-24 font-extrabold text-white-1 ,ml-2'>Podcastr</h1>
          </Link>
          <div className="flex flex-col justify-between h-[calc(100vh-72px)] overflow-y-auto">
            <SheetClose>
              <nav className="flex flex-col h-full gap-6 ">
                {sidebarLinks.map(({ route, label, imgURL }) => {
                  const isActive = pathname === route || pathname.startsWith(`${route}/`)
                  return (
                    <>

                      <SheetClose asChild key={label}>
                        <Link href={route} className={cn('flex items-center gap-3 py-4 max-lg:px-4 justify-start', {
                          'bg-nav-focus border-r-4 border-orange-1': isActive
                        })}>
                          <Image src={imgURL} alt='Navbar links images' width={24} height={24} />
                          <p className="text-14 font-semibold text-white-1">{label}</p>
                        </Link>
                      </SheetClose>
                    </>)
                })}
              </nav>
              
            </SheetClose>
            <section className='right_sidebarMobile text-white-1 mt-8'>
                <SignedIn>
                  <Link href={`/profile/${user?.id}`} className='flex gap-3 pb-12'>
                    <UserButton />
                    <div className='flex w-full items-center justify-between'>
                      <h1 className='text-16 truncate font-semibold text-white-1'>{user?.firstName} {user?.lastName}</h1>
                      <Image src={'/icons/right-arrow.svg'} alt='Right Arrow' width={24} height={24} />
                    </div>
                  </Link>
                </SignedIn>
                <div className="mb-8 h-full">
                  <section className='flex flex-col gap-2'>
                    <Header
                      headerTitle="Fans Like You"
                    />
                    <Carousel
                      fansLikeDetail={topPodcasters!}
                    />
                  </section>
                  <section className="flex flex-col gap-8 pt-12">
                    <Header headerTitle='Top Podcastrs' />
                    <div className="flex flex-col gap-6">
                      {topPodcasters?.slice(0, 4).map((podcastr) => (
                        <div key={podcastr._id} className='flex justify-between cursor-pointer' onClick={() => router.push(`/profile/${podcastr.clerkId}`)}>
                          <figure className='flex items-center gap-2'>
                            <Image src={podcastr.imageUrl} alt={podcastr.name} width={44} height={44} className='aspect-square rounded-lg' />
                            <h2 className="text-14 font-semibold text-white-1">{podcastr.name}</h2>
                          </figure>
                          <div className='flex items-center'>
                            <p className='text-12 font-normal'>{podcastr.totalPodcasts} podcasts</p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </section>
                </div>
              </section>
            <div>
              <SignedOut>
                <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
                  <Button asChild className='text-16 w-full bg-orange-1 font-extrabold text-white-1'>
                    <Link href={'/sign-in'}>
                      Sign In
                    </Link>
                  </Button>
                </div>
              </SignedOut>
              <SignedIn>
                <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
                  <Button className='text-16 w-full bg-orange-1 font-extrabold text-white-1' onClick={() => signOut(() => router.push('/'))}>
                    Log out
                  </Button>
                </div>
              </SignedIn>
            </div>
          </div>
        </SheetContent>
      </Sheet>

    </section>
  )
}

export default MobileNav