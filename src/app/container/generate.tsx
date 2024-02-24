"use client"

// Libs
import { useRef, useState } from "react"
import { saveAs } from "file-saver"
import QRCode from "react-qr-code"
import { toPng } from "html-to-image"

// Lib ShadCN
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"




export const Generate = () => {
  const [qrValues, setQrValues] = useState<{ url: string; name: string }[]>([])
  const [inputText, setInputText] = useState("")
  const [name, setName] = useState("")

  const [inputError, setInputError] = useState(false)

  const qrCodeRef = useRef<HTMLDivElement>(null)

  const handleClickQrCode = async () => {
    if (inputText.trim() !== "") {
      setQrValues((prevQrValues) => [
        ...prevQrValues,
        { url: inputText, name: name },
      ])
      setInputText("")
      setName("")
      setInputError(false)
    }
  };

  const isValidateUrl = (url: string) => {
    const urlPattern = /^https:\/\//
    return urlPattern.test(url)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setInputText(value)
    setInputError(!isValidateUrl(value)) 
  }

  const handleDownloadQrCode = async () => {
    if (qrCodeRef.current !== null) {

      const qrCodeImage = await toPng(qrCodeRef.current, {width: 2500, style: {margin: "0 auto", display: "flex", alignItems: "center", "justifyContent": "center"}})

      saveAs(qrCodeImage, "qrcode.png")

    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-wrap-reverse items-center justify-center w-[700px]">
      <div className="rounded-md grid grid-cols-1 md:grid-cols-3 gap-y-5 max-w-[300px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px] w-full mt-10">
        {qrValues.map((qr, index) => (
          <div
            key={index}
            className="ml-6 bg-[#1E1E1E] flex flex-col items-center rounded-2xl"
          >
            <div
              ref={index === qrValues.length - 1 ? qrCodeRef : null}
            >
              <QRCode
                value={qr.url}
                className="w-[180px] md:w-[140px] lg:w-[180px] flex items-center justify-center"
              />
            </div>
            <div className="flex flex-col gap-4 items-center justify-center w-fit">
            <h4 className="text-slate-300 text-sm md:text-[13px] lg:text-sm">Nome da Url: <span className="font-bold text-slate-50">{qr.name ? qr.name : 'Indisponivel'}</span></h4>
            <a
              className="mb-6 bg-[#242424] hover:bg-[#3f3f3f] hover:text-[#d6d6d6] text-white text-sm cursor-pointer duration-700 justify-center p-2 rounded-lg"
              onClick={handleDownloadQrCode}
            >
              Download Qr Code
            </a>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center w-[350px] md:w-[650px] ml-7">
        <div className="flex items-center flex-col md:flex-row justify-center gap-5">
          <div className="flex flex-col gap-4 md:w-42">
            <Label className="text-white">Digite um Titulo</Label>
            <Input
              type="text"
              placeholder="*Campo opcional"
              maxLength={15}
              className="h-[38px] w-[256px] rounded-lg  bg-transparent p-4 text-gray-400 placeholder:text-gray-400 focus:text-gray-400 placeholder:text-[10px]"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </div>
          <div className="flex flex-col gap-4 w-42">
            <Label className="text-white">{inputError ? (
              <span className="text-red-600">Informe uma url válida</span>
            ) : 'Digite sua url...'}</Label>
           
            <Input
              type="text"
              placeholder="*Campo obrigatorio"
              className={`h-[38px] w-[256px] rounded-lg  bg-transparent p-4 text-gray-400 placeholder:text-gray-400 focus:text-gray-400 placeholder:text-[10px] outline-none ${inputError ? "border-red-600 focus:outline-none" : "border-[#d8d8d8]"}` }
              onChange={handleInputChange}
              value={inputText}
              required
            />
            
          </div>
          <Button
            type="button"
            className="h-[38px] w-[200px] md:w-[120px] rounded-xl text-white bold md:mr-0 mt-0 md:mt-8 bg-[#242424] hover:bg-[#3f3f3f] duration-700"
            onClick={handleClickQrCode}
            disabled={inputError}
            >
            Gerar Qr Code
          </Button>
         
        </div>
      </div>
    </div>
  );
};
