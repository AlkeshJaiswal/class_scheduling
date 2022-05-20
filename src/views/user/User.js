import React, { useState, useEffect, useMemo } from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CSpinner,
} from '@coreui/react'
import { CSmartTable } from '@coreui/react-pro'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { app, database } from '../../firebase'
import { addUser, getUsers } from 'src/apis/user'

const User = () => {
  const [userData, setUserData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isTableLoading, setIsTableLoading] = useState(true)

  useEffect(() => {
    getUsers()
      .then((data) => {
        console.log(data)
        setUserData(data.results)
        setIsTableLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsTableLoading(false)
      })
  }, [])

  const columns = [
    {
      key: 'name',
      _style: { width: '30%' },
      _props: { color: 'primary', className: 'fw-semibold' },
    },
    { key: 'email', _style: { width: '20%' } },
    { key: 'role', filter: false, sorter: false, _style: { width: '20%' } },
    { key: 'phone', _style: { width: '20%' } },
  ]

  const writeUserData = async (name, email, address, phone, city, role) => {
    try {
      const response = await addUser(name, email, address, phone, city, role)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data, e) => {
    try {
      setIsLoading(true)
      const { firstName, lastName, email, address, phone, role } = data
      const name = firstName + ' ' + lastName
      const password = firstName.toUpperCase + '_' + lastName + '@123'
      await writeUserData(name, email, address, phone, role, password)
      setIsLoading(false)
      e.target.reset()
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const addUserOptions = {
    phone: {
      required: 'Mobile Number required',
      minLength: {
        value: 10,
        message: 'Invalid',
      },
      maxLength: {
        value: 10,
        message: 'Invalid',
      },
    },
  }
  console.log(isTableLoading)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add User</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" noValidate onSubmit={handleSubmit(onSubmit)}>
              <CCol md={6}>
                <CFormInput
                  placeholder="First name"
                  aria-label="First name"
                  {...register('firstName', { required: 'Please enter First Name' })}
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                />
                {errors.firstName && (
                  <CFormFeedback invalid>{errors.firstName?.message}</CFormFeedback>
                )}
              </CCol>
              <CCol md={6}>
                <CFormInput
                  placeholder="Last name"
                  aria-label="Last name"
                  {...register('lastName', { required: 'Please enter Last Name' })}
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                />
                {errors.lastName && (
                  <CFormFeedback invalid>{errors.lastName?.message}</CFormFeedback>
                )}
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Email</CFormLabel>
                <CFormInput
                  placeholder="Email Address"
                  type="email"
                  id="inputEmail4"
                  {...register('email', {
                    required: 'Please enter Email Address',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid Email',
                    },
                  })}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                />
                {errors.email && <CFormFeedback invalid>{errors.email?.message}</CFormFeedback>}
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputCity">City</CFormLabel>
                <CFormInput
                  placeholder="City"
                  id="inputCity"
                  type="text"
                  {...register('city', { required: 'Please enter City' })}
                  className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                />
                {errors.city && <CFormFeedback invalid>{errors.city?.message}</CFormFeedback>}
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputAddress">Address</CFormLabel>
                <CFormInput
                  placeholder="Address"
                  id="inputAddress"
                  type="textarea"
                  {...register('address', { required: 'Please enter Address' })}
                  className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                />
                {errors.address && <CFormFeedback invalid>{errors.address?.message}</CFormFeedback>}
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputZip">Phone</CFormLabel>
                <CFormInput
                  id="inputZip"
                  type="number"
                  placeholder="Mobile Number"
                  {...register('phone', addUserOptions.phone)}
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                />
                {errors.phone && <CFormFeedback invalid>{errors.phone?.message}</CFormFeedback>}
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputState">Role</CFormLabel>
                <CFormSelect
                  id="inputState"
                  {...register('role', { required: 'Please Select Role' })}
                  className={`form-control ${errors.role ? 'is-invalid' : ''}`}
                >
                  <option value="">Choose...</option>
                  <option value="admin">Admin</option>
                  <option value="teacher">Teacher</option>
                </CFormSelect>
                {errors.role && <CFormFeedback invalid>{errors.role?.message}</CFormFeedback>}
              </CCol>
              <CCol xs={12}>
                <CButton type="submit">Submit</CButton>
                {isLoading && <CSpinner />}
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol>
        <CCard>
          <CCardHeader>Users</CCardHeader>
          {!isTableLoading ? (
            <CCardBody>
              <CSmartTable
                activePage={1}
                // cleaner
                clickableRows
                columns={columns}
                // columnFilter
                columnSorter
                // footer
                items={userData}
                // itemsPerPageSelect
                itemsPerPage={5}
                pagination
                // scopedColumns={{
                //   status: (item) => (
                //     <td>
                //       <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                //     </td>
                //   ),
                //   show_details: (item) => {
                //     return (
                //       <td className="py-2">
                //         <CButton
                //           color="primary"
                //           variant="outline"
                //           shape="square"
                //           size="sm"
                //           onClick={() => {
                //             toggleDetails(item._id)
                //           }}
                //         >
                //           {details.includes(item._id) ? 'Hide' : 'Show'}
                //         </CButton>
                //       </td>
                //     )
                //   },
                //   details: (item) => {
                //     return (
                //       <CCollapse visible={details.includes(item._id)}>
                //         <CCardBody>
                //           <h4>{item.username}</h4>
                //           <p className="text-muted">User since: {item.registered}</p>
                //           <CButton size="sm" color="info">
                //             User Settings
                //           </CButton>
                //           <CButton size="sm" color="danger" className="ml-1">
                //             Delete
                //           </CButton>
                //         </CCardBody>
                //       </CCollapse>
                //     )
                //   },
                // }}
                // selectable
                sorterValue={{ column: 'name', state: 'asc' }}
                // tableFilter
                tableHeadProps={{
                  color: 'danger',
                }}
                tableProps={{
                  striped: true,
                  hover: true,
                }}
              />
            </CCardBody>
          ) : (
            <CSpinner />
          )}
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
