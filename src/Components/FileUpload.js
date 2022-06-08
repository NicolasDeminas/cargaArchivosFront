import React, { useState } from 'react';
import clienteAxios from '../config/axiosConfig'
import SelectTipo from './SelectTipo';
import { Input, Button, FormControl, TextField } from '@mui/material';


const FileUpload = (props) => {
  const [file, setFile] = useState(null);
  const [tipo, setTipo] = useState(null)
  const [descripcion, setDescripcion] = useState(null)
  const [fecha, setFecha] = useState(null)

  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('id')
  const empresa = localStorage.getItem('empresaId')

  const submitFile = async (e) => {
      const formData = new FormData();
    
      formData.append('tipo', tipo)
      formData.append('descripcion', descripcion)
      formData.append('fecha', fecha)
      formData.append('file', file[0]);


    try {
      if (!file) {
        throw new Error('Select a file first!');
      }

      if(file[0].size > 1000000){
        throw new Error(alert(`Tamaño de archivo supera los 1MB, por favor intente nuevamente`))
      }
      
      const data = await clienteAxios.post(`/documento/test-upload?CreatedBy=${userId}&usuario_cuentaId=${props.usuarioId}&empresaId=${empresa}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`
        },
      });
    } catch (error) {
      // handle error
    }
  };

  return (
    <div className='fileUpload'>
    <form onSubmit={submitFile}>
      
      <Input type='file' onChange={event => setFile(event.target.files)} />
      <SelectTipo onChange={event => {setTipo(event.target.value)}} value={tipo} />
      <TextField type='text' placeholder='Descripcion...' id='descripcion' onChange={event => setDescripcion(event.target.value)}/>
      <TextField type='date' onChange={event => setFecha(event.target.value)}/>
      <Button type="submit">Send</Button>
    </form>
    </div>
  );
};

export default FileUpload;