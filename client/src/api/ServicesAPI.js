import { useState , useEffect } from "react";
import axios from "axios";

function ServicesAPI() {
    const [services, setServices] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getAllService = async () => {
            const res = await axios.get('/api/service/')
            setServices(res.data)
        }

        getAllService()
    }, [callback])
    return {
        services: [services, setServices],
        callback: [callback, setCallback]
    }
}

export default ServicesAPI