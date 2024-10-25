import Head from '@/components/Head'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layouts = () => {
  return (
    <div>
        <div className='back'>
        </div>
        <main className='min-h-screen p-8'>
          <Head />
          <Outlet />
        </main>
        <div className='p-10 text-center bg-gray-500 mt-10'>2024 Santosh M</div>

    </div>
  )
}

export default Layouts
