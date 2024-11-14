import React from 'react';
import FloatingShapes from './components/FloatingShapes';
import { Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
const App = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-cyan-900 to-indigo-900 flex justify-center items-center relative overflow-hidden'>
      <FloatingShapes  color='bg-cyan-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShapes  color='bg-teal-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatingShapes  color='bg-indigo-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  )
}

export default App;