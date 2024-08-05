"use client"
import {
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    
  } from '@stream-io/video-react-sdk';
import { tokenProvider } from './stream.actions';
import { ReactNode, useEffect } from 'react';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { error } from 'console';
import Loader from '@/components/Loader';
  const apiKey =    process.env.NEXT_PUBLIC_STREAM_API_KEY;


  
  export const StreamVideoProvider = ({children} : {children : ReactNode}) => {
    const [videoClient,SetVideoClient] = useState<StreamVideoClient>();
    const {user,isLoaded} =useUser();
    useEffect(() => {
        if(!isLoaded || !user) return;
        if(!apiKey) throw new Error('Stream api key missing!!')

        const  client = new StreamVideoClient({
            apiKey,
            user: {
                id:user?.id,
                name:user?.username || user?.id,
                image:user?.imageUrl,
            },
            tokenProvider,

        })
        SetVideoClient(client);
    },[user,isLoaded]);
    if(!videoClient) return <Loader/>
    return (
      <StreamVideo client={videoClient}>
     {children}
      </StreamVideo>
    );
  };

  export default StreamVideoProvider;