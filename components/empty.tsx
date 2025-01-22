import React from 'react'
import Image from 'next/image'

function Empty() {
    return (
        <>
            <div className='h-full p-20 flex flex-col justify-center items-center'>
                <div className='relative w-96 h-96'>
                    <Image className='center ' fill alt="logo" src="/empty.gif" />
                    <p className='font-normal center text-center text-gray-500 px-4 '>Start the conversation</p>
                </div>
            </div>
        </>

    )
}

export default Empty;