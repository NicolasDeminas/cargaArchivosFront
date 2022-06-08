import React, {useState, useEffect} from "react";
import clienteAxios from '../config/axiosConfig'

import GenerarQR from "./QR";


const Registrar = (props) => {
    const [nombre, setNombre] = useState()
    const [mail, setMail] = useState()
    const [secreto, setSecreto] = useState()

    const register = async (e) => {
        e.preventDefault()
        const user = await clienteAxios.post('/users', {nombre, mail}, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        // console.log(user.data.qr)
        setSecreto(user.data.qr)

    }


    return(
        <>
            <form>
                <input name='nombre' type="text" value={nombre} onChange={event => {setNombre(event.target.value)}} />
                <input name='mail' type="email" value={mail} onChange={event => {setMail(event.target.value)}}/>
                <input type="submit" onClick={register} />
            </form>

            <GenerarQR secreto={secreto}/>
            
        </>
    )
}


export default Registrar