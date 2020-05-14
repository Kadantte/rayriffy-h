import React from 'react'

const Component: React.FC = () => {
  return (
    <div className='flex justify-center'>
      <div className='w-full md:w-8/12 lg:4/12 bg-white dark:bg-gray-800 rounded-lg overflow-hidden'>
        <video src='https://media.tenor.com/videos/fac11abb791e244209f249b2b80aba5d/mp4' loop autoPlay className='w-full h-auto rounded-t-lg' />
        <div className='p-6'>
          <div className='text-gray-900 dark:text-white text-2xl font-semibold'>Usage</div>
          <div className='text-gray-900 dark:text-white text-md pt-1'>This should take a while...</div>
          <div className='text-gray-900 dark:text-white text-md'>Replace <b>nhentai.net</b>/g/:id with <b>h.rayriffy.com</b>/g/:id</div>
        </div>
      </div>
    </div>
  )
}

export const Guide = React.memo(Component)
