import clienteAxios from "../config/axiosConfig"
import {resolvePath} from 'react-router-dom'


const auth = async () => {
    const token = localStorage.getItem('token')

    try{
        const consulta = await clienteAxios.get(`/users/isValidToken`, {
            headers: {
                authorization: `Bearer ${token}`
              },
        })

        if(!consulta){
            return console.log(`Error en el servidor`)
        }
        if(consulta.data.msg === 'user authenticated'){
            return console.log(`puede seguir`)
        }

        return resolvePath('/login')
    }catch(err){
        return resolvePath('/login')
    }
}


export default auth
