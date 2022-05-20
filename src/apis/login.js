const axios = require('axios').default

export async function signInWithEmailAndPassword(email, password) {
  try {
    console.log('first')
    console.log(process.env.REACT_APP_API_BASE_URL)
    const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/auth/login', {
      email,
      password,
    })
    const { tokens, user } = response.data
    return { tokens, user }
  } catch (error) {
    console.log(error)
  }
}
