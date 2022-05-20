import axios from 'axios'

export async function addCourse(name, yearSection, departmentId) {
  try {
    const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/courses', {
      name,
      yearSection,
      departmentId,
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function getCourses(params) {
  try {
    const token = sessionStorage.getItem('token')
    const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/courses', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
