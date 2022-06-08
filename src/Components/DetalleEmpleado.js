import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import clienteAxios from '../config/axiosConfig'
import FileUpload from './FileUpload'



const DetalleEmpleado = (props) => {
    const [documentos, setDocumentos] = useState([])
    let {id} = useParams()
    
    useEffect(() => {
        const consultaAPI = async () => {
            let documentos = await clienteAxios.get(`/documento/${id}`, {
                headers:{
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(documentos.data)
            documentos.data.map( async(documento) =>  {
                
                const signFile = await clienteAxios.get(`/documento?url=${documento.url}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                
                documento.signedFile = signFile.data
                return documento
            })


            setDocumentos(documentos.data)
            
        }

        consultaAPI()

        
    }, [id]) 

    // const file = async (id) => {
    //     const signFile = await clienteAxios.get(`/documento?url=${id}`, {
    //         headers:{
    //             authorization: `Bearer ${localStorage.getItem('token')}`
    //         }
    //     })
        
    //     setSignedFile(signFile.data)
    //     return signFile.data
    // }

    
    
    return(
        <>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Descripcion</th>
                        <th>Fecha documento</th>
                        <th>Descargar</th>
                    </tr>
                    
                </thead>
                
                <tbody>
                {documentos.map(documento => {
               return(
                
                    <tr key={documento.id} >
                    <td>{documento.tipo}</td>
                   <td>{documento.descripcion}</td>
                   <td>{documento.fecha}</td>
                   <td><button onClick={event =>  window.open(documento.signedFile)} >Ver</button></td>
                    </tr>
                   
               )
            })}
            </tbody>
                    
                
            </table>
        </div>
            <FileUpload usuarioId={id}/>
            
        </>
    )
}

export default DetalleEmpleado