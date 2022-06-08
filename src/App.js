// import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Views/Login/Login';
import SelectEmpresa from './Components/selectEmpresa';
import GenerarQR from './Components/QR';
import Registrar from './Components/Register';
import FileUpload from './Components/FileUpload';
import TablaEmpleados from './Views/ListadoEmpleados/tablaEmpleados';
import DetalleEmpleado from './Components/DetalleEmpleado';
import NavBar from './Components/NavBar/NavBar'
import {decodeToken} from 'react-jwt'

function App() {
  const secreto = decodeToken(localStorage.getItem('token')).data.secreto

  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>

        <Routes>
          <Route path='/generarQR' element={<GenerarQR secreto={secreto}/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Registrar />}/>
          <Route path='/selectEmpresa' element={<SelectEmpresa />}/>
          <Route path='/fileUpload' element={<FileUpload />} />
          <Route path='/empleados' element={<TablaEmpleados />} />
          <Route path='empleados/:id' element={<DetalleEmpleado />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
