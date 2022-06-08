import React, {useState, useEffect} from 'react'
import clienteAxios from '../../config/axiosConfig'
import {decodeToken} from 'react-jwt'
import {useNavigate} from 'react-router-dom'
import {TextField, Stack, Container, Button} from '@mui/material'


const Login = (props) => {
    const [nombre, setNombre] = useState()
    const [code, setCode] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        if(props.user){
            setNombre(props.user)
        }
    }, [])
    

    const login = async (e) => {
        e.preventDefault()
        try{        
            const user = await clienteAxios.get(`/users?nombre=${nombre}&code=${code}`)
            
            if(!user.data.token){
                alert(user.data.msg)
            }

            const data = decodeToken(user.data.token)

            

            localStorage.setItem('token', user.data.token)
            localStorage.setItem('nombre', data.data.nombre)
            localStorage.setItem('mail', data.data.mail)
            localStorage.setItem('id', data.data.id)

            navigate('/selectEmpresa')
            
        }catch(err){

        }
    }

    return(
        <>
        <Container maxWidth="sm">
        <form>
            <h3>Login</h3>
            <Stack spacing={2} >
                <TextField name='nombre' type="text" value={nombre} onChange={event => {setNombre(event.target.value)}}/>
                {/* <input name='nombre' type="text" value={nombre} onChange={event => {setNombre(event.target.value)}} /> */}
                <TextField name='code' type="number" min="100000" max="999999" value={code} onChange={event => {setCode(event.target.value)}}/>
                {/* <input name='code' type="number" min="100000" max="999999" value={code} onChange={event => {setCode(event.target.value)}}/> */}
                <Button type="submit" onClick={login} variant="contained" >Ingresar</Button>
                {/* <input type="submit" onClick={login} /> */}
       </Stack> 
       </form>
        </Container>
        
        
            
        </>
    )

}

export default Login