import React,{ReactNode} from 'react'

const RootLayout = ({children} : {children:ReactNode}) => {
  return (
    <main>
     
      {children}
      footer
    </main>
  )
}

export default RootLayout
