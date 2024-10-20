import React from 'react'
import {Routes ,Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Exchange from './Pages/Exchange/Exchange'
import Profile from './Pages/Profile/Profile'
import CreateWork from './Pages/CreateWork/CreateWork'
import CreateOrder from './Pages/CreateOrder/CreateOrder'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/exchange' element={<Exchange/>}/>
        <Route path='/create-work' element={<CreateWork/>}/>
        <Route path='/create-order' element={<CreateOrder/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </div>
  )
}

export default App