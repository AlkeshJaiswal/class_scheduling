import axios from 'axios'

export async function getUsers(token) {
  try {
    const token = sessionStorage.getItem('token')
    const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/users', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function addUser(name, email, address, phone, role, password) {
  try {
    const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/auth/register', {
      name,
      email,
      address,
      phone,
      role,
      password,
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
