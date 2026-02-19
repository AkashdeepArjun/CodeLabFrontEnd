import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'




import ProductsList  from "./components/ProductsList";
import { Route,Routes } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './components/Signup';


function App() {
  const [count, setCount] = useState(0)

  return (
        <Routes>

        <Route path='/login' element={<Login/>} />

        <Route path='/products' element={ <ProtectedRoute> 

            <ProductsList/>

            </ProtectedRoute>

        }



    
        />

      <Route path='/signup' element={<Signup/>} />


      </Routes>

  )
}

export default App
