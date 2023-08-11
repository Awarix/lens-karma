import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


const RankComonentLoading = () => {
  return (
    <div className='max-w-96 flex flex-wrap items-center justify-center gap-5 my-10 sm: m-auto max-w-[70%] '> 
    {Array.from({length: 4}, (_, i) => i + 1).map((index) => {

    return (
        <Card 
        key={index}
        className='h-48 w-full object-cover md:h-full md:w-96'
        >
           <CardHeader>
           <Skeleton className='h-8 self-center w-1/2 bg-gray-200'></Skeleton>
           </CardHeader>
           <CardContent>
           <Skeleton className='flex flex-wrap justify-between align-center sm: gap-2'>
            <Skeleton className='h-6 bg-gray-200 mb-1'></Skeleton>
            <Skeleton className='h-6 bg-gray-200'></Skeleton>
            <Skeleton className='h-6 bg-gray-200'></Skeleton>
            </Skeleton>
          </CardContent>
        </Card>
    );
  })}
  </div>
  )
}

export default RankComonentLoading