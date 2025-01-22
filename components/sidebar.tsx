'use client';
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { tools } from '@/app/constants'
import { FreeCounter } from '@/components/free-counter';


export const Sidebar = ({
    apiLimitCount = 0,
    isPro = false
}: {
    apiLimitCount: number;
    isPro: boolean;
}) => {

    const pathName = usePathname();
    return (
        <div className='space-y-4 py-6 flex flex-col h-full justify-between	'>

            <div className='px-3 py-2 flex-1 '>

                <Link href='/dashboard' className='flex justify-center items-center pl-0 mb-14 '>
                    <div className='relative w-16 h-16 mr-4'>
                        <Image fill alt="logo" src="/logo.png" />
                    </div>
                    <h1 className='text-3xl font-bold text-white'>ZEIN</h1>
                </Link>

                <div className='space-y-1'>
                    {tools.map(route => (
                        <Link href={route.href}
                            key={route.href}
                            className={cn('group w-full p-3 flex justify-start hover:text-white hover:bg-white/10 transition rounded-sm', pathName === route.href ? "bg-white/10" : "")}>
                            <div className='flex items-center flex-1' >
                                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>

            </div >

            <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />

        </div >
    )
}

export default Sidebar

