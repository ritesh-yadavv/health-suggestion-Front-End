import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useMsgContext } from "../context/MessageContext"

export const useGetConversation = () => {
    const [loading, setLoading] = useState(false)
    const { setMessages } = useMsgContext()


    const getConversation = async () => {
        try {
        
            setLoading(true)
            const res = await axios.get("https://fithealth-aea5.onrender.com/api/mentalhealth/conversation",{withCredentials:true})
            if (!res.data?.messages) {
                return
            }

            setMessages(res.data?.messages)

        } catch (error) {
            console.log(error.response.data)
            toast.error(error.response.data.error)


        } finally {
            setLoading(false)
         
        }
    }

    return { loading, getConversation }
}