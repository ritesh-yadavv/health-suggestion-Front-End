import { useState } from "react"
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useMsgContext } from "../context/MessageContext"
export const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const {messages , setMessages} = useMsgContext()
    const sendMessage = async ( text ) => {
        // console.log(text)
        if (!text.trim()) {
            return
        }
        try {
            setLoading(true)
            const res = await axios.post("https://fithealth-aea5.onrender.com/api/mentalhealth/chat", {text},{withCredentials:true})

            // console.log(res.data)
            setMessages([...messages,...res.data])
        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.error)
        }
        finally{
            setLoading(false)
        }
    }
    return {loading , sendMessage}
}