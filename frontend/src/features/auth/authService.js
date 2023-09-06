import axios from 'axios'
 const USER_URL = '/api/users'
  
// register user
 const register = async (userData) => {
    console.log('in auth service register')
    const response = await axios.post(USER_URL, userData)
    console.log(response)
    if(response.data){
    localStorage.setItem('user', JSON.stringifyresponse.data)
   }
   return response.data
}

const logout = () => {
    console.log('logging out of application...')
    localStorage.removeItem('user')
} 

// login the user
 const login = async (userData) => {
    const LOGIN_URL = USER_URL + '/login'
    console.log('logging in...')
    const response =  await axios.post(LOGIN_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringifyresponse.data)
       }
       return response.data
}

const authService = {
    register,
    login,
    logout
}

export default authService