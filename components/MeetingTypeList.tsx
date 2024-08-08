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
import { Textarea } from "@/components/ui/textarea"
import ReactDatePicker from 'react-datepicker'
import { Input } from "@/components/ui/input"

const MeetingTypeList = () => {
  const router=useRouter();
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
    


    const [meetingState,setMeetingState]=useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
    const meetingLink= `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${CallDetails?.id}`

  return (
  <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"> 
 <HomeCard img='/icons/add-meeting.svg' title="New meeting" description='start an instant meeting' handleClick={() => setMeetingState('isInstantMeeting')} className="bg-orange-1"/>
 <HomeCard img='/icons/schedule.svg' title="Schedule meeting" description='Plan your meeting' handleClick={() => setMeetingState('isScheduleMeeting')} className="bg-blue-1"/>
 <HomeCard img='/icons/recordings.svg' title="View Recordings" description='Check Out your recordings' handleClick={() => router.push('/recordings')} className="bg-purple-1"/>
 <HomeCard img='/icons/join-meeting.svg' title="Join meeting" description='via invitation link' handleClick={() => setMeetingState('isJoiningMeeting')} className="bg-yellow-1"/>
 <MeetingModal
  isOpen={meetingState === 'isInstantMeeting'}
  onClose = {() => setMeetingState(undefined)}
  title='Start an instant meeting'
  className="text-center"
  buttonText="Start Meeting"
  handleClick ={createMeeting}/> 
   <MeetingModal
  isOpen={meetingState === 'isJoiningMeeting'}
  onClose = {() => setMeetingState(undefined)}
  title='Type the link here'
  className="text-center"
  buttonText="Join Meeting"
  handleClick ={() => router.push(values.link)}> <Input placeholder='Meeting Link'  className='focus-visible:ring-0 focus-visible:ring-offset-0 bg-dark-3 border-none'  onChange={(e) => setValues({...values,link:e.target.value})}/></MeetingModal>
{!CallDetails ?  (
  <MeetingModal
  isOpen={meetingState === 'isScheduleMeeting'}
  onClose = {() => setMeetingState(undefined)}
  title='Create a  meeting'

  handleClick ={createMeeting}>
    <div className='flex flex-col gap-2.5'>
      <label className='text-base text-normal leading-[22px] text-sky-2'>Add a description</label>
      <Textarea className='bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0'
      onChange={(e) => {setValues({...values,description:e.target.value})}}/> 
    </div>
    <div className='flex flex-col gap-2.5'>
      <label className='text-base text-normal leading-[22px] text-sky-2'>Select Date and Time</label>
     
      <ReactDatePicker selected={values.dateTime} onChange={(date) => setValues({...values,dateTime: date! })} showTimeSelect timeFormat='HH:mm' timeIntervals={15} timeCaption='time' dateFormat="MMMM d, yyyy h:mm aa" className='w-full rounded bg-dark-3 p-2 focus:outline-none ' />
    </div>
     </MeetingModal>
): (
  

<MeetingModal
 isOpen={meetingState === 'isScheduleMeeting'}
 onClose = {() => setMeetingState(undefined)}
 title='Meeting Created'

 handleClick = {() => {
  navigator.clipboard.writeText(meetingLink);
  toast({title:'Link Copied'})
  }}
  image='/icons/checked.svg' 
  buttonIcon='/icons/copy.svg'
  buttonText='copy meeting link'
 /> 
 )
}
 </section>
 
  ) }
export default MeetingTypeList

