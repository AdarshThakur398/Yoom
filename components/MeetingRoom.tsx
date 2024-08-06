import { CallControls, CallParticipantsList, PaginatedGridLayout } from '@stream-io/video-react-sdk';
import React from 'react'
import { cn } from '@/lib/utils';
import { useState } from 'react'
import { SpeakerLayout } from '@stream-io/video-react-sdk';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type CallLayoutType= 'speaker-left' |  'grid' | 'speaker-right';
const MeetingRoom = () => {
  const [Layout, setLayOut] = useState<CallLayoutType>('speaker-left')
  const [showParticipants,setShowParticipants] = useState(false);
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
   <div className='fixed bottom-0 w-full flex items-center justify-center gap-5'>
    <CallControls/>
    <DropdownMenu>
      <div className='flex items-center'> <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>Open</DropdownMenuTrigger></div>
 
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

   </div>
    </section>
  )
}

export default MeetingRoom

