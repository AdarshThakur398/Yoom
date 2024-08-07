'use client'
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React from 'react'
import { cn } from '@/lib/utils';
import { useState } from 'react'
import { SpeakerLayout } from '@stream-io/video-react-sdk';
import EndCallButton from './EndCallButton';
import Loader from './Loader';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

type CallLayoutType= 'speaker-left' |  'grid' | 'speaker-right';
const MeetingRoom = () => {
  const searchParams= useSearchParams();

  const isPersonalRoom= !!searchParams.get('personal')
  const [Layout, setLayOut] = useState<CallLayoutType>('speaker-left')
  const [showParticipants,setShowParticipants] = useState(false);
  const {useCallCallingState} = useCallStateHooks();
  const callingState= useCallCallingState();
  if(callingState!=CallingState.JOINED) return <Loader/>

  const CallLayout = () => {
    switch(Layout) {
      case 'grid':
        return <PaginatedGridLayout/>
    
    case 'speaker-right': 
    return <SpeakerLayout participantsBarPosition="left"/>
    default :
    return <SpeakerLayout participantsBarPosition="right"/>
      
  }}
  return (
   <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
   <div className='relative flex size-full items-center justify-center'>
    <div className='flex size-full max-w-[1000px] items-center'>
      <CallLayout/></div>
      <div className={cn('h-[calc(100vh-86pc)] hidden ml-2', {"show-block": showParticipants})}>
        <CallParticipantsList onClose={() => setShowParticipants(false)}/>
      </div>
    </div>
   <div className='fixed bottom-0 w-full flex items-center justify-center gap-5 flex-wrap '>
    <CallControls/>
    <DropdownMenu>
      <div className='flex items-center'> <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>layout</DropdownMenuTrigger></div>
 
  <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
    {['Grid','speaker-left','speaker-right'].map((item,index) => (
      <div key={index}>
        <DropdownMenuItem className='cursor-pointer' onClick={() => {
          setLayOut(item.toLowerCase() as CallLayoutType)
        }}>{item}</DropdownMenuItem>
      </div>
    ))}
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator className='border-dark-1' />
    
  </DropdownMenuContent>
</DropdownMenu>
<CallStatsButton/>
<button onClick = {() => 
setShowParticipants((prev) => !prev)
}>
  <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
    <Users size={20} className="text-white"></Users>
  </div>
</button>
{!isPersonalRoom && <EndCallButton/>}
   </div>
    </section>
  )
}

export default MeetingRoom

