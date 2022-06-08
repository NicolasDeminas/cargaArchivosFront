import React, {useState, useEffect} from 'react'
import clienteAxios from '../../config/axiosConfig'
import FileUpload from '../../Components/FileUpload';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FilterCheckbox from '../../Components/FilterCheckbox';

function descendingComparator(a, b, orderBy) {
  
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
      
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  
  const headCells = [
    { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
    { id: 'contactoApNombre', numeric: false, disablePadding: false, label: 'Empleado' },
    { id: 'cuil', numeric: false, disablePadding: false, label: 'CUIL' },
    { id: 'alta_fecha', numeric: false, disablePadding: false, label: 'Alta' },
    { id: 'baja_fecha', numeric: false, disablePadding: false, label: 'Baja' },
  ];
  
  function EnhancedTableHead(props) {
    const {  order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

const TablaEmpleados = (props) => {
    // const classes = useStyles();
    const [data, setData] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [isSelected, setSelected] = useState(true)
    

    const navigate = useNavigate()

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };

    useEffect(() => {
        const consultaAPI = async () => {
            const usuarios = await clienteAxios.get('/usuarios', {
                headers:{
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            const usuariosActivos = []
            usuarios.data.map(usuario => {
              if (usuario.activo){
                usuariosActivos.push(usuario)
              }
              
            })
            setUsuarios(usuariosActivos)
        }
        consultaAPI()
    }, [])

    

    return(
        <>  
            <Paper >
      <Typography  variant="h6" id="tableTitle" component="div">
          Tabla Empleados
        </Typography>
        <FilterCheckbox isSelected={isSelected} setSelected={setSelected}/>
    <TableContainer component={Paper}>
      <Table
          
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
        <TableBody>
        {stableSort(usuarios, getComparator(order, orderBy))
          .map((row, index) => (
            <TableRow hover key={row.id} onClick={() => {navigate(`/empleados/${row.id}`)}}>
              <TableCell align="left" >{row.codigo}</TableCell>
              <TableCell align="left" >{row.contactoApNombre}</TableCell>
              <TableCell align="left">{row.cuil}</TableCell>
              <TableCell align="left">{row.alta_fecha}</TableCell>
              <TableCell align="left">{row.baja_fecha}</TableCell>
              
            </TableRow>
            
            
          ))}

        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
        </>
    )
}


export default TablaEmpleados