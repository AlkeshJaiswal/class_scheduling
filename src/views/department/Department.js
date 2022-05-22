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
import { addDepartment, getDepartments } from 'src/apis/department'

const Department = () => {
  const [departmentData, setDepartmentData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isTableLoading, setIsTableLoading] = useState(false)

  useEffect(() => {
    getDepartments()
      .then((data) => {
        console.log(data)
        setDepartmentData(data)
        setIsTableLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsTableLoading(false)
      })
  }, [])

  const columns = [
    {
      key: 'title',
      _style: { width: '30%' },
      _props: { color: 'primary', className: 'fw-semibold' },
    },
    { key: 'description', _style: { width: '20%' } },
  ]

  const writeDepartmentData = async (title, description) => {
    try {
      const response = await addDepartment(title, description)
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
      const { title, description } = data
      await writeDepartmentData(title, description)
      setIsLoading(false)
      e.target.reset()
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Department</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" noValidate onSubmit={handleSubmit(onSubmit)}>
              <CCol md={6}>
                <CFormInput
                  placeholder="Title"
                  aria-label="Title"
                  {...register('title', { required: 'Please enter title' })}
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                />
                {errors.title && <CFormFeedback invalid>{errors.title?.message}</CFormFeedback>}
              </CCol>
              <CCol md={6}>
                <CFormInput
                  placeholder="Description"
                  aria-label="Description"
                  {...register('description', { required: 'Please enter description' })}
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                />
                {errors.description && (
                  <CFormFeedback invalid>{errors.description?.message}</CFormFeedback>
                )}
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
          <CCardHeader>Departments</CCardHeader>
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
                items={departmentData}
                // itemsPerPageSelect
                itemsPerPage={5}
                pagination
                sorterValue={{ column: 'title', state: 'asc' }}
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

export default Department
