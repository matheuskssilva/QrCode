"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

import QRCode from 'react-qr-code'

const Generate = () => {
  const [qrValue, setQrValue] = useState('')
  const [inputText, setInputText] = useState('')

  const handleClickQrCode = () => {
    setQrValue(inputText)
  }

  return (
    <div className='flex flex-wrap-reverse items-center justify-center w-[600px]'>
     
      <div className='rounded-md flex items-center justify-center flex-col bg-[#1E1E1E] max-w-[360px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px] w-full mt-10'>
      <QRCode value={qrValue ? qrValue : "Na"} className='w-[180px] flex items-center justify-center' />
      <Button className='mb-4 bg-[#242424] hover:bg-[#3f3f3f] duration-700'>Dowload Qr Code</Button>
      </div>  

      <div className='flex items-center justify-center w-[350px] md:w-[700px]'>
     <Input
        type="text"
        placeholder="Digite sua url"
        className="h-[38px] rounded-lg  border-[#d8d8d8] bg-transparent p-4 text-gray-400 placeholder:text-gray-400 focus:text-gray-400"
        onChange={(event) => setInputText(event.target.value)}
        value={inputText}
        
      />
      <Button
      type="button"
         className="h-[38px] rounded-xl text-white bold ml-2 bg-[#242424] hover:bg-[#3f3f3f] duration-700"
        onClick={handleClickQrCode}
      >
        Gerar Qr Code
      
      </Button> 

     </div>
      
    </div>
  )
}

export default Generate
