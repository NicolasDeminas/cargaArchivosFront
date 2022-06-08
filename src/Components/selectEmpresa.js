import React, {useState, useEffect} from "react";
import clienteAxios from '../config/axiosConfig'
import {useNavigate} from 'react-router-dom'
import {Select, Button, MenuItem, Container, FormControl, InputLabel} from '@mui/material'

const SelectEmpresa = (props) => {
    const [empresa, setEmpresa] = useState([])
    const [empresaId, setEmpresaId] = useState()

    const id = localStorage.getItem('id')
    const navigate = useNavigate()

    useEffect(() => {
        const consultaApi = async () => {
            const empresas = await clienteAxios.get(`/relation/byUser?userId=${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            let data = []
            empresas.data.map(empresa => {
                data.push(empresa.Empresa)
                return data
            })
            setEmpresa(data)
        }
        consultaApi()
    }, [])

    const handleSelect = (e) => {
        e.preventDefault()
        setEmpresaId(e.target.value)
        localStorage.setItem('empresaId', e.target.value)
    }

    const handleButton = (e) => {
        e.preventDefault()
        if(!localStorage.getItem('empresaId')){
            alert(`Empresa no seleccionada`)
        }else{
            navigate('/empleados')
        }
        
    }

    return(
        <>
        <Container maxWidth="sm">
            <FormControl>
            <InputLabel id="demo-simple-select-label">Empresa</InputLabel>
            <Select onChange={handleSelect} autoWidth value={empresaId || ''} label="Empresa" labelId="demo-simple-select-label"
    id="demo-simple-select" >
                {/* <MenuItem value={null}>seleccione empresa...</MenuItem> */}
                {empresa.map(emp => {return(
                    <MenuItem value={emp.id} key={emp.id} >{emp.razonSocial}</MenuItem>
                )
                })}
            </Select>
            <Button onClick={handleButton} >Continuar</Button>
            </FormControl>
            </Container>
        </>
        
    )
}


export default SelectEmpresa