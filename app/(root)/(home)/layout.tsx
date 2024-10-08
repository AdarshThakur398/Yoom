import React, { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: "Yoom",
  description: "YOOM video calling",
  icons: {
    icon:'/icons/logo.svg'
  }
};
const HomeLayout = ({children} : {children : ReactNode}) => {
  return (
    <main className="relative"> 
    <Navbar/>
    <div className="flex">
        <Sidebar/>
        <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>
            <div className="w-full">
              <StreamVideoProvider>
                {children}
                </StreamVideoProvider>
            </div>
        </section>
    </div>

    
      
    </main>
  )
}

export default HomeLayout
