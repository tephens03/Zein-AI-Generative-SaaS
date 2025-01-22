'use client'
import { Card } from "@/components/ui/card"
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { tools } from '@/app/constants'
import { ArrowRight } from 'lucide-react'

const DashboardPage = () => {
  const router = useRouter()


  return (
    <div className="pb-4">
      {/**Heading with introdcution and everything */}
      <div className='mb-8 space-y-4'>
        <h2 className="text-2xl md:text-4xl
         font-bold text-center text-slate-200	">
          Explore the Power with AI
        </h2>
        <p className="text-muted-foreground font-ligh text-sm md:text-lg text-center">Chat with the most advanced AI - Experience the power of AI</p>
      </div>

      {/**List of all items */}
      <div className='px-4 md:px-20 lg:px-32 space-y-4 '>

        {/* Card Item */}
        {tools.map((tool) => (
          <Card key={tool.href} onClick={() => { router.push(tool.href) }} className='second-purple text-slate-200 p-4 border-black/5 flex items-center
           justify-between hover:shadow-md transition '>

            <div className='flex items-center gap-x-4'>

              {/* This is the icon */}
              <div className={cn("p-2 w-fit rounded-md ", tool.backgroundColor)}>
                <tool.icon className={cn("h-8 w-8", tool.color)}></tool.icon>
              </div>

              {/* This is the label of the item */}
              <div className='font-semibold'>
                {tool.label}
              </div>

            </div>

            <ArrowRight />
          </Card>
        ))}

      </div>

    </div >

  );
}

export default DashboardPage