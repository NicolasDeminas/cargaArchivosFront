import React from "react";
import {Select, MenuItem} from '@mui/material'


const SelectTipo = (props) => {

    const tipos = [
        'Baja',
        'Alta',

    ]
    

    return(
        <>
        <Select onChange={props.onChange}  value={props.value || ''} label="tipo"  >
                {/* <MenuItem value={null}>seleccione empresa...</MenuItem> */}
                {tipos.map(type => {return(
                    <MenuItem value={type} key={type} >{type}</MenuItem>
                )
                })}
            </Select>
        </>
    )
}

export default SelectTipo