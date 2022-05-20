import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCardImage,
  CFormFeedback,
  CSpinner,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import scsLogo from '../../../assets/images/scs-logo.png'
import { signInWithEmailAndPassword } from 'src/apis/login'

const Login = () => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [formError, setFormError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const { Email: email, Password: password } = data
      const { tokens, user } = await signInWithEmailAndPassword(email, password)
      setIsLoading(false)

      sessionStorage.setItem('token', tokens.access.token)

      dispatch({
        type: 'set',
        isAuthenticated: true,
        user: {
          token: tokens.access.token,
          email: user.email,
        },
      })
      navigate('/')
    } catch (error) {
      setIsLoading(false)
      setFormError(() => error.message)
    }
  }

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    token && navigate('/')
  }, [])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard style={{ width: '18rem' }}>
                <CCardImage src={scsLogo} />
                <CCardBody>
                  <CForm noValidate onSubmit={handleSubmit(onSubmit)}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    {formError && <CAlert color="danger">{formError}</CAlert>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        {...register('Email', {
                          required: 'Please enter email',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid Email',
                          },
                        })}
                        className={`form-control ${errors.Email ? 'is-invalid' : ''}`}
                      />
                      {errors.Email && (
                        <CFormFeedback invalid>{errors.Email?.message}</CFormFeedback>
                      )}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        {...register('Password', { required: 'Please enter password' })}
                        className={`form-control ${errors.Password ? 'is-invalid' : ''}`}
                      />
                      {errors.Password && (
                        <CFormFeedback invalid>{errors.Password?.message}</CFormFeedback>
                      )}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6}>{isLoading && <CSpinner />}</CCol>
                    </CRow>
                    <CRow>
                      <CCol className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
