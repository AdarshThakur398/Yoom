//@ts-nocheck
"use client"

import { useGetCalls } from '@/hooks/UseGetCalls'
import React, { useEffect, useReducer, useState } from 'react'
import { useRouter } from 'next/navigation';
import { CallRecording } from '@stream-io/video-react-sdk';
import { Call } from '@stream-io/video-react-sdk';
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { useToast } from './ui/use-toast';

const CallList = ({type} : {type: 'ended' | 'upcoming' | 'recordings'}) => {
  const toast=useToast();
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
          default :
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
          default :
          return '';
        }
    }

    useEffect(() => {
    
const fetchRecording = async() => {
        try {  const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
        );
        const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
 }
      
      catch {
    toast({title:'Try again later!'})
      }
      
    }
      if(type==='recordings') fetchRecording();
    },[type,callRecordings])
    if(isLoading) return <Loader/>
    const calls = getCalls();
    const callsMessage= getNoCallsMessage();
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
    {calls && calls.length > 0 ? (
      calls.map((meeting: Call | CallRecording) => (
        <MeetingCard
          key={(meeting as Call).id}
          icon={
            type === 'ended'
              ? '/icons/previous.svg'
              : type === 'upcoming'
                ? '/icons/upcoming.svg'
                : '/icons/recordings.svg'
          }
          title={
            (meeting as Call).state?.custom?.description ||
            (meeting as CallRecording).filename?.substring(0, 25) ||
            'No Description'
          }
          date={  
            (meeting as Call).state?.startsAt?.toLocaleString() ||
            (meeting as CallRecording).start_time?.toLocaleString()
          }
           isPreviousMeeting={type==='ended'}
           buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
           buttonText={type==='recordings' ? 'Play' : 'Start'}

           handleClick={type==='recordings' ? () => router.push(`${meeting.url}`) : () => router.push(`/meeting/${meeting.id}`)}
           
           link={type ==='recordings' ? meeting.url: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}/>
        )) ) : (
            <h1>{callsMessage}</h1>
        )}
      
   </div>
    ) 
}


export default CallList
