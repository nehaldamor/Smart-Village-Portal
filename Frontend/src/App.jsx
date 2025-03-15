import { useState } from 'react'
import './App.css'
import { Route, Routes, useLocation } from 'react-router'
import UserRegistration from './pages/userpages/UserRegistration'
import UserProfile from './pages/userpages/UserProfile'
import UserLogin from './pages/userpages/UserLogin'
import ForgotPassword from './pages/userpages/ForgotPassword'
import ResetPassword from './pages/userpages/ResetPassword'
import Home from './pages/Home'
import UserHomePage from './pages/userpages/UserHomePage'
import Complaints from './pages/userpages/Complaints'
import UserLogout from './pages/userpages/UserLogout'
import UserProtectWrapper from './pages/userpages/UserProtectedWrapper'
import AddComplaint from './pages/userpages/AddComplaint'
import UpdateProfile from './pages/userpages/UpdateProfile'
import AdminRegistration from './pages/adminpages/AdminRegistration'
import AdminLogin from './pages/adminpages/AdminLogin'
import AdminHome from './pages/adminpages/AdminHome'
import ForgotAdminPassword from './pages/adminpages/ForgotAdminPassword'
import ResetAdminPassword from './pages/adminpages/ResetAdminPassword'
import AdminProfile from './pages/adminpages/AdminProfile'
import UpdateAdminProfile from './pages/adminpages/UpdateAdminProfile'
import AllComplaints from './pages/adminpages/AllComplaints'
import CreateNotice from './pages/adminpages/CreateNotice'
import AdminProtectedWrapper from './pages/adminpages/AdminProtectedWrapper'
import AllNotices from './pages/adminpages/AllNotices'
import CreateScheme from './pages/adminpages/CreateScheme'
import AllSchemes from './pages/adminpages/AllSchemes'
import SingleScheme from './pages/adminpages/SingleScheme'
import Schemes from './pages/userpages/Notices'
import SchemeById from './pages/userpages/SchmeById'
import Navbar from './Components/Navbar'
import AdminLogout from './pages/adminpages/AdminLogout'
import Notices from './pages/userpages/Notices'
function App() {
  const location=useLocation();

  const adminRoutes = [
    '/admin-register',
    '/admin-login',
    '/admin-home',
    '/admin-profile',
    '/updateadmin-profile',
    '/allcomplaints',
    '/create-notice',
    '/allnotice',
    '/createscheme',
    '/allschemes',
    '/schemes/:id',
    '/',
    'admin-logout'
  ];
  return (
    <>
       {!adminRoutes.includes(location.pathname) && <div>
        <Navbar />
        <div className='h-15'></div>
        </div>}
     
   
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<UserRegistration/>}/>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='reset-password' element={<ResetPassword/>}/>
      <Route path='/profile' element={<UserProtectWrapper>
        <UserProfile/>
      </UserProtectWrapper>}/>
      <Route path='/user-home' element={<UserProtectWrapper>
        <UserHomePage/>
      </UserProtectWrapper>}/>
      <Route path='/complaints' element={<UserProtectWrapper>
        <Complaints/>
      </UserProtectWrapper>}/>
      <Route path='/logout' element={<UserProtectWrapper>
        <UserLogout/>
      </UserProtectWrapper>}/>
      <Route path='/addcomplaint' element={<UserProtectWrapper>
          <AddComplaint/>
      </UserProtectWrapper>}/>
      <Route path='/updateprofile' element={<UserProtectWrapper>
          <UpdateProfile/>
      </UserProtectWrapper>}/>
      <Route path='/notices' element={<UserProtectWrapper>
        <Notices/>
      </UserProtectWrapper>}/>
      <Route path='/userscheme/:id' element={<UserProtectWrapper>
        <SchemeById/>
      </UserProtectWrapper>}/>

      <Route path='/admin-register' element={<AdminRegistration/>}/>
      <Route path='/admin-login' element={<AdminLogin/>}/>

      <Route path='/forgot-admin-password' element={<ForgotAdminPassword/>}/>
      <Route path='/reset-admin-password' element={<ResetAdminPassword/>}/>

      <Route path='/admin-home' element={<AdminProtectedWrapper>
        <AdminHome/>
      </AdminProtectedWrapper>}/>
      <Route path='/admin-profile' element={<AdminProtectedWrapper>
        <AdminProfile/>
      </AdminProtectedWrapper>}/>
      <Route path='/updateadmin-profile' element={<AdminProtectedWrapper>
        <UpdateAdminProfile/>
      </AdminProtectedWrapper>}/>
      <Route path='/allcomplaints' element={<AdminProtectedWrapper>
        <AllComplaints/>
      </AdminProtectedWrapper>}/>
      <Route path='/create-notice' element={<AdminProtectedWrapper>
        <CreateNotice/>
      </AdminProtectedWrapper>}/>
      <Route path='/allnotice' element={<AdminProtectedWrapper>
          <AllNotices/>
      </AdminProtectedWrapper>}/>
      <Route path='/createscheme' element={<AdminProtectedWrapper>
        <CreateScheme/>
      </AdminProtectedWrapper>}/>
      <Route path='/allschemes' element={<AdminProtectedWrapper>
        <AllSchemes/>
      </AdminProtectedWrapper>}/>
      <Route path='/schemes/:id' element={<AdminProtectedWrapper>
          <SingleScheme/>
      </AdminProtectedWrapper>}/>
      <Route path='admin-logout' element={<AdminProtectedWrapper>
        <AdminLogout/>
      </AdminProtectedWrapper>}/>
      
     </Routes>
    </>
  )
}

export default App
