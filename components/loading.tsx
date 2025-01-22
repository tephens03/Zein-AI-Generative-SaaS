import React from 'react'
import Image from 'next/image'
function Loading() {
    return (


        <div className='h-full p-20 flex flex-col justify-center items-center'>
            <div className='relative w-96 h-96'>
                <Image className='center ' fill alt="logo" src="/loading.gif" />
            </div>
        </div>

    )
}

export default Loading