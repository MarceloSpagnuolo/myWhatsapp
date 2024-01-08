import React, { useEffect, useState } from 'react'
import logo from '../../assets/images/tarot.png'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import MicOutlinedIcon from '@mui/icons-material/MicOutlined'
import SendIcon from '@mui/icons-material/Send'
import TagFacesOutlined from '@mui/icons-material/TagFacesOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { sendText } from '../../store/actions'
import { Dispatch } from 'redux'
import dayjs from 'dayjs'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
//import socketIOClient from 'socket.io-client'

export interface messageType {
    type: string
    text?: {
        preview_url: boolean
        body: string
    }
    image?: string
    reaction?: {
        message_id: string
        emoji: string
    }
}

export interface chatType {
    id: string
    client: string
    direction: string
    dateTime: Date
    text?: string
    document?: Document
    image?: MediaProvider
    movie?: MediaProvider
    status: 'send' | 'received' | 'read' | 'error' | ''
}

export const Home = () => {
    //const [selected, setSelected] = useState([])
    const [message, setMessage] = useState<string>('')
    const chat = useSelector((state: any) => state.chat)
    const dispatch: Dispatch<any> = useDispatch()

    useEffect(() => {
        const ws = new WebSocket(process.env.REACT_APP_BACKEND || 'ws://localhost:4000')

        ws.onopen = () => {
            console.log('Conectado al servidor')
        }

        ws.onmessage = (event) => {
            console.log('mensaje recibido desde el servidor:', event.data)
        }

        ws.onclose = () => {
            console.log('Conexion cerrada')
        }
    }, [])

    const handleSendText = () => {
        dispatch(sendText({ phone: '+543516185440', text: message }))
        setMessage('')
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(event)
        if (event.ctrlKey && (event.key === 'v' || event.key === 'V')) {
            console.log('control+v')
        }
        if (event.key === 'Enter') {
            handleSendText()
        }
    }

    return (
        <div className="w-screen h-screen bg-zinc-50 flex flex-row">
            {/* left */}
            <div className="w-1/4 h-full bg-white flex flex-col items-start">
                <div className="w-full h-[50px] bg-gray-100 px-4 flex flex-row items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <img src={logo} alt="logo" width={35} />
                        <p className="text-md font-semibold">WhatsApp Express</p>
                    </div>
                </div>
                <div className="w-full h-full flex flex-row">
                    {/* sidebar */}
                    <div className="w-[50px] h-full bg-gray-100 flex flex-col gap-2 border-t-2 border-gray-300"></div>
                </div>
            </div>
            {/* right */}
            <div className="w-3/4 h-full flex flex-col">
                <div className="w-full h-[50px] bg-gray-100 border-l-2 border-amber-50"></div>
                {/* chat */}
                <div className="w-full h-full  bg-amber-50 flex flex-col justify-end px-6 pb-6">
                    {chat?.map((message: chatType, index: number) => (
                        <div
                            className={`w-full flex pb-1 ${
                                message.direction === 'received' ? 'justify-start' : 'justify-end'
                            }`}
                            key={index}
                        >
                            <div
                                className={`max-w-[60%] self-center rounded-lg py-1 px-2 flex flex-row gap-3 items-end ${
                                    message.direction === 'receive' ? 'bg-white' : 'bg-green-100'
                                }`}
                            >
                                <p className="text-md font-normal pb-[10px]">{message.text}</p>
                                <div className="flex flex-row gap-0">
                                    <p className="text-[10px] font-light text-gray-400">
                                        {dayjs(message.dateTime).format('HH:mm')}
                                    </p>
                                    {message.status === 'send' ? (
                                        <DoneOutlinedIcon fontSize="inherit" color="disabled" />
                                    ) : message.status === 'received' ? (
                                        <DoneAllOutlinedIcon fontSize="inherit" color="disabled" />
                                    ) : message.status === 'read' ? (
                                        <DoneAllOutlinedIcon fontSize="inherit" color="success" />
                                    ) : message.status === 'error' ? (
                                        <ErrorOutlineOutlinedIcon fontSize="inherit" color="error" />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full h-[60px] bg-gray-100 border-l-2 border-amber-50 px-3 flex flex-row gap-4 items-center">
                    <div className="p-1">
                        <AddOutlinedIcon />
                    </div>
                    <div className="w-full flex flex-row items-center gap-0">
                        <div className="bg-white py-2 px-3 border rounded-s-[10px] border-none">
                            <TagFacesOutlined className="opacity-40" />
                        </div>
                        <input
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="bg-white w-full h-[40px] border-white outline-none rounded-e-[10px]"
                            onKeyDown={(e) => handleKeyDown(e)}
                            placeholder=" Escribe un mensaje"
                        />
                    </div>
                    {message.length === 0 ? (
                        <MicOutlinedIcon />
                    ) : (
                        <div onClick={() => handleSendText()} className="cursor-pointer">
                            <SendIcon />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
