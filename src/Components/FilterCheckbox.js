import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function FilterCheckbox(props) {
  return (
    <div>
      <Checkbox {...label}  value={props.isSelected}
            onValueChange={props.setSelection} />
        <label>{props.filtro}</label>
    </div>
  );
}