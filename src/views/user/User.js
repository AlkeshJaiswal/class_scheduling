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
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, set, onValue } from 'firebase/database'

import { app, database } from '../../firebase'

const User = () => {
  const [details, setDetails] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isTableLoading, setIsTableLoading] = useState(false)
  const [users, setUsers] = useState([])

  // const List = useMemo(() => usersData, [usersData])

  // console.log(usersData)

  useEffect(() => {
    const usersRef = ref(database, 'users/')
    onValue(usersRef, (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        let key = childSnapshot.key
        setUsers.push({
          id: key,
          name: childSnapshot.val().username,
          email: childSnapshot.val().email,
          role: childSnapshot.val().email,
          phone: childSnapshot.val().email,
        })
        setIsTableLoading(false)
      })
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
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
      _props: { color: 'primary', className: 'fw-semibold' },
    },
  ]
  // const usersData = [
  //   { id: 0, name: 'John Doe', registered: '2018/01/01', role: 'Guest', status: 'Pending' },
  //   {
  //     id: 1,
  //     name: 'Samppa Nori',
  //     registered: '2018/01/01',
  //     role: 'Member',
  //     status: 'Active',
  //     _props: { color: 'primary', align: 'middle' },
  //   },
  //   {
  //     id: 2,
  //     name: 'Estavan Lykos',
  //     registered: '2018/02/01',
  //     role: 'Staff',
  //     status: 'Banned',
  //     _cellProps: { all: { className: 'fw-semibold' }, name: { color: 'info' } },
  //   },
  //   { id: 3, name: 'Chetan Mohamed', registered: '2018/02/01', role: 'Admin', status: 'Inactive' },
  //   {
  //     id: 4,
  //     name: 'Derick Maximinus',
  //     registered: '2018/03/01',
  //     role: 'Member',
  //     status: 'Pending',
  //   },
  //   { id: 5, name: 'Friderik Dávid', registered: '2018/01/21', role: 'Staff', status: 'Active' },
  //   { id: 6, name: 'Yiorgos Avraamu', registered: '2018/01/01', role: 'Member', status: 'Active' },
  //   {
  //     id: 7,
  //     name: 'Avram Tarasios',
  //     registered: '2018/02/01',
  //     role: 'Staff',
  //     status: 'Banned',
  //     _props: { color: 'warning', align: 'middle' },
  //   },
  //   { id: 8, name: 'Quintin Ed', registered: '2018/02/01', role: 'Admin', status: 'Inactive' },
  //   { id: 9, name: 'Enéas Kwadwo', registered: '2018/03/01', role: 'Member', status: 'Pending' },
  //   { id: 10, name: 'Agapetus Tadeáš', registered: '2018/01/21', role: 'Staff', status: 'Active' },
  //   { id: 11, name: 'Carwyn Fachtna', registered: '2018/01/01', role: 'Member', status: 'Active' },
  //   { id: 12, name: 'Nehemiah Tatius', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
  //   { id: 13, name: 'Ebbe Gemariah', registered: '2018/02/01', role: 'Admin', status: 'Inactive' },
  //   {
  //     id: 14,
  //     name: 'Eustorgios Amulius',
  //     registered: '2018/03/01',
  //     role: 'Member',
  //     status: 'Pending',
  //   },
  //   { id: 15, name: 'Leopold Gáspár', registered: '2018/01/21', role: 'Staff', status: 'Active' },
  //   { id: 16, name: 'Pompeius René', registered: '2018/01/01', role: 'Member', status: 'Active' },
  //   { id: 17, name: 'Paĉjo Jadon', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
  //   {
  //     id: 18,
  //     name: 'Micheal Mercurius',
  //     registered: '2018/02/01',
  //     role: 'Admin',
  //     status: 'Inactive',
  //   },
  //   {
  //     id: 19,
  //     name: 'Ganesha Dubhghall',
  //     registered: '2018/03/01',
  //     role: 'Member',
  //     status: 'Pending',
  //   },
  //   { id: 20, name: 'Hiroto Šimun', registered: '2018/01/21', role: 'Staff', status: 'Active' },
  //   { id: 21, name: 'Vishnu Serghei', registered: '2018/01/01', role: 'Member', status: 'Active' },
  //   { id: 22, name: 'Zbyněk Phoibos', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
  //   { id: 23, name: 'Aulus Agmundr', registered: '2018/01/01', role: 'Member', status: 'Pending' },
  //   {
  //     id: 42,
  //     name: 'Ford Prefect',
  //     registered: '2001/05/25',
  //     role: 'Alien',
  //     status: "Don't panic!",
  //   },
  // ]

  const getBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'success'
      case 'Inactive':
        return 'secondary'
      case 'Pending':
        return 'warning'
      case 'Banned':
        return 'danger'
      default:
        return 'primary'
    }
  }
  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  const writeUserData = async (userId, name, email, address, phone, city, role) => {
    try {
      const response = await set(ref(database, 'users/' + userId), {
        username: name,
        email,
        address,
        phone,
        city,
        role,
      })
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
      const { firstName, lastName, email, address, phone, city, role } = data
      const name = firstName + ' ' + lastName
      const password = firstName + '_' + lastName
      const auth = getAuth(app)
      const user = await createUserWithEmailAndPassword(auth, email, password)
      const {
        user: { uid },
      } = user
      await writeUserData(uid, name, email, address, phone, city, role)
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
                items={users}
                // itemsPerPageSelect
                itemsPerPage={5}
                pagination
                scopedColumns={{
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                    </td>
                  ),
                  show_details: (item) => {
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            toggleDetails(item._id)
                          }}
                        >
                          {details.includes(item._id) ? 'Hide' : 'Show'}
                        </CButton>
                      </td>
                    )
                  },
                  details: (item) => {
                    return (
                      <CCollapse visible={details.includes(item._id)}>
                        <CCardBody>
                          <h4>{item.username}</h4>
                          <p className="text-muted">User since: {item.registered}</p>
                          <CButton size="sm" color="info">
                            User Settings
                          </CButton>
                          <CButton size="sm" color="danger" className="ml-1">
                            Delete
                          </CButton>
                        </CCardBody>
                      </CCollapse>
                    )
                  },
                }}
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
