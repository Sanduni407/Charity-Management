import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AboutUsPage from './pages/AboutUsPage'
import SignUpPage from './pages/SignUpPage'
import HelpRequestForm from './pages/HelpRequestForm'
import LoginPage from './pages/LoginPage'
import BeneficiaryProfile from './pages/BeneficiaryProfile'
import AdminDashboard from './pages/AdminDashboard '
import AdminHelpRequests from './pages/AdminHelpRequests'
import CreatePostPage from './pages/CreatePostPage'
import DonateRequests from './pages/donateRequests'
import PostDetailsPage from './pages/PostDetailsPage'
import DonationSuccess from './pages/DonationSuccess'
import AdminDonationAnalyticsPage from './pages/AdminDonationAnalytics'
import HelpRequestUpdateForm from './pages/HelpRequestUpdateForm'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetOtpVerifyPage from './pages/ResetOtpVerifyPage'
import ResetPasswordPage from './pages/ResetPasswordPage'

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
                <Route path='/admin-view-requests' element={<AdminHelpRequests/>} />
                 <Route path='/admin/create-post/:requestId' element={<CreatePostPage/>} />
                  <Route path='/donate' element={<DonateRequests/>} />
                  <Route path='/posts/:id' element={<PostDetailsPage/>} />
                  <Route path="/donation-success" element={<DonationSuccess/>} />
                    <Route path="/donation-analytics" element={<AdminDonationAnalyticsPage/>} />
                      <Route path="/update-request/:id" element={<HelpRequestUpdateForm/>} />
                       <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
                       <Route path="/reset-otp-verify" element={<ResetOtpVerifyPage/>} />
                       <Route path="/reset-password" element={<ResetPasswordPage/>} />
      </Routes>
    </div>
  )
}

export default App