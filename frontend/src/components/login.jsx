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
		<section className='h-screen flex items-center justify-center'>
			<div className='max-w-sm border shadow bg-white mx-auto p-8'>
				<h2 className='text-2xl font-semibold pt-5'>Please Login</h2>
				<form
					onSubmit={handleLogin}
					className='space-y-5 max-w-sm mx-auto pt-8'
				>
					<input
						type='email'
						name='email'
						id='email'
						placeholder='Email Address'
						required
						className='w-full bg-gray-100 focus:outline-none px-5 py-3'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type='password'
						name='password'
						id='password'
						placeholder='Password'
						required
						className='w-full bg-gray-100 focus:outline-none px-5 py-3'
						onChange={(e) => setPassword(e.target.value)}
					/>
					{message && <p className='text-red-500'>{message}</p>}

					<button
						type='submit'
						className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md'
					>
						Login
					</button>
				</form>

				<p className='my-5 italic text-sm text-center'>
					Don't have an account?
					<Link to='/register' className='text-red-700 px-1 underline'>
						Register
					</Link>{' '}
					here.
				</p>
			</div>
		</section>
	)
}
