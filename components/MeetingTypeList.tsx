"use client"
import React from 'react'
import Image  from 'next/image'
import HomeCard from './HomeCard'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import {useStreamVideoClient,Call} from "@stream-io/video-react-sdk"
import { useToast } from "@/components/ui/use-toast"


const MeetingTypeList = () => {
  const user = useUser();
    const client = useStreamVideoClient();
    const [values,setValues] = useState({
      dateTime:new Date(),
      description:'',
      link:''
    })
     const [CallDetails,setCallDetails] = useState<Call>();
     const {toast} = useToast();
    const createMeeting= async () => {
         if(!user || !client) return;

         try {
          if(!values.dateTime) {
            toast({
              title: "Please select a date and time."
              
            })
            return;
          }
             const id = crypto.randomUUID();
             const call = client.call('default',id)

             if(!call) throw new Error("unable to make a call!")

              const startsAt=  values.dateTime.toISOString() || new Date(Date.now()).toISOString();
              const description= values.description || " Instant Meeting "

              await call.getOrCreate({
                data: {
                  starts_at:startsAt,
                  custom: {
                    description 
                  }
                }
              })
              setCallDetails(call);
              if(!values.description) {
                router.push(`/meeting/${call.id}`)
              }
              toast({
                title: "Meeting Created!"
              })
         } catch(error) {   
          toast({
            title: "Failed to create meeting!"
           
          })
           console.log("error!  ")
         }
    }
    const router=useRouter();


    const [meetingState,setMeetingState]=useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();

  return (
  <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"> 
 <HomeCard img='/icons/add-meeting.svg' title="New meeting" description='start an instant meeting' handleClick={() => setMeetingState('isInstantMeeting')} className="bg-orange-1"/>
 <HomeCard img='/icons/schedule.svg' title="Schedule meeting" description='Plan your meeting' handleClick={() => setMeetingState('isScheduleMeeting')} className="bg-blue-1"/>
 <HomeCard img='/icons/recordings.svg' title="View Recordings" description='Check Out your recordings' handleClick={() => router.push('/recordings')} className="bg-purple-1"/>
 <HomeCard img='/icons/join-meeting.svg' title="Join meeting" description='via invitation link' handleClick={() => setMeetingState('isJoiningMeeting')} className="bg-yellow-1"/>
<MeetingModal
 isOpen={meetingState === 'isInstantMeeting'}
 onClose = {() => setMeetingState(undefined)}
 title='start an instant meeting'
 className="text-center"
 buttonText="Start Meeting"
 handleClick ={createMeeting}/> 

 </section>
  )
}

export default MeetingTypeList

