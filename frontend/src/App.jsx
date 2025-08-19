import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AboutUsPage from './pages/AboutUsPage'
import SignUpPage from './pages/SignUpPage'
import HelpRequestForm from './pages/HelpRequestForm'
import LoginPage from './pages/LoginPage'
import BeneficiaryProfile from './pages/BeneficiaryProfile'
import AdminDashboard from './pages/AdminDashboard '

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
         <Route path='/about' element={<AboutUsPage/>} />
           <Route path='/signup' element={<SignUpPage/>} />
            <Route path='/help' element={<HelpRequestForm/>} />
             <Route path='/login' element={<LoginPage/>} />
              <Route path='/beneficiary-profile' element={<BeneficiaryProfile/>} />
               <Route path='/admin-dashboard' element={<AdminDashboard/>} />
      </Routes>
    </div>
  )
}

export default App