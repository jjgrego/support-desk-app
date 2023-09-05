import axios from 'axios'
 const USER_URL = 'http://localhost:8080/api/users'
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': 'Accept',
    }
  };
  
// register user
 const register = async (userData) => {
    console.log('in auth service register')
    const response = await axios.post(USER_URL, userData, axiosConfig)

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
    const response =  await axios.post(LOGIN_URL, userData, axiosConfig)

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