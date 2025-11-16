import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header'
import Home from './Home';
import Signup from './signup';
import { Toaster } from 'sonner';
import Login from '../Login';
import Dashboard from './Dashboard';

function App  () {


  
  return (
    <div>
     <BrowserRouter>
     <Toaster richColors position="top-right" closeButton visibleToasts={3} />
      <Header/>
     <Routes>
      <Route path='/' element= {<Home />}/>
        <Route path='/signup' element= {<Signup />}/>
              <Route path='/login' element= {<Login />}/>
               <Route path='/dashboard' element= {<Dashboard />}/>
   
   
     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App




