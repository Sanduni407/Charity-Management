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
import DonorProfile from './pages/DonorProfile'

import Community from './pages/Community'
import CreateCommunityPost from './pages/CreateCommunityPost'

import AdminManageEvents from './pages/AdminManageEvents'
import AdminCreateEvent from './pages/AdminCreateEvent'
import AdminEventAnalytics from './pages/AdminEventAnalytics'
import Events from './pages/Events'
import EventDetails from './pages/EventDetails'
import EventRegistration from './pages/EventRegistration'


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
                       <Route path="/donor-profile" element={<DonorProfile/>} />


                    <Route path="/community" element={<Community />} />
                   <Route path="/community/create" element={<CreateCommunityPost />} />
                   <Route path="/community/edit" element={<CreateCommunityPost />} />


                   <Route path="/admin/manage-events" element={<AdminManageEvents />} />
                   <Route path="/admin/create-event" element={<AdminCreateEvent />} />
                  <Route path="/admin/edit-event" element={<AdminCreateEvent />} />
                 <Route path="/admin/event/:eventId/analytics" element={<AdminEventAnalytics />} />


                <Route path="/events" element={<Events />} />
               <Route path="/event/:eventId" element={<EventDetails />} />
              <Route path="/event/:eventId/register" element={<EventRegistration />} />

      </Routes>
    </div>
  )
}

export default App