import React from 'react'

const Input = ({icon:Icon, ...props}) => {
  return (
    <div className='relative mb-6'>
			<div className='absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none'>
				<Icon className='size-5 text-cyan-500' />
			</div>
			<input
				{...props}
				className='w-full pl-10 pr-4 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400 transition duration-200'
			/>
		</div>
  )
}

export default Input
