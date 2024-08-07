"use client"

import { useGetCalls } from '@/hooks/UseGetCalls'
import React, { useReducer, useState } from 'react'
import { useRouter } from 'next/navigation';
import { CallRecording } from '@stream-io/video-react-sdk';
import { Call } from '@stream-io/video-react-sdk';
import MeetingCard from './MeetingCard';
const CallList = ({type} : {type: 'ended' | 'upcoming' | 'recordings'}) => {
    const {endedCalls,upcomingCalls,callRecordings,isLoading}= useGetCalls();
    const router=useRouter();
    const [recordings,setRecordings] = useState<CallRecording[]>([])
    const getCalls=  () => {
        switch(type) {
            case 'ended' :
            return endedCalls;
            case 'recordings' :
                return recordings;
           case 'upcoming' :
            return upcomingCalls
          dafault :
          return []
        }
    }
    const getNoCallsMessage=  () => {
        switch(type) {
            case 'ended' :
            return 'No previous calls';
            case 'recordings' :
                return 'No recordings';
           case 'upcoming' :
            return 'No Upcoming Calls'
          dafault :
          return '';
        }
    }
    const calls = getCalls();
    const callsMessage= getNoCallsMessage();
  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
        {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
           <MeetingCard 
           key={(meeting as Call).id}
           title=''
           date=''
           icon={
            type==='ended'
            ? '/icons/previous.svg'
            : type === 'upcoming'
             ?'/icons/upcoming.svg'
             :'/icons/recording.svg'
           }
           isPreviousMeeting=''
           buttonIcon1=''
           buttonText=''
           handleClick=''
           link= '' />
        )) : (
            <h1>{callsMessage}</h1>
        )}
      
    </div>
    )
}


export default CallList
