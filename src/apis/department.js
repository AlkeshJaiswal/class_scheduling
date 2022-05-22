import axios from 'axios'

export async function getDepartments(token) {
  try {
    const token = sessionStorage.getItem('token')
    console.log(token)
    const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/departments', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function addDepartment(title, description) {
  try {
    const token = sessionStorage.getItem('token')
    const response = await axios.post(
      process.env.REACT_APP_API_BASE_URL + '/departments',
      { title, description },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}
