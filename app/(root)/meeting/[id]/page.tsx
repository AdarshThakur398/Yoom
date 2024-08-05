"use client"

import React from 'react'
import { useUser } from '@clerk/nextjs'
import {StreamCall,StreamTheme} from '@stream-io/video-react-sdk'
import { useState } from 'react'
import MeetingSetup from '@/components/MeetingSetup'
import MeetingRoom from '@/components/MeetingRoom'
const Meeting = ({params} : {params : {id:string}}) => {
  const {user,isLoaded} = useUser();
  const [isSetup,isSetupCompleted] = useState(false);
  
  return (
    <main className='h-screen w-full'>
      <StreamCall>
        <StreamTheme>
{!isSetupCompleted ? (
<MeetingSetup/>
): (
  <MeetingRoom/>
)
}
        </StreamTheme>
      </StreamCall>
    </main>
              
  )
  
}

export default Meeting
