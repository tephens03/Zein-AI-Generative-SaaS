import { cn } from '@/lib/utils';
import React from 'react'

interface HeadingProps {
    title: string;
    description: string;
    icon: any;
    backgroundColor: string;
    color: string;
}

function Heading(props: HeadingProps) {
    return (
        <div className='text-slate-200 px-4 lg:px-8 flex items-center gap-x-3 mb-8'>

            <div className={cn('p-2 w-fit rounded-md', props.backgroundColor)}>
                <props.icon className={cn("w-10 h-10", props.color)} />
            </div>

            {/* holding the title and the description  */}
            <div >
                <h2 className='text-3xl font-bold'>{props.title}</h2>
                <p className='text-sm text-muted-foreground'>{props.description}</p>
            </div>

        </div>
    )
}

export default Heading