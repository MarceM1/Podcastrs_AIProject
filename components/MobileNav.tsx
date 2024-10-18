'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"



function MobileNav() {
  const pathname = usePathname()

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
                        <Link  href={route} className={cn('flex items-center gap-3 py-4 max-lg:px-4 justify-start', {
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
          </div>
        </SheetContent>
      </Sheet>

    </section>
  )
}

export default MobileNav