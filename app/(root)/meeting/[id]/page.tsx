"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'
import {StreamCall,StreamTheme} from '@stream-io/video-react-sdk'
import { useState } from 'react'
import MeetingSetup from '@/components/MeetingSetup'
import MeetingRoom from '@/components/MeetingRoom'
import { UsegGetCallbyId } from '@/hooks/UsegGetCallbyId'
import Loader from '@/components/Loader'
const Meeting = ({params : {id} } : {params : {id:string}}) => {
  const {user,isLoaded} = useUser();
  const [isSetup,isSetupCompleted] = useState(false);
  const {call,isCallLoading}=UsegGetCallbyId(id);
  if(!isLoaded || isCallLoading) return <Loader/>
  
  if (!call) return (
    <p className="text-center text-3xl font-bold text-white">
      Call Not Found
    </p>
  );
  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
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