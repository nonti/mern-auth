import React, { useState} from 'react'
import {motion } from 'framer-motion';
import { User, Mail, Ellipsis} from 'lucide-react';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const handleSignup = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  }
  return (
    <>
      <motion.div 
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5 }}
       className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
       overflow-hidden'
      >
        <div className='p-8'>
          <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-teal-500 text-transparent bg-clip-text'>Create Account</h2>

        <form onSubmit={handleSignup}>
          <Input 
          icon={User}
          placeholder='Full Name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
          <Input 
          icon={Mail}
          placeholder='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
          icon={Ellipsis}
          placeholder='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <Input 
          icon={User}
          placeholder='Role'
          type='text'
          value={role}
          onChange={(e) => setRole(e.target.value)}
          />
        </form>

        {/* Password strength meter*/}
      <PasswordStrengthMeter password={password} />
        <motion.button 
          className='mt-5 w-full py-3 px-4 bg-gradient-to-r  from-cyan-500 to-teal-500 text-white
          font-bold rounded-lg shadow-lg hover:from-cyan-600 hover:to-teal-600 focus:outline-none focus:ring-cyan-600 focus:ring-offset-2 focus:ring-offset-gray-800 
          transition duration-200'
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type='submit'
        >
          Sign Up
        </motion.button>
        </div>
        <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
          <p className='text-sm text-gray-400'>
            Already have an account?{' '}
            <Link to='/signin' className='text-cyan-400 hover:underline'>Signin</Link>
          </p>
        </div>
    </motion.div>

    
    </>
  )
}

export default Signup
