import { useEffect, useState } from "react"
import { FaUser } from "react-icons/fa"
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../features/auth/authSlice'

function Register() {

const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
  password2: ''
})
const { name, email, password, password2 } = formData
const navigate = useNavigate()

const dispatch = useDispatch()
const { user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

// useEffect((user, isError, isSuccess, message) => {
//   console.log('in useEffect for register...')
//   if(isError){
//     toast.error(message)
//   }
//   // redirect when logged in
//   if(isSuccess || user){
//     navigate('/')
//   }
//   dispatch(reset())

// },[isError, isSuccess, user, message, navigate, dispatch])

const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    } ))
}

const onSubmit = (e) => {
  e.preventDefault()
  if(password !== password2){
    toast.error('passwords do not match')
  }else {
    const userData = {
      name,
      email,
      password,
    }
    console.log('form submitted... dispatching register action')

    dispatch(register(userData))
    // .unwrap()
    // .then((user) => {
    //   // NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
    //   // getting a good response from our API or catch the AsyncThunkAction
    //   // rejection to show an error message
    //   toast.success(`Registered new user - ${user.name}`)
    //   navigate('/')
    // })
    // .catch(toast.error)  }
  }
}
  return (
    <>
    
      <section className="heading">
         <h1>
          <FaUser /> Register
      </h1>
      <p>Please Create an account</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
                  type='text'
                  className='form-control'
                  id='name'
                  name='name'
                  value={name}
                  onChange={onChange}
                  placeholder='Enter your name'
                  required
                  />

          </div>
          <div className="form-group">
            <input
                  type='text'
                  className='form-control'
                  id='email'
                  name='email'
                  value={email}
                  onChange={onChange}
                  placeholder='Enter your email address'
                  required
                  />
                      </div>
           <div className="form-group">  
            <input
                  type='text'
                  className='form-control'
                  id='password'
                  name='password'
                  value={password}
                  onChange={onChange}
                  placeholder='Enter your password'
                  required
                  />
            </div>
            <div className="form-group">
               <input
                  type='text'
                  className='form-control'
                  id='password2'
                  name='password2'
                  value={password2}
                  onChange={onChange}
                  placeholder='verify password'
                  required
                  />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>

        </form>
      </section>
    </>
  )
}

export default Register
