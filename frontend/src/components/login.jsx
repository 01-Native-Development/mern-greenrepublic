/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useLoginUserMutation } from '../redux/features/auth/authApi'
import { setUser } from '../redux/features/auth/authSlice'

export default function LoginPage() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')

	const handleLogin = async (e) => {
		e.preventDefault()
		const data = {
			email,
			password,
		}

		try {
			const response = await loginUser(data).unwrap()
			console.log(response)

			const { token, user } = response
			dispatch(setUser({ user }))
			alert('Login successful')
			navigate('/')
		} catch (error) {
			console.error(error)
			setMessage('Please provide a valid email and password')
		}
	}

	return (
		<section className='flex justify-center items-center h-screen'>
			<div className='bg-white shadow mx-auto p-8 border max-w-sm'>
				<h2 className='pt-5 font-semibold text-2xl'>Please Login</h2>
				<form
					onSubmit={handleLogin}
					className='space-y-5 mx-auto pt-8 max-w-sm'
				>
					<input
						type='email'
						name='email'
						id='email'
						placeholder='Email Address'
						required
						className='bg-gray-100 px-5 py-3 w-full focus:outline-none'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type='password'
						name='password'
						id='password'
						placeholder='Password'
						required
						className='bg-gray-100 px-5 py-3 w-full focus:outline-none'
						onChange={(e) => setPassword(e.target.value)}
					/>
					{message && <p className='text-red-500'>{message}</p>}

					<button
						type='submit'
						className='bg-primary hover:bg-indigo-500 mt-5 py-3 rounded-md w-full font-medium text-white'
					>
						Login
					</button>
				</form>

				<p className='my-5 text-center text-sm italic'>
					Don&rsquo;t have an account?
					<Link to='/register' className='px-1 text-red-700 underline'>
						Register
					</Link>{' '}
					here.
				</p>
			</div>
		</section>
	)
}
